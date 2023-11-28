import { Controller, Delete, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { IGallery } from '@client-side-project/shared/api';
import { CreateGalleryDto, UpdateGalleryDto } from '@client-side-project/backend/dto';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) {}

    @Get()
    @ApiOperation({ summary: 'Get all Galleries' })
    @ApiResponse({ status: 200, description: 'Returns all Galleries.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    getAll(): Promise<IGallery[]> {
        return this.galleryService.getAll();
    }

    //remove promise for not db connection

    @Get(':id')
    @ApiOperation({ summary: 'Get a Gallery by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the Gallery to retrieve', type: 'string'})
    @ApiResponse({ status: 200, description: 'Returns a Gallery by ID.'})
    async getOne(@Param('id') id: string): Promise<IGallery> {
        return this.galleryService.getOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new Gallery' })
    @ApiBody({ type: CreateGalleryDto })
    @ApiResponse({ status: 201, description: 'Creates a new Gallery.'})
    async create(@Body() data: CreateGalleryDto): Promise<IGallery> {
        return this.galleryService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Gallery by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the Gallery to update', type: 'string'})
    @ApiBody({ type: UpdateGalleryDto })
    @ApiResponse({ status: 200, description: 'Updates a Gallery by ID.'})
    async update(@Param('id') id: string, @Body() data: UpdateGalleryDto): Promise<IGallery> {
        return await this.galleryService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Gallery by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the Gallery to delete', type: 'string'})
    @ApiResponse({ status: 200, description: 'Deletes a Gallery by ID.'})
    async delete(@Param('id') id: string): Promise<void> {
        await this.galleryService.delete(id);
    }
}
