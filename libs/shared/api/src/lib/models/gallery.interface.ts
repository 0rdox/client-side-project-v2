import { Id } from './id.type';


// Voor nu is onze Gallery een string; later zullen we hier een Gallery object van maken.
type Gallery = string;

export interface IGallery {
    id: Id;
    name: string;
    email: string;
    password: string;

}

export type ICreateGallery = Pick<
    IGallery,
    'name' | 'email' | 'password'
>;
export type IUpdateGallery = Partial<Omit<IGallery, 'id'>>;
export type IUpsertGallery = IGallery;
