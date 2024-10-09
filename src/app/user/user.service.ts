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
import { OrderRepository } from '../orders/repository/order.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { ProductImageRepository } from '../product/repository/product-image.repository';
import { TransactionRepository } from '../transaction/repository/transaction.repository';
import { NewOrderRepository } from '../orders/repository/new-order.repository';
import { NewProductRepository } from '../product/repository/new-product.repository';
import { NewTransactionRepository } from '../transaction/repository/new-transaction.repository';
import { NewProductImageRepository } from '../product/repository/new-product-image.repository';

@Injectable()
export class UserService extends BaseService<UserRepository, QueryUserDto, CreateUserDto, UpdateUserDto> {
  constructor(
    private readonly user: UserRepository,
    private readonly store: StoreRepository,
    private readonly order: OrderRepository,
    private readonly product: ProductRepository,
    private readonly transaction: TransactionRepository,
    private readonly storeVendor: StoreVendorRepository,
    private readonly productImage: ProductImageRepository,

    private readonly subscription: SubscriptionRepository,

    private readonly newOrder: NewOrderRepository,
    private readonly newStore: NewStoreRepository,
    private readonly newProduct: NewProductRepository,
    private readonly newTransaction: NewTransactionRepository,
    private readonly newProductImage: NewProductImageRepository,
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
          const storeId = new ObjectId(storeVendors[0].storeId);

          const store = await this.store.findById(storeId);
          console.log('This is the old store ---->>>>>>>', store);

          const products = await this.product.find({ storeId: store._id });
          console.log('This are the old products ---->>>>>>>', products);

          const transactions = await this.transaction.find({ storeId: store._id });
          console.log('This are the old transactions ---->>>>>>>', transactions);

          // Create a new vendor
          const newUser = await createVendor({ email, firstName, lastName });
          console.log('This is the new vendor ---->>>>>>>', newUser);

          const payload = {
            name: store.name,
            oldId: new ObjectId(store._id),
            domain: store.domain,
            tagline: store.tagline,
            businessSize: null,
            counters: {
              products: store.counters.products,
              orders: store.counters.orders,
              customers: store.counters.customers,
            },
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

          // Migrate old products with the new store ID
          for (const product of products) {
            const newProductPayload = {
              storeId: new ObjectId(newStore._id),
              shortId: product.shortId,
              vendorId: newUser.userId,
              name: product.name,
              price: product.price,
              description: product.description,
              quantity: product.quantity,
              outOfStock: product.outOfStock || false,
              meta: product.meta,
              isDraft: false,
            };

            const newProductEntity = await this.newProduct.create(newProductPayload);
            console.log('Migrated product:', newProductEntity);

            // Migrate product images
            const images = await this.productImage.find({ productId: new ObjectId(product._id) });
            console.log('Migrated product images:', images);

            for (const image of images) {
              const newImagePayload = {
                ...image,
                type: 'MAIN',
                storeId: new ObjectId(newStore._id),
                productId: new ObjectId(newProductEntity._id),
              };

              await this.newProductImage.create(newImagePayload);
              console.log('Migrated product image:', newImagePayload);
            }
          }

          // Migrate old transactions with the new store ID
          for (const transaction of transactions) {
            const newTransactionPayload = {
              ...transaction,
              storeId: new ObjectId(newStore._id),
            };

            await this.newTransaction.create(newTransactionPayload);
            console.log('Migrated transaction:', newTransactionPayload);
          }
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
