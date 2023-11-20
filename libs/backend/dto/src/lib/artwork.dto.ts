import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { ArtworkType, ICreateArtwork, IUpdateArtwork, IUpsertArtwork } from '@client-side-project/shared/api';

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
    @IsNotEmpty()
    userId!: string | null;
}

export class UpsertArtworkDto implements IUpsertArtwork {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsDate()
    @IsNotEmpty()
    creationDate!: Date;

    @IsString()
    @IsNotEmpty()
    image!: string;

    @IsString()
    GalleryId!: string | null;

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
    @IsNotEmpty()
    userId!: string | null;
}

export class UpdateArtworkDto implements IUpdateArtwork {
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
    @IsNotEmpty()
    userId!: string | null;
}
