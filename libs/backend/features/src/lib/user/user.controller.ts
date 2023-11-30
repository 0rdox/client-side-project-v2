import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { IUser } from '@client-side-project/shared/api';
import { CreateUserDto, UpdateUserDto } from '@client-side-project/backend/dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';

@ApiTags('user')
@Controller('User')
export class UserController {
    constructor(private UserService: UserService) {}


    @Get('')
    @ApiOperation({ summary: 'Get all Users' })
    @ApiResponse({ status: 200, description: 'Returns all Users.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    getAll(): Promise<IUser[]> {
        return this.UserService.findAll();
    }


    // @Get()
    // async findAll(): Promise<IUser[]> {
    //     return this.UserService.findAll();
    // }


    @Get(':id')
    @ApiOperation({ summary: 'Get a User by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the User to retrieve', type: 'string'})
    @ApiResponse({ status: 200, description: 'Returns a User by ID.'})
    async getOne(@Param('id') id: string): Promise<IUser> {
        return this.UserService.getOne(id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create a new User' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'Creates a new User.'})
    create(@Body() data: CreateUserDto): IUser {
        return this.UserService.create(data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a User by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the User to delete', type: 'string'})
    @ApiResponse({ status: 200, description: 'Deletes a User by ID.'})
    delete(@Param('id') id: string): void {
        console.log("USER DELETION USER.CONTROLLER");
        this.UserService.delete(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a User by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the User to update', type: 'string'})
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'Updates a User by ID.'})
    update(@Param('id') id: string, @Body() data: UpdateUserDto): IUser {
        return this.UserService.update(id, data);
    }
}
