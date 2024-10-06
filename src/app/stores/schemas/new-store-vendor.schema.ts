import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IStoreVendor } from '../types/store-vendor.interface';

export type NewStoreVendorDocument = HydratedDocument<NewStoreVendor>;

@Schema({ collection: 'storeVendors', versionKey: false, timestamps: false })
export class NewStoreVendor implements IStoreVendor {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  storeId: any;

  @Prop({ type: String, required: true })
  vendorId: string;

  @Prop()
  role: string;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  meta: Record<string, any>;
}

export const NewStoreVendorSchema = SchemaFactory.createForClass(NewStoreVendor);
