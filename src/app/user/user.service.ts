import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from './../../services/base-service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { regexSearchQuery } from './../../helpers/search-query';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { getFileUserDetails } from './helpers/users';
import { createVendor, updateUser } from 'src/services/aws/cognito';
import { StoreVendorRepository } from '../stores/repository/store-vendor.repository';
import { StoreRepository } from '../stores/repository/store.repository';
import { ObjectId } from 'mongodb';
import { SubscriptionRepository } from '../subscription/subscription.repository';
import { NewStoreVendorRepository } from '../stores/repository/new-store-vendor.repository';
import { NewStoreRepository } from '../stores/repository/new-store.repository';
import { meta } from 'src/helpers/utils';

@Injectable()
export class UserService extends BaseService<UserRepository, QueryUserDto, CreateUserDto, UpdateUserDto> {
  constructor(
    private readonly user: UserRepository,
    private readonly store: StoreRepository,
    private readonly newStore: NewStoreRepository,
    private readonly storeVendor: StoreVendorRepository,
    private readonly subscription: SubscriptionRepository,
    private readonly newStoreVendor: NewStoreVendorRepository,
  ) {
    super(user, 'user');
  }

  async findAllAndSearch(query: QueryUserDto): Promise<{ data: any; message: string }> {
    const searchFields = ['email', 'firstName', 'lastName'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    const users = await this.user.paginate(filter);
    if (!users || users.length < 1) throw new NotFoundException(`users not found`);

    return { data: users, message: `users successfully fetched` };
  }

  async export(): Promise<any> {
    const vendors = await this.user.find({});

    const data = vendors.map((vendor) => {
      return {
        _id: vendor._id,
        firstName: vendor.firstName,
        lastName: vendor.lastName,
        email: vendor.email,
        phoneNumber: vendor.telephone,
      };
    });

    const rows = [];
    data.forEach((application) => rows.push(Object.values(application)));

    const book = new Workbook();
    const sheet = book.addWorksheet('Application Sheet');

    rows.unshift(Object.keys(data[0]));
    sheet.addRows(rows);

    return await saveTempFile(book, 'Application Sheet');
  }

  async migrate(filePayload: FileDto): Promise<{ data: any; message: string }> {
    try {
      const { file } = filePayload;
      const users: any[] = getFileUserDetails(file);

      for (const user of users) {
        const { _id, firstName, lastName, email } = user;

        const storeVendors = await this.storeVendor.find({ role: 'owner', vendorId: _id });
        if (storeVendors.length > 0) {
          const store = await this.store.findById(new ObjectId(storeVendors[0].storeId));
          console.log('This is the store ---->>>>>>>', store);

          // Create a new vendor
          const newUser = await createVendor({ email, firstName, lastName });
          console.log('This is the new vendor ---->>>>>>>', newUser);

          const payload = {
            name: store.name,
            domain: store.domain,
            tagline: store.tagline,
            businessSize: null,
            categoryId: new ObjectId('663cc86229ed1c6052999d02'),
            isActive: true,
            meta,
          };

          const newStore = await this.newStore.create(payload);
          console.log('This is the new store----->>XXXXXX', newStore);

          await updateUser(newUser.userId, 'custom:activeStoreId', String(newStore._id));
          console.log('cognito user was updated');

          await this.newStoreVendor.create({ role: 'owner', vendorId: newUser.userId, storeId: newStore._id, meta });
          console.log('The new Store vendor was created');

          await this.createFreePlan(newUser.userId);
          console.log('Free plan was created');
        }
      }

      return { data: null, message: 'Migrated sent successfully' };
    } catch (error) {
      console.error('Migration error:', error);
      throw new Error('Migration failed'); // Return a meaningful error
    }
  }

  public async createFreePlan(vendorId: string): Promise<any> {
    const planId = await this.getFreeSubscriptionPlanId();

    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + 30);

    const payload = {
      vendorId,
      planId,
      from: fromDate,
      to: toDate,
      status: 'active',
      type: 'monthly',
      meta,
    };

    return await this.subscription.create(payload);
  }

  public async getFreeSubscriptionPlanId(): Promise<ObjectId> {
    return new ObjectId('66ae4fe37c3de57e126a1f52');
  }
}
