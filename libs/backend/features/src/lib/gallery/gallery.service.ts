import { Injectable, NotFoundException } from '@nestjs/common';
import { IGallery } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GalleryService {
    TAG = 'GalleryService';

    //db connection in service
    constructor(@InjectModel('gallery') private readonly galleryModel: Model<IGallery>) { }

    private galleries$ = new BehaviorSubject<IGallery[]>([
        {
            id: '0',
            name: 'Art Gallery',
            location: 'Amsterdam',
            image: 'test',
            userId: '3',
        },
        {
            id: '1',
            name: "Katie's gallery",
            location: 'Breda',
            image:'test',
            userId: '1',
        },
        {
            id: '2',
            name: 'Modern Art Gallery',
            location: 'New York',
            image: 'test',
            userId: null,
        },
        {
            id: '3',
            name: 'Nature Gallery',
            location: 'Paris',
            image: 'test',
            userId: null,
        },
        {
            id: '4',
            name: 'Contemporary Gallery',
            location: 'London',
            image: 'test',
            userId: null,
        }
    ]);

    // getAll(): IGallery[] {
    //     Logger.log('getAll', this.TAG);
    //     return this.galleries$.value;
    // }
    

    //db 
    getAll(): Promise<IGallery[]> {
        Logger.log('getAll DataBase', this.TAG);
        return this.galleryModel.find().exec();
    }

    getOne(id: string): IGallery {
        Logger.log(`getOne(${id})`, this.TAG);
        const gallery = this.galleries$.value.find((td) => td.id === id);
        if (!gallery) {
            throw new NotFoundException(`Gallery could not be found!`);
        }
        return gallery;
    }

    create(gallery: Pick<IGallery, 'name' | 'location'>): IGallery {
        Logger.log('create', this.TAG);
        const current = this.galleries$.value;
        const newGallery: IGallery = {
            ...gallery,
            id: `gallery-${Math.floor(Math.random() * 10000)}`,
            image:'Undefined',
            userId: null,
        };
        this.galleries$.next([...current, newGallery]);
        return newGallery;
    }

    update(id: string, gallery: Partial<IGallery>): IGallery {
        Logger.log(`update(${id})`, this.TAG);
        const current = this.galleries$.value;
        const index = current.findIndex((g) => g.id === id);
        if (index === -1) {
            throw new NotFoundException(`Gallery could not be found!`);
        }
        const updatedGallery = {
            ...current[index],
            ...gallery,
        };
        current[index] = updatedGallery;
        this.galleries$.next(current);
        return updatedGallery;
    }

    delete(id: string): void {
        Logger.log(`delete(${id})`, this.TAG);
        const current = this.galleries$.value;
        const index = current.findIndex((g) => g.id === id);
        if (index === -1) {
            throw new NotFoundException(`Gallery could not be found!`);
        }
        current.splice(index, 1);
        this.galleries$.next(current);
    }
}

    

