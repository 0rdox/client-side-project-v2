import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ListSchema } from './schema/list.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'list', schema: ListSchema }]),
    JwtModule.register({
      secret: 'SecretString',
      signOptions: { expiresIn: '12 days' },
    })
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],

})
export class ListModule {}
