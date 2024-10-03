import { Injectable } from '@nestjs/common';
import { BaseService } from '../../services/base-service';
import { OrderRepository } from './order.repository';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { getFileOrderDetails } from './helpers/orders';
import { createVendor } from 'src/services/aws/cognito';

@Injectable()
export class OrderService extends BaseService<OrderRepository, null, null, null> {
  constructor(private readonly orderRepository: OrderRepository) {
    super(orderRepository, 'order');
  }

  async export(): Promise<any> {
    const orders = await this.orderRepository.find({});

    const data = orders.map((order) => {
      return {
        _id: order._id,
        transactionId: order.transactionId,
        transactionRef: order.transactionRef,
        paymentMethod: order.paymentMethod,
        orderNo: order.orderNo,
        status: order.status,
        storeId: order.storeId,
        customerId: order.customerId,
        addressId: order.addressId,
        products: order.products,
        couponCode: order.couponCode,
        note: order.note,
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
      const orders: any[] = getFileOrderDetails(file);

      const orderCreationPromises = orders.map((order) => {
        const { firstName, lastName, email } = order;

        return createVendor({ email, firstName, lastName });
      });

      await Promise.all(orderCreationPromises);

      return { data: null, message: 'Migrated sent successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
