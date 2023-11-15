import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@client-side-project/shared/api';
import { CreateUserDto } from '@client-side-project/backend/dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';

@ApiTags('User')
@Controller('User')
export class UserController {
    constructor(private UserService: UserService) {}


    @Get('')
    @ApiOperation({ summary: 'Get all Users' })
    @ApiResponse({ status: 200, description: 'Returns all Users.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    getAll(): IUser[] {
        return this.UserService.getAll();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get a User by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the User to retrieve', type: 'string'})
    @ApiResponse({ status: 200, description: 'Returns a User by ID.'})
    getOne(@Param('id') id: string): IUser {
        return this.UserService.getOne(id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create a new User' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'Creates a new User.'})
    create(@Body() data: CreateUserDto): IUser {
        return this.UserService.create(data);
    }
}
