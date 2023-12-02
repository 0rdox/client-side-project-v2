import { Module } from '@nestjs/common';
import {
  MealModule,
  UserModule,
  ArtworkModule,
  GalleryModule,
} from '@client-side-project/backend/features';
import { AuthModule } from '@client-side-project/backend/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ 
  imports: [MealModule, UserModule, GalleryModule, AuthModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://127.0.0.1/client-side-project',
    }),
  }),
],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
 