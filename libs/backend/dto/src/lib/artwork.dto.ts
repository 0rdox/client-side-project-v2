import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { ArtworkType, ICreateArtwork, IUpdateArtwork, IUpsertArtwork, IUser } from '@client-side-project/shared/api';

export class CreateArtworkDto implements ICreateArtwork {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    type!: ArtworkType;

    @IsString()
    user!: IUser | null;
 
}

export class UpsertArtworkDto implements IUpsertArtwork {
    id!: string;
    title!: string;
    description!: string;
    type!: ArtworkType;
    creationDate!: Date;
    image!: string;
    user!: IUser | null;
    galleryId?: string | undefined;
}

export class UpdateArtworkDto implements IUpdateArtwork {
    id!: string;
    title!: string;
    description!: string;
    type!: ArtworkType;
    creationDate!: Date;
    image!: string;
    user!: IUser | null;
    galleryId?: string | undefined;
}
