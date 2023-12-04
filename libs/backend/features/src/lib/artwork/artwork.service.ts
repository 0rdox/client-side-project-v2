import { Injectable, NotFoundException } from '@nestjs/common';
import { IArtwork, ArtworkType } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ArtworkService {
    TAG = 'ArtworkService';

    constructor(
        @InjectModel('artwork') private readonly artworkModel: Model<IArtwork>,
    ) { }
    private artworks$ = new BehaviorSubject<IArtwork[]>([]);

    async getAll(): Promise<IArtwork[]> {
        Logger.log('getAll', this.TAG);
        return await this.artworkModel.find().exec();
    }

    async getOne(id: string): Promise<IArtwork> {
        Logger.log(`getOne(${id})`, this.TAG);
        const artwork = await this.artworkModel.findById(id).exec();
        if (!artwork) {
            throw new NotFoundException(`Artwork could not be found!`);
        }
        return artwork;
    }


    //todo: this
    //create -> userId out of localstorage
    async create(artwork: Pick<IArtwork, 'title' | 'description' | 'type' | 'image'| 'userId' >): Promise<IArtwork> {
        Logger.log('create', this.TAG);
        const newArtwork = new this.artworkModel({
            ...artwork,
            _id: new mongoose.Types.ObjectId(),
            creationDate: new Date(),
        });
        await newArtwork.save();
        return newArtwork;
    }

    async update(id: string, artwork: Partial<IArtwork>): Promise<IArtwork> {
        Logger.log(`update(${id})`, this.TAG);
        const updatedArtwork = await this.artworkModel.findByIdAndUpdate(id, artwork, { new: true }).exec();
        if (!updatedArtwork) {
            throw new NotFoundException(`Artwork could not be found!`);
        }
        return updatedArtwork;
    }

    async delete(id: string): Promise<void> {
        Logger.log(`delete(${id})`, this.TAG);
        const deletedArtwork = await this.artworkModel.findByIdAndDelete(id).exec();
        if (!deletedArtwork) {
            throw new NotFoundException(`Artwork could not be found!`);
        }
    }
}
