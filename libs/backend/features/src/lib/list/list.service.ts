import { Injectable, NotFoundException } from '@nestjs/common';
import { IList } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ListService {
    TAG = 'ListService';

    //db connection in service
    constructor(
        @InjectModel('list') private readonly listModel: Model<IList>) { }

    async getAll(): Promise<IList[]> {
        Logger.log('getAll DataBase', this.TAG);
        return await this.listModel.find().exec();
    }

    async getOne(_id: string): Promise<IList> {
        Logger.log(`getOne(${_id})`, this.TAG);
        const list = await this.listModel.findOne({ _id }).exec();
        if (!list) {
            throw new NotFoundException(`List not found!`);
        }
        return list;
    }

    async create(list: Pick<IList, 'title' | 'description' | 'userId' | 'image'>): Promise<IList> {
        Logger.log('create', this.TAG);
        var id = new mongoose.Types.ObjectId();
        
        const newList: IList = {
            ...list,
            _id: id.toString(),
        };
        const createdList = await this.listModel.create(newList);
        return createdList;
    }

    async update(id: string, list: Partial<IList>): Promise<IList> {
        Logger.log(`update(${id})`, this.TAG);
        const updatedList = await this.listModel.findOneAndUpdate({ _id: id }, list, { new: true }).exec();
        if (!updatedList) {
            throw new NotFoundException(`List could not be found!`);
        }
        return updatedList;
    }

    async delete(id: string): Promise<void> {
        Logger.log(`delete(${id})`, this.TAG);
        const list = await this.listModel.findOne({ _id: id }).exec();
        if (!list) {
            throw new NotFoundException(`List could not be found!`);
        }
        await this.listModel.deleteOne({ _id: id }).exec();
    }



    async getAllListsForUser(userId: string): Promise<IList[]> {
        Logger.log(`getAllListForUser(${userId})`, this.TAG);
        return await this.listModel.find({ userId }).exec();
    }
}


    
    

