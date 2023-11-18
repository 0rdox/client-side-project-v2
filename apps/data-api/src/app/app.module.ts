import { Module } from '@nestjs/common';
import { MealModule, UserModule, GalleryModule} from '@client-side-project/backend/features'
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MealModule, UserModule, GalleryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
