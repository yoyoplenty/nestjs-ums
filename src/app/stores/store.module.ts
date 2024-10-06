import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepository } from './repository/store.repository';
import { Store, StoreSchema } from './schemas/stores.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { StoreVendorRepository } from './repository/store-vendor.repository';
import { StoreVendor, StoreVendorSchema } from './schemas/store-vendor.schema';
import { NewStoreVendor, NewStoreVendorSchema } from './schemas/new-store-vendor.schema';
import { NewStoreVendorRepository } from './repository/new-store-vendor.repository';
import { NewStore, NewStoreSchema } from './schemas/new-stores.schema';
import { NewStoreRepository } from './repository/new-store.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Store.name, schema: StoreSchema },
        { name: StoreVendor.name, schema: StoreVendorSchema },
      ],
      'old',
    ),
    MongooseModule.forFeature(
      [
        { name: NewStore.name, schema: NewStoreSchema },
        { name: NewStoreVendor.name, schema: NewStoreVendorSchema },
      ],
      'new',
    ),
    NestjsFormDataModule,
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository, NewStoreRepository, StoreVendorRepository, NewStoreVendorRepository],
  exports: [StoreService, StoreRepository, NewStoreRepository, StoreVendorRepository, NewStoreVendorRepository],
})
export default class StoreModule {}
