import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateGallery,
    IUpdateGallery,
    IUpsertGallery,
} from '@client-side-project/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateGalleryDto implements ICreateGallery {
    @IsString()
    @IsNotEmpty()
    name!: string;
    
    @IsString()
    @IsNotEmpty()
    location!: string;
    
    @IsString()
    @IsNotEmpty()
    image!: string;

}

export class UpsertGalleryDto implements IUpsertGallery {
 
 
    id!: string;
 
    userId?: string | null | undefined;
 
 
    @IsString()
    @IsNotEmpty()
    name!: string;
    
    @IsString()
    @IsNotEmpty()
    location!: string;
    
    @IsString()
    @IsNotEmpty()
    image!: string;
}

export class UpdateGalleryDto implements IUpdateGallery {
    @IsString()
    @IsNotEmpty()
    name!: string;
    
    @IsString()
    @IsNotEmpty()
    location!: string;
    
    @IsString()
    @IsNotEmpty()
    image!: string;
}
