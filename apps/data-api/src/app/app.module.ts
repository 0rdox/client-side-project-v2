import { Module } from '@nestjs/common';
import {
  UserModule,
  ArtworkModule,
  GalleryModule,
} from '@client-side-project/backend/features';
import { AuthModule } from '@client-side-project/backend/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ 
  imports: [UserModule, GalleryModule, ArtworkModule, AuthModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      // uri: 'mongodb://127.0.0.1/client-side-project',
      uri: 'mongodb+srv://janko:janko123@cluster0.1ph1wwi.mongodb.net/client-side-project',
    }),
  }),
],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
 