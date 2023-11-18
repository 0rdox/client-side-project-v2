import { Controller } from '@nestjs/common';
import { MealService } from './meal.service';
import { Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { IMeal } from '@client-side-project/shared/api';
import { CreateMealDto, UpdateMealDto } from '@client-side-project/backend/dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';

@ApiTags('meal')
@Controller('meal')
export class MealController {
    constructor(private mealService: MealService) {}

    @Get('')
    @ApiOperation({ summary: 'Get all meals' })
    @ApiResponse({ status: 200, description: 'Returns all meals.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    getAll(): IMeal[] {
        return this.mealService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a meal by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the meal to retrieve', type: 'string'})
    @ApiResponse({ status: 200, description: 'Returns a meal by ID.'})
    getOne(@Param('id') id: string): IMeal {
        return this.mealService.getOne(id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create a new meal' })
    @ApiBody({ type: CreateMealDto })
    @ApiResponse({ status: 201, description: 'Creates a new meal.'})
    create(@Body() data: CreateMealDto): IMeal {
        return this.mealService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a meal by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the meal to update', type: 'string'})
    @ApiBody({ type: UpdateMealDto })
    @ApiResponse({ status: 200, description: 'Updates a meal by ID.'})
    update(@Param('id') id: string, @Body() data: UpdateMealDto): IMeal {
        return this.mealService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a meal by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the meal to delete', type: 'string'})
    @ApiResponse({ status: 200, description: 'Deletes a meal by ID.'})
    delete(@Param('id') id: string): void {
        this.mealService.delete(id);
    }
}
