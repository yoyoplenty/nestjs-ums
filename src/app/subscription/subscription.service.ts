import { Injectable } from '@nestjs/common';
import { BaseService } from '../../services/base-service';
import { SubscriptionRepository } from './subscription.repository';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { createVendor } from 'src/services/aws/cognito';

@Injectable()
export class SubscriptionService extends BaseService<SubscriptionRepository, null, null, null> {
  constructor(private readonly storeRepository: SubscriptionRepository) {
    super(storeRepository, 'store');
  }
}
