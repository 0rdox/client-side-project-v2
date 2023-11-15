import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    TAG = 'UserService';

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
        }
    ]);

    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.Users$.value;
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
}
