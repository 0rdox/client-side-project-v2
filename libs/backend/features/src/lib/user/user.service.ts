import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, IUserNoPassword, UserRole } from '@client-side-project/shared/api';

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

  async findAll(user: any): Promise<IUser[] | IUserNoPassword[]> {
    const items = await this.userModel.find().sort({ name: 1 }).select('-password');

    if (!user || user.user_role !== UserRole.Admin) {
      return items as IUserNoPassword[];
    }

    return items as IUser[];
  }



  async getOne(_id: string, user: any): Promise<IUser | IUserNoPassword> {
    Logger.log(`getOne(${_id})`, this.TAG);
    
    const userDB = await this.userModel.findOne({ _id }).exec();
    Logger.log(userDB, "USERDB");

    if (!userDB) {
      throw new NotFoundException(`User not found!`);
    }

    Logger.log(user, "USER")
    
    
    if (!user) {
      const {password, ...userNoPassword} = userDB.toObject();
      return userNoPassword as IUserNoPassword;
    }
    


    if ((userDB._id.toString() === user.user_id.toString()) || (user.user_role === UserRole.Admin)) {
      return userDB as IUser;
    }

  
    

    const {password, ...userNoPassword} = userDB.toObject();
    return userNoPassword as IUserNoPassword;
    
  }

  
//Delete?
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

  async removeFriend(id: string, friendId: string): Promise<void> {
    await this.neo4jService
      .write(
        `MATCH (user1:User {_id: '${id}'})-[r:FRIENDS_WITH]->(user2:User {_id: '${friendId}'}) DELETE r`
      )
      .then((result) => {
        console.log(result, 'RESULT');
      });

    await this.userModel.findByIdAndUpdate(id, {
      $pull: { friends: friendId },
    });
  }
  
  async addFriend(id: string, friendId: string): Promise<void> {
    const existingFriend = await this.userModel.findOne({ _id: id, friends: friendId });

    if (existingFriend) {
      throw new Error('Friend already exists');
    }

    await this.neo4jService
      .write(
        `MATCH (user1:User {_id: '${id}'}), (user2:User {_id: '${friendId}'}) CREATE (user1)-[:FRIENDS_WITH]->(user2)`
      )
      .then((result) => {
        console.log(result, 'RESULT');
      });

    Logger.debug(friendId, "FRIENDID");
    await this.userModel.findByIdAndUpdate(id, {
      $push: { friends: friendId },
    });
  }

  async getFriends(id: string): Promise<string[]> {
    Logger.debug(`[${this.TAG}] getFriends(${id})`);

    const result = await this.neo4jService.read(
      `MATCH (u1:User {_id: '${id}'})-[:FRIENDS_WITH]->(u2:User) RETURN u2`
    );

    const friendIds = result.records.map((record) => record.get('u2').properties._id);
    const friendNames: string[] = [];

    for (const friendId of friendIds) {
      // const friend = await this.getOne(friendId);
      // friendNames.push(friend.name);
    }

    return friendIds;
  }


  async getRecommendedFriends(id: string): Promise<any[]> {
    Logger.debug(`[${this.TAG}] getRecommendedFriends(${id})`);

    const result = await this.neo4jService.read(
      `MATCH (user:User { _id: '${id}' })-[:FRIENDS_WITH]-(friend)-[:FRIENDS_WITH]-(friend_of_friend)
      WHERE NOT (user)-[:FRIENDS_WITH]-(friend_of_friend)
      RETURN friend_of_friend.name AS Name, friend_of_friend._id AS ID, COUNT(DISTINCT friend) AS Common_Friends
      ORDER BY Common_Friends DESC`
    );

    const recommendedFriends: any[] = [];

    if (result) {
      result.records.forEach((record) => {
        const recommendedFriend = {
          name: record.get('Name'),
          id: record.get('ID'),
          commonFriends: record.get('Common_Friends'),
        };
        recommendedFriends.push(recommendedFriend);
      });
    }

    return recommendedFriends;
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
