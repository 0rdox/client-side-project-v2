import { IArtwork } from './artwork.interface';
import { Id } from './id.type';


export interface IGallery {
    _id: Id;
    name: string;
    description:string;
    location: string;
    image: string;
    userId?: Id| null;
    artworks?: IArtwork[] | null;
}

export type ICreateGallery = Pick<
    IGallery,
    'name' | 'location' | 'image'  | 'description'
>;


export type IUpdateGallery = Partial<Omit<IGallery, 'id'>>;
export type IUpsertGallery = IGallery;
