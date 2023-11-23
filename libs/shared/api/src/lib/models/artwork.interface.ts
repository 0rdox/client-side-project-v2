import { Id } from './id.type';

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
    userId: Id | null;
    galleryId?: Id | null;
}

export type ICreateArtwork = Pick<
    IArtwork,
    'title' | 'description' | 'type' | 'userId'
>;
export type IUpdateArtwork = Partial<Omit<IArtwork, 'id'>>;
export type IUpsertArtwork = IArtwork;
