import { Controller, Delete, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ListService } from './list.service';
import { IList } from '@client-side-project/shared/api';
import { CreateListDto, UpdateListDto } from '@client-side-project/backend/dto';

@ApiTags('list')
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Get()
    @ApiOperation({ summary: 'Get all Lists' })
    @ApiResponse({ status: 200, description: 'Returns all Lists.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    getAll(): Promise<IList[]> {
        return this.listService.getAll();
    }

    //remove promise for not db connection

    @Get(':id')
    @ApiOperation({ summary: 'Get a List by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the List to retrieve', type: 'string'})
    @ApiResponse({ status: 200, description: 'Returns a List by ID.'})
    async getOne(@Param('id') id: string): Promise<IList> {
        return this.listService.getOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new List' })
    @ApiBody({ type: CreateListDto })
    @ApiResponse({ status: 201, description: 'Creates a new List.'})
    async create(@Body() data: CreateListDto): Promise<IList> {
        return this.listService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a List by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the List to update', type: 'string'})
    @ApiBody({ type: UpdateListDto })
    @ApiResponse({ status: 200, description: 'Updates a List by ID.'})
    async update(@Param('id') id: string, @Body() data: UpdateListDto): Promise<IList> {
        return await this.listService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a List by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the List to delete', type: 'string'})
    @ApiResponse({ status: 200, description: 'Deletes a List by ID.'})
    async delete(@Param('id') id: string): Promise<void> {
        await this.listService.delete(id);
    }


    @Get('user/:userId/')
    @ApiOperation({ summary: 'Get all Lists for a user' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string'})
    @ApiResponse({ status: 200, description: 'Returns all Lists for a user.'})
    async getAllListsForUser(@Param('userId') userId: string): Promise<IList[]> {
        return this.listService.getAllListsForUser(userId);
    }
}
