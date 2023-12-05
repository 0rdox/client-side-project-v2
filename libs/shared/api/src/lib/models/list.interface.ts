import { IArtwork } from './artwork.interface';
import { Id } from './id.type';
import { IUser } from './user.interface';

export enum ListType {
    painting = "Painting",
}

export interface IList {
    _id: Id;
    title: string;
    description: string;
    userId: Id;
    image: string;
    artworks?: IArtwork[];
}

export type ICreateList = Pick<
    IList,
    'title' | 'description' | 'userId' | 'image' 
>;
export type IUpdateList = Partial<Omit<IList, 'id'>>;
export type IUpsertList = IList;
