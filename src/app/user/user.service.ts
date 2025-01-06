import { CustomerService } from './../customers/customer.service';
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
import { createVendor, getAllUsers, updateUser } from 'src/services/aws/cognito';
import { StoreVendorRepository } from '../stores/repository/store-vendor.repository';
import { StoreRepository } from '../stores/repository/store.repository';
import { ObjectId } from 'mongodb';
import { SubscriptionRepository } from '../subscription/subscription.repository';
import { NewStoreVendorRepository } from '../stores/repository/new-store-vendor.repository';
import { NewStoreRepository } from '../stores/repository/new-store.repository';
import { meta } from 'src/helpers/utils';
import { ProductRepository } from '../product/repository/product.repository';
import { ProductImageRepository } from '../product/repository/product-image.repository';
import { TransactionRepository } from '../transaction/repository/transaction.repository';
import { NewProductRepository } from '../product/repository/new-product.repository';
import { NewTransactionRepository } from '../transaction/repository/new-transaction.repository';
import { NewProductImageRepository } from '../product/repository/new-product-image.repository';

@Injectable()
export class UserService extends BaseService<UserRepository, QueryUserDto, CreateUserDto, UpdateUserDto> {
  constructor(
    private readonly user: UserRepository,
    private readonly store: StoreRepository,
    private readonly customer: CustomerService,
    private readonly product: ProductRepository,
    private readonly newStore: NewStoreRepository,
    private readonly newProduct: NewProductRepository,
    private readonly transaction: TransactionRepository,
    private readonly storeVendor: StoreVendorRepository,
    private readonly productImage: ProductImageRepository,
    private readonly subscription: SubscriptionRepository,
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

  async export(query: QueryUserDto): Promise<any> {
    const searchFields = ['email', 'firstName', 'lastName'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    const vendors = await this.user.paginate(filter);

    const data = vendors.map((vendor) => {
      return {
        _id: String(vendor._id),
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
        try {
          const { _id, firstName, lastName, email } = user;

          // const existingVendors = await getAllUsers({ email });
          // if (Array.isArray(existingVendors) && existingVendors.length > 0) {
          //   console.log(`Vendor with email ${email} already exists, skipping to next user.`);
          //   continue; // Skip to the next user
          // }

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
              businessSize: 'Medium scale business (49-80 employees)',
              categoryId: new ObjectId('663cc466ba9e18b2db34a5cb'),
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
              try {
                const newProductPayload = {
                  _id: product._id,
                  storeId: new ObjectId(newStore._id),
                  categoryId: new ObjectId('663ccb06f34b6a4635712992'),
                  shortId: product.shortId,
                  vendorId: newUser.userId,
                  name: product.name,
                  price: product.price,
                  description: product.description,
                  quantity: product.quantity || 1,
                  outOfStock: product.outOfStock || false,
                  meta: product.meta,
                  isDraft: false,
                  variants: [],
                  collectionIds: [],
                };

                const newProductEntity = await this.newProduct.create(newProductPayload);
                console.log('Migrated product:', newProductEntity);

                // Migrate product images
                const images = await this.productImage.find({ productId: new ObjectId(product._id) });
                console.log('Migrated product images:', images);

                for (const image of images) {
                  try {
                    const newImagePayload = {
                      src: image.src,
                      width: image.width || 1348,
                      height: image.height || 1040,
                      position: image.position || 80,
                      type: 'MAIN',
                      storeId: new ObjectId(newStore._id),
                      productId: new ObjectId(newProductEntity._id),
                      meta,
                    };

                    await this.newProductImage.create(newImagePayload);
                    console.log('Migrated product image:', newImagePayload);
                  } catch (imageError) {
                    console.error(`Error migrating product image for product ${product._id}:`, imageError);
                    continue; // Skip to the next image
                  }
                }
              } catch (productError) {
                console.error(`Error migrating product ${product._id}:`, productError);
                continue; // Skip to the next product
              }
            }

            // Migrate old transactions with the new store ID
            for (const transaction of transactions) {
              const newTransactionPayload = {
                gatewayId: transaction.gatewayId,
                domain: transaction.domain,
                status: String(transaction.status).toUpperCase(),
                reference: transaction.reference,
                amount: Number(transaction.amount),
                gatewayResponse: transaction.gatewayResponse,
                paidAt: transaction.paidAt,
                currency: transaction.currency,
                type: transaction.type,
                source: transaction.source,
                description: transaction.description,
                storeId: new ObjectId(newStore._id),
                meta,
              };

              await this.newTransaction.create(newTransactionPayload);
              console.log('Migrated transaction:', newTransactionPayload);
            }

            await this.customer.migrate(String(newStore._id));
          }
        } catch (error) {
          console.log(error);
          continue;
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
