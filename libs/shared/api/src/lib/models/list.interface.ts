import { IArtwork } from './artwork.interface';
import { Id } from './id.type';
import { IUser } from './user.interface';

export enum ListType {
    painting = "Painting",
}

export interface IList {
    title: string;
    description: string;
    userId: Id;
    artworks: IArtwork[];
}

export type ICreateList = Pick<
    IList,
    'title' | 'description' | 'userId' 
>;
export type IUpdateList = Partial<Omit<IList, 'id'>>;
export type IUpsertList = IList;
