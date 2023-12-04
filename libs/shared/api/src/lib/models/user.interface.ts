import { Id } from './id.type';




//add age?
//add location?
//add bio?
//add phone number?


export interface IUser {
    _id: Id;
    name: string;
    email: string;
    password: string;
    token?: string
    profilePicture?: string;
    hasGallery: boolean;
}


export type ICreateUser = Pick<
    IUser,
    'name' | 'email' | 'password'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
