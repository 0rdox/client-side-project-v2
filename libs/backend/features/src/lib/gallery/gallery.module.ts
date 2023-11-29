import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { MongooseModule } from '@nestjs/mongoose';

import { GallerySchema } from './gallery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'gallery', schema: GallerySchema }])
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
