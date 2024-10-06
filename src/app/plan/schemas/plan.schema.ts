import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPlan } from '../types/plan.interface';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ collection: 'plans', versionKey: false, timestamps: true })
export class Plan implements IPlan {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop()
  monthlyPrice: number;

  @Prop()
  annualPrice: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
