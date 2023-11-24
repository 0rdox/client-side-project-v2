import { Controller, Delete } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { Get, Param, Post, Body, Put } from '@nestjs/common';
import { IArtwork } from '@client-side-project/shared/api';
import { CreateArtworkDto, UpdateArtworkDto } from '@client-side-project/backend/dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';


@ApiTags('artwork')
@Controller('artwork')
export class ArtworkController {

    constructor(private readonly artworkService: ArtworkService) {}
    
    @Get('')
    @ApiOperation({ summary: 'Get all artwork' })
    @ApiResponse({ status: 200, description: 'Returns all Galleries.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    getAll(): IArtwork[] {
        return this.artworkService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Artwork by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the Artwork to retrieve', type: 'string'})
    @ApiResponse({ status: 200, description: 'Returns a Artwork by ID.'})
    getOne(@Param('id') id: string): IArtwork {
        return this.artworkService.getOne(id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create a new Artwork' })
    @ApiBody({ type: CreateArtworkDto })
    @ApiResponse({ status: 201, description: 'Creates a new Artwork.'})
    create(@Body() data: CreateArtworkDto): IArtwork {
        return this.artworkService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Artwork by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the Artwork to update', type: 'string'})
    @ApiBody({ type: UpdateArtworkDto })
    @ApiResponse({ status: 200, description: 'Updates a Artwork by ID.'})
    update(@Param('id') id: string, @Body() data: UpdateArtworkDto): IArtwork {
        return this.artworkService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Artwork by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the Artwork to delete', type: 'string'})
    @ApiResponse({ status: 200, description: 'Deletes a Artwork by ID.'})
    delete(@Param('id') id: string): void {
        this.artworkService.delete(id);
    }
}
