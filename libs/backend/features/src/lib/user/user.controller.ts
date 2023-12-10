import { Controller, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { IUser, IUserNoPassword } from '@client-side-project/shared/api';
import { CreateUserDto, UpdateUserDto } from '@client-side-project/backend/dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Public } from 'libs/backend/auth/src/lib/decorators/decorators';
import { AuthGuard } from 'libs/backend/auth/src/lib/auth/auth.guards';

@ApiTags('user')
@ApiBearerAuth('JWT')
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}


@UseGuards(AuthGuard)
  @Get('')
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, description: 'Returns all Users.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getAll(
    @Req() req: Request & { user: IUser }
  ): Promise<IUserNoPassword[] | IUser[]> {
    return await this.UserService.findAll(req.user);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a User by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the User to retrieve',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Returns a User by ID.' })
  async getOne(
    @Param('id') id: string,
    @Req() req: Request & { user: IUser }
  ): Promise<IUser | IUserNoPassword> {
    return this.UserService.getOne(id, req.user);
  }

  @Public()
  @Get(':id/friend')
  @ApiOperation({ summary: 'Get friends from a User' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the User to retrieve',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns friends from a User by ID.',
  })
  async getFriends(@Param('id') id: string): Promise<string[]> {
    return this.UserService.getFriends(id);
  }

  @Public()
  @Post(':id/friend/:friendId')
  @ApiOperation({ summary: 'Add a friend to a User' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'Adds a friend to a User by ID.' })
  async addFriend(
    @Param('id') id: string,
    @Param('friendId') friendId: string
  ): Promise<void> {
    return this.UserService.addFriend(id, friendId);
  }

  @UseGuards(AuthGuard)
  @Post('')
  @ApiOperation({ summary: 'Create a new User' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Creates a new User.' })
  async create(@Body() data: CreateUserDto): Promise<IUser> {
    return this.UserService.create(data);
  }


  @Public()
  @Get(':id/friend/recommendation')
  @ApiOperation({ summary: 'Get recommendations for friends' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the User to get recommendations for',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns friends from a User by ID.',
  })
  async GetRecommendations(@Param('id') id: string): Promise<any[]> {
    return this.UserService.getRecommendedFriends(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a User by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the User to delete',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Deletes a User by ID.' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.UserService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a User by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the User to update',
    type: 'string',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Updates a User by ID.' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<IUser> {
    return this.UserService.update(id, data);
  }
}
