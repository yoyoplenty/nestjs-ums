import { Injectable } from '@nestjs/common';
import { BaseService } from '../../services/base-service';
import { PlanRepository } from './plan.repository';
import { saveTempFile } from 'src/helpers/temp-file';
import { Workbook } from 'exceljs';
import { FileDto } from 'src/utils/dto/file.dto';
import { createVendor } from 'src/services/aws/cognito';

@Injectable()
export class PlanService extends BaseService<PlanRepository, null, null, null> {
  constructor(private readonly storeRepository: PlanRepository) {
    super(storeRepository, 'store');
  }
}
