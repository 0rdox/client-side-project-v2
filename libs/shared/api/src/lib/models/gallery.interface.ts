import { Id } from './id.type';


// Voor nu is onze Gallery een string; later zullen we hier een Gallery object van maken.
type Gallery = string;

export interface IGallery {
    id: Id;
    galleryName: string;
    location: string;
    image: string;
    userId?: Id| null;
}
export type ICreateGallery = Pick<
    IGallery,
    'galleryName' | 'location' | 'image' 
>;
export type IUpdateGallery = Partial<Omit<IGallery, 'id'>>;
export type IUpsertGallery = IGallery;
