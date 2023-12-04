import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { ArtworkType, ICreateArtwork, IUpdateArtwork, IUpsertArtwork, IUser } from '@client-side-project/shared/api';

export class CreateArtworkDto implements ICreateArtwork {
    galleryId!: string;
    
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    type!: ArtworkType;


    userId!: string ;

    image!: string;
  
}

export class UpsertArtworkDto implements IUpsertArtwork {
    userId!: string;
    _id!: string;
    title!: string;
    description!: string;
    type!: ArtworkType;
    creationDate!: Date;
    image!: string;
    galleryId!: string;
}

export class UpdateArtworkDto implements IUpdateArtwork {
    _id!: string;
    title!: string;
    description!: string;
    type!: ArtworkType;
    creationDate!: Date;
    image!: string;
    user!: IUser | null;
    galleryId!: string;
}
