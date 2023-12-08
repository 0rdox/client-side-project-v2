import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Neo4jModule } from 'nest-neo4j/dist';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    Neo4jModule.forRootAsync({
      useFactory: () => ({
        scheme: 'neo4j+s',
        host: '89526472.databases.neo4j.io',
        port: 7687,
        username: 'neo4j',
        password: 'xal58z1V4pO2rovTy5VN3MC72cDOuuCIJ2PjIXHvJIM',
      }),
    }),
    JwtModule.register({
      secret: 'SecretString',
      signOptions: { expiresIn: '12 days' },
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
