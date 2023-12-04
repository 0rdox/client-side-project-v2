import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { ListType, ICreateList, IUpdateList, IUpsertList, IUser } from '@client-side-project/shared/api';

export class CreateListDto implements ICreateList {
    title!: string;
    description!: string;
    userId!: string;
  
  
}

export class UpsertListDto implements IUpsertList {
    _id!: string;
    title!: string;
    description!: string;
    userId!: string;
}

export class UpdateListDto implements IUpdateList {
    title!: string;
    description!: string;
    userId!: string;
}
