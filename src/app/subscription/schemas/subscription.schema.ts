import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISubscription } from '../types/subscription.interface';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ collection: 'subscriptions', versionKey: false, timestamps: false })
export class Subscription implements ISubscription {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  planId: any;

  @Prop({ type: String, required: true })
  vendorId: any;

  @Prop()
  from: Date;

  @Prop()
  to: Date;

  @Prop()
  type: string;

  @Prop()
  status: string;

  @Prop()
  transactionId?: string;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  card?: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta?: Record<string, any>;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
