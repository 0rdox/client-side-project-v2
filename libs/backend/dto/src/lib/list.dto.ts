// import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
// import { ListType, ICreateList, IUpdateList, IUpsertList, IUser } from '@client-side-project/shared/api';

// export class CreateListDto implements ICreateList {
//     galleryId!: string;
    
//     @IsString()
//     @IsNotEmpty()
//     title!: string;

//     @IsString()
//     @IsNotEmpty()
//     description!: string;

//     @IsString()
//     @IsNotEmpty()
//     type!: ListType;


//     userId!: string ;

//     image!: string;
  
// }

// export class UpsertListDto implements IUpsertList {
//     userId!: string;
//     _id!: string;
//     title!: string;
//     description!: string;
//     type!: ListType;
//     creationDate!: Date;
//     image!: string;
//     galleryId!: string;
// }

// export class UpdateListDto implements IUpdateList {
//     _id!: string;
//     title!: string;
//     description!: string;
//     type!: ListType;
//     creationDate!: Date;
//     image!: string;
//     user!: IUser | null;
//     galleryId!: string;
// }
