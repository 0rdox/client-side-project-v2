import { Id } from './id.type';
import { IUser } from './user.interface';

export enum ArtworkType {
    painting = "Painting",
}

export interface IArtwork {
    id: Id;
    title: string;
    description: string;
    type: ArtworkType;
    creationDate: Date;
    image: string;
    user: IUser | null;
    galleryId?: Id;
}

export type ICreateArtwork = Pick<
    IArtwork,
    'title' | 'description' | 'type' | 'user'
>;
export type IUpdateArtwork = Partial<Omit<IArtwork, 'id'>>;
export type IUpsertArtwork = IArtwork;
