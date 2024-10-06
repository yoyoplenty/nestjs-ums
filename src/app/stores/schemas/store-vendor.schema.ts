import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IStoreVendor } from '../types/store-vendor.interface';

export type StoreVendorDocument = HydratedDocument<StoreVendor>;

@Schema({ collection: 'storeVendors', versionKey: false, timestamps: true })
export class StoreVendor implements IStoreVendor {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: any;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  vendorId: string;

  @Prop()
  role: string;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const StoreVendorSchema = SchemaFactory.createForClass(StoreVendor);
