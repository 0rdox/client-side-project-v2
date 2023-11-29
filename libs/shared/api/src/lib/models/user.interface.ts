import { Id } from './id.type';


// Voor nu is onze user een string; later zullen we hier een User object van maken.
type User = string;

export interface IUser {
    id: Id;
    name: string;
    email: string;
    password: string;
    token?: string
    profilePicture?: string;
}

export type ICreateUser = Pick<
    IUser,
    'name' | 'email' | 'password'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
