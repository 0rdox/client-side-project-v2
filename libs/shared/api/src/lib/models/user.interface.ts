import { Id } from './id.type';




//add age?
//add location?
//add bio?
//add phone number?
export enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Guest = 'Guest'
}


export interface IUser {
    _id: Id;
    name: string;
    email: string;
    password: string;
    token?: string
    profilePicture?: string;
    hasGallery: boolean;
    role: UserRole;
    friends: IUser[];
}


export interface IUserNoPassword {
    _id: Id;
    name: string;
    email: string;
    profilePicture?: string;
    hasGallery: boolean;
    role: UserRole;
    friends: IUser[];
}


export type ICreateUser = Pick<
    IUser,
    'name' | 'email' | 'password' 
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;


