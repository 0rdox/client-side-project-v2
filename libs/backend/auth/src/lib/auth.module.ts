import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema, UserModule } from '@client-side-project/backend/features';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guards';
import { APP_GUARD} from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserModule,
        JwtModule.register({
            secret: process.env['JWT_SECRET'] || 'secretstring',
            signOptions: { expiresIn: '12 days' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService ]
})
export class AuthModule {}


//, { provide: APP_GUARD, useClass: AuthGuard }]