import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    // ICreateGallery,
    // IUpdateGallery,
    // IUpsertGallery,
} from '@client-side-project/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
// export class CreateGalleryDto implements ICreateGallery {
//     @IsString()
//     @IsNotEmpty()
//     name!: string;

//     @IsString()
//     @IsNotEmpty()
//     email!: string;


//     @IsString()
//     @IsNotEmpty()
//     password!: string;
// }

// export class UpsertGalleryDto implements IUpsertGallery {
//     @IsString()
//     @IsNotEmpty()
//     title!: string;

//     @IsString()
//     @IsNotEmpty()
//     description!: string;

//     @IsString()
//     @IsNotEmpty()
//     id!: string;

//     @IsBoolean()
//     @IsNotEmpty()
//     isVega!: boolean;

//     @IsDate()
//     @IsNotEmpty()
//     dateServed!: Date;

//     @IsString()
//     @IsNotEmpty()
//     sort!: GallerySort;

//     @IsString()
//     @IsNotEmpty()
//     cook!: string;
// }

// export class UpdateGalleryDto implements IUpdateGallery {
//     @IsString()
//     @IsOptional()
//     title!: string;

//     @IsString()
//     @IsOptional()
//     description!: string;

//     @IsBoolean()
//     @IsOptional()
//     completed!: boolean;
// }
