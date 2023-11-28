import { Injectable, NotFoundException } from '@nestjs/common';
import { IGallery } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GalleryService {
    TAG = 'GalleryService';

    //db connection in service
    constructor(@InjectModel('gallery') private readonly galleryModel: Model<IGallery>) { }

    private galleries$ = new BehaviorSubject<IGallery[]>([
        // {
        //     id: '0',
        //     name: 'Art Gallery',
        //     location: 'Amsterdam',
        //     image: 'test',
        //     userId: '3',
        // },
        // {
        //     id: '1',
        //     name: "Katie's gallery",
        //     location: 'Breda',
        //     image:'test',
        //     userId: '1',
        // },
        // {
        //     id: '2',
        //     name: 'Modern Art Gallery',
        //     location: 'New York',
        //     image: 'test',
        //     userId: null,
        // },
        // {
        //     id: '3',
        //     name: 'Nature Gallery',
        //     location: 'Paris',
        //     image: 'test',
        //     userId: null,
        // },
        // {
        //     id: '4',
        //     name: 'Contemporary Gallery',
        //     location: 'London',
        //     image: 'test',
        //     userId: null,
        // }
    ]);

    // getAll(): IGallery[] {
    //     Logger.log('getAll', this.TAG);
    //     return this.galleries$.value;
    // }
    

    //db 
   async getAll(): Promise<IGallery[]> {
        Logger.log('getAll DataBase', this.TAG);
        return await this.galleryModel.find().exec();
    }

    async getOne(_id: string): Promise<IGallery> {
        Logger.log(`getOne(${_id})`, this.TAG);
        const gallery = await this.galleryModel.findOne({ _id }).exec();
        if (!gallery) {
            throw new NotFoundException(`Gallery not found!`);
        }
        return gallery;
    }

    async create(gallery: Pick<IGallery, 'name' | 'location' | 'image'>): Promise<IGallery> {
        Logger.log('create', this.TAG);
        var id = new mongoose.Types.ObjectId();
        
        const newGallery: IGallery = {
            ...gallery,
            userId: null,
            _id: id.toString(),
        };
        const createdGallery = await this.galleryModel.create(newGallery);
        return createdGallery;
    }

    async update(id: string, gallery: Partial<IGallery>): Promise<IGallery> {
        Logger.log(`update(${id})`, this.TAG);
        const updatedGallery = await this.galleryModel.findOneAndUpdate({ _id: id }, gallery, { new: true }).exec();
        if (!updatedGallery) {
            throw new NotFoundException(`Gallery could not be found!`);
        }
        return updatedGallery;
    }

    async delete(id: string): Promise<void> {
        Logger.log(`delete(${id})`, this.TAG);
        const gallery = await this.galleryModel.findOne({ _id: id }).exec();
        if (!gallery) {
            throw new NotFoundException(`Gallery could not be found!`);
        }
        await this.galleryModel.deleteOne({ _id: id }).exec();
    }
}

    

