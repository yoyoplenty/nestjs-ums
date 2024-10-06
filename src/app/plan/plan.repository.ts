import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Plan, PlanDocument } from './schemas/plan.schema';
import { BaseRepository } from '../../repositories/base-repository';

export class PlanRepository extends BaseRepository<PlanDocument> {
  constructor(@InjectModel(Plan.name, 'new') private planModel: Model<PlanDocument>) {
    super(planModel);
  }
}
