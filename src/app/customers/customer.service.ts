import { meta } from './../../helpers/utils';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../../services/base-service';
import { CustomerRepository } from './repository/customer.repository';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { NewStoreRepository } from '../stores/repository/new-store.repository';
import { OrderRepository } from '../orders/repository/order.repository';
import { NewOrderRepository } from '../orders/repository/new-order.repository';
import { NewCustomerRepository } from './repository/new-customer.repository';
import { ObjectId } from 'mongodb';
import { createCustomer, getAllCustomers } from 'src/services/aws/cognito';
import { INewCustomer } from './types/new-customer.interface';
import { INewAddress } from './types/new-address.interface';
import { NewAddressRepository } from './repository/new-address.repository';

@Injectable()
export class CustomerService extends BaseService<CustomerRepository, null, null, null> {
  constructor(
    private readonly order: OrderRepository,
    private readonly store: NewStoreRepository,
    private readonly newOrder: NewOrderRepository,
    private readonly customer: CustomerRepository,
    private readonly newAddress: NewAddressRepository,
    private readonly newCustomer: NewCustomerRepository,
  ) {
    super(customer, 'customer');
  }

  async export(): Promise<any> {
    const customers = await this.customer.find({});

    const data = customers.map((customer) => {
      return {};
    });

    const rows = [];
    data.forEach((application) => rows.push(Object.values(application)));

    const book = new Workbook();
    const sheet = book.addWorksheet('Application Sheet');

    rows.unshift(Object.keys(data[0]));
    sheet.addRows(rows);

    return await saveTempFile(book, 'Application Sheet');
  }

  async migrate(storeId: string): Promise<{ data: any; message: string }> {
    try {
      //GET CURRENT STORE
      const store = await this.store.findById(new ObjectId(storeId));
      if (!store) throw new Error(`Store with ID ${storeId} not found`);

      console.log('This is the new store data-------->>>>>>>xxxxxxx', store);

      const oldStoreCustomers = await this.customer.find({ storeId: new ObjectId(store.oldId) });
      console.log('This is the old store customer data-------->>>>>>>xxxxxxx', oldStoreCustomers);

      const migratedStoreCustomerIds = [];

      for (const oldCustomer of oldStoreCustomers) {
        try {
          console.log('This is the old store customer------>>>>>>>xxxxxxx', oldCustomer);

          const { email, firstName, lastName, telephone } = oldCustomer;

          const customerOrders = await this.order.find({
            customerId: new ObjectId(oldCustomer._id),
            storeId: new ObjectId(store.oldId),
          });
          console.log('This is the old customer orders------->>>>xxxxxxxx', customerOrders);

          const customerExists = await getAllCustomers({ email });
          const customer: any =
            customerExists?.users?.[0] || (await createCustomer({ email, firstName, lastName, telephone }));

          console.log('This is the new customer ---->>>>>>>', customer);

          const storeCustomerPayload: INewCustomer = {
            storeId: store._id,
            customerId: customer.userId,
            origin: 'IN_APP',
            meta,
          };

          const storeCustomer = await this.newCustomer.create(storeCustomerPayload);
          console.log('This is the new store customer data----->>>>>xxxxxx', storeCustomer);

          const addressPayload: INewAddress = {
            storeId: store._id,
            storeCustomerId: storeCustomer._id,
            address: null,
            city: null,
            state: null,
            country: 'Nigeria',
            phone: null,
            postalCode: null,
            userType: null,
            shippingMethod: null,
            regionGroup: null,
            meta,
          };
          await this.newAddress.create(addressPayload);

          // Migrate the customer’s orders to the new order structure
          for (const oldOrder of customerOrders) {
            const products = oldOrder.products.map((product: any) => ({
              productId: product._id, // Use the old product's ObjectId
              quantity: product.quantity,
              variantOrdered: [], // Add empty array if variantOrdered is not present in the old structure
            }));

            const newOrderPayload = {
              orderNo: oldOrder.orderNo,
              amount: oldOrder.products.reduce(
                (sum: number, product: any) => sum + product.price * product.quantity,
                0,
              ),
              salesChannels: 'IN_APP', // Convert paymentMethod to salesChannels
              status: 'ACCEPTED', // Convert status to uppercase
              paymentStatus: oldOrder.paymentMethod === 'online' ? 'PAID' : 'UNPAID', // Derive paymentStatus
              storeId: store._id,
              storeCustomerId: storeCustomer._id,
              products: products,
              note: oldOrder.note || null,
              amountPaid: null, // Default to null as per the new structure
              couponCode: oldOrder.couponCode || null,
              discountIds: [], // Default to empty array
              shippingFee: null,
              meta,
            };

            const order = await this.newOrder.create(newOrderPayload);
            console.log('This is the order that was created------>>>>>xxxxxxxxx', order);
          }

          migratedStoreCustomerIds.push(storeCustomer._id);
        } catch (error) {
          console.log(error);
          continue;
        }
      }

      return { data: migratedStoreCustomerIds, message: 'Migration completed successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
