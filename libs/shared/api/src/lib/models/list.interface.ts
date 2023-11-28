import { IArtwork } from './artwork.interface';
import { Id } from './id.type';
import { IUser } from './user.interface';

export enum ListType {
    painting = "Painting",
}

export interface IList {
    id: Id;
    title: string;
    description: string;
    user: IUser;
    artworks: IArtwork[] | null;
}

export type ICreateList = Pick<
    IList,
    'title' | 'description' | 'user' 
>;
export type IUpdateList = Partial<Omit<IList, 'id'>>;
export type IUpsertList = IList;
