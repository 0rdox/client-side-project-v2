import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';

import { GallerySchema } from './schema/gallery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'gallery', schema: GallerySchema }]),
    JwtModule.register({
      secret: 'SecretString',
      signOptions: { expiresIn: '12 days' },
    })
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
