import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, UserRole } from '@client-side-project/shared/api';

import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User as UserModel, UserDocument } from './schema/user.schema';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class UserService {
  TAG = 'UserService';

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async findAll(): Promise<IUser[]> {
    const items = await this.userModel.find().sort({ name: 1 });
    return items;
  }

  async getOne(_id: string): Promise<IUser> {
    Logger.log(`getOne(${_id})`, this.TAG);
    const user = await this.userModel.findOne({ _id }).exec();
    if (!user) {
      throw new NotFoundException(`User not found!`);
    }
    return user;
  }

  async create(
    user: Pick<IUser, 'name' | 'email' | 'password'>
  ): Promise<IUser> {
    Logger.log('create', this.TAG);
    var id = new mongoose.Types.ObjectId();
    console.log();

    const newUser: IUser = {
      ...user,
      _id: id.toString(),
      hasGallery: false,
      role: UserRole.User,
      friends: [],
    };

    const createdUser = await this.userModel.create(newUser);
    return createdUser;
  }

  async addFriend(id: string, friendId: string): Promise<void> {
    await this.neo4jService
      .write(
        `MATCH (user1:User {_id: '${id}'}), (user2:User {_id: '${friendId}'}) CREATE (user1)-[:FRIENDS_WITH]->(user2)`
      )
      .then((result) => {
        console.log(result, 'RESULT');
      });

    await this.userModel.findByIdAndUpdate(id, {
      $push: { friends: friendId },
    });
  }

  async getFriends(id: string): Promise<IUser[]> {
    Logger.debug(`[${this.TAG}] getFriends(${id})`);

    const result = await this.neo4jService.read(
      `MATCH (u1:User {_id: '${id}'})-[:FRIENDS_WITH]->(u2:User) RETURN u2`
    );
    return result.records.map((record) => record.get('u2').properties);
  }

  //todo: double check if this is correct
  async delete(id: string): Promise<void> {
    Logger.log(`delete(${id})`, this.TAG);
    const gallery = await this.userModel.findOne({ _id: id }).exec();
    if (!gallery) {
      throw new NotFoundException(`Gallery could not be found!`);
    }
    await this.userModel.deleteOne({ _id: id }).exec();
  }

  //todo: double check if this is correct
  async update(id: string, user: Partial<IUser>): Promise<IUser> {
    Logger.log(`update(${id})`, this.TAG);
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, user, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User could not be found!`);
    }
    return updatedUser;
  }
}
