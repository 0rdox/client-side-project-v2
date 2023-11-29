import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@client-side-project/shared/api';

import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    TAG = 'UserService';
   
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument> // @InjectModel(Meal.name) private meetupModel: Model<MealDocument>
    ) {}

    private Users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            name: 'John Smith',
            email: 'j.smith@mail.com',
            password: 'Secret123'
        },
        {
            id: '1',
            name: 'Katie Smith',
            email: 'k.smith@mail.com',
            password: 'Secret123'
        },
        {
            id: '2',
            name: 'Michael Johnson',
            email: 'm.johnson@mail.com',
            password: 'Secret123'
        },
        {
            id: '3',
            name: 'Emily Davis',
            email: 'e.davis@mail.com',
            password: 'Secret123'
        },
        {
            id: '4',
            name: 'Daniel Wilson',
            email: 'd.wilson@mail.com',
            password: 'Secret123'
        },
        {
            id: '5',
            name: 'Sophia Thompson',
            email: 's.thompson@mail.com',
            password: 'Secret123'
        }
    ]);

    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.Users$.value;
    }
    
    async findAll(): Promise<IUser[]> {
        // this.logger.log(`Finding all items`);
        const items = await this.userModel.find();
        return items;
    }


    getOne(id: string): IUser {
        Logger.log(`getOne(${id})`, this.TAG);
        const User = this.Users$.value.find((td) => td.id === id);
        if (!User) {
            throw new NotFoundException(`User could not be found!`);
        }
        return User;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(User: Pick<IUser, 'name' | 'email'>): IUser {
        Logger.log('create', this.TAG);
        const current = this.Users$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newUser: IUser = {
            ...User,
            id: `User-${Math.floor(Math.random() * 10000)}`,
            password: 'test123'
        };
        this.Users$.next([...current, newUser]);
        return newUser;
    }


    //todo: double check if this is correct
    delete(id: string): IUser {
        
        Logger.log(`delete(${id})`, this.TAG);
        const current = this.Users$.value;
        const userIndex = current.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User could not be found!`);
        }

        const deletedUser = current.splice(userIndex, 1)[0];
        this.Users$.next(current);
        return deletedUser;
    }
      
     //todo: double check if this is correct
    update(id: string, user: Partial<IUser>): IUser {
        Logger.log(`update(${id})`, this.TAG);
        const current = this.Users$.value;
        
        const userIndex = current.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User could not be found!`);
        }

        const updatedUser = {
            ...current[userIndex],
            ...user,
        };

        console.log(updatedUser, "updatedUser");    
        current[userIndex] = updatedUser;
        this.Users$.next(current);
        return updatedUser;
    }
}
