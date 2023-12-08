import {
    Controller,
    Request,
    Get,
    Post,
    UseGuards,
    Logger,
    Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/decorators';
import { IUser, IUserCredentials } from '@client-side-project/shared/api';
import { CreateUserDto } from '@client-side-project/backend/dto';
import { UserExistGuard } from '@client-side-project/backend/features';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get hello message' })
    async hello(): Promise<string> {
        return 'hello';
    }

    //TODO:
    @Public()
    @Post('login')
    @ApiParam({ name: 'email', description: 'The email of the User to login', type: 'string'})
    @ApiParam({ name: 'password', description: 'The password of the User to login', type: 'string'})
    @ApiOperation({ summary: 'Login' })
    async login(@Body() credentials: IUserCredentials): Promise<IUser> {
        this.logger.log('Login');
        return await this.authService.login(credentials);
    }


    @Public()
    @UseGuards(UserExistGuard)
    @Post('register')
    @ApiOperation({ summary: 'Register' })
    async register(@Body() user: CreateUserDto): Promise<IUser> {
        this.logger.log('Register');
        return await this.authService.register(user);
    }
}
