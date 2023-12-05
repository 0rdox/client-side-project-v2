import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { ListType, ICreateList, IUpdateList, IUpsertList, IUser, IArtwork } from '@client-side-project/shared/api';

export class CreateListDto implements ICreateList {
    
    image!: string;
    title!: string;
    description!: string;
    userId!: string;
    artworks!: IArtwork[];
}

export class UpsertListDto implements IUpsertList {
    image!: string;
    artworks!: IArtwork[];
    _id!: string;
    title!: string;
    description!: string;
    userId!: string;
}

export class UpdateListDto implements IUpdateList {
    title!: string;
    description!: string;
    userId!: string;
    image!: string;
}
