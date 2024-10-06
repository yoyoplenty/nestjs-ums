import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from './schemas/subscription.schema';
import { BaseRepository } from '../../repositories/base-repository';

export class SubscriptionRepository extends BaseRepository<SubscriptionDocument> {
  constructor(@InjectModel(Subscription.name, 'new') private subscriptionModel: Model<SubscriptionDocument>) {
    super(subscriptionModel);
  }
}
