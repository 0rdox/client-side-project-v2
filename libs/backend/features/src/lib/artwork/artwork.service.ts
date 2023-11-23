import { Injectable, NotFoundException } from '@nestjs/common';
import { IArtwork, ArtworkType } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class ArtworkService {
    TAG = 'ArtworkService';

    private artworks$ = new BehaviorSubject<IArtwork[]>([
        {
            id: '1',
            title: 'Artwork 1',
            description: 'Description of Artwork 1',
            type: ArtworkType.painting,
            creationDate: new Date(),
            image: 'image1.jpg',
            userId: null,
        },
        {
            id: '2',
            title: 'Artwork 2',
            description: 'Description of Artwork 2',
            type: ArtworkType.painting,
            creationDate: new Date(),
            image: 'image2.jpg',
            userId: null,
        },
        {
            id: '3',
            title: 'Artwork 3',
            description: 'Description of Artwork 3',
            type: ArtworkType.painting,
            creationDate: new Date(),
            image: 'image3.jpg',
            userId: null,
        },
        {
            id: '4',
            title: 'Artwork 4',
            description: 'Description of Artwork 4',
            type: ArtworkType.painting,
            creationDate: new Date(),
            image: 'image4.jpg',
            userId: null,
        },
        {
            id: '5',
            title: 'Artwork 5',
            description: 'Description of Artwork 5',
            type: ArtworkType.painting,
            creationDate: new Date(),
            image: 'image5.jpg',
            userId: null,
        },
    ]);


    getAll(): IArtwork[] {
        Logger.log('getAll', this.TAG);
        return this.artworks$.value;
    }

    getOne(id: string): IArtwork {
        Logger.log(`getOne(${id})`, this.TAG);
        const Artwork = this.artworks$.value.find((td) => td.id === id);
        if (!Artwork) {
            throw new NotFoundException(`Artwork could not be found!`);
        }
        return Artwork;
    }

    create(Artwork: Pick<IArtwork, 'title' | 'description'>): IArtwork {
        Logger.log('create', this.TAG);
        const current = this.artworks$.value;
        const newArtwork: IArtwork = {
            ...Artwork,
            id: `Artwork-${Math.floor(Math.random() * 10000)}`,
            image: 'Undefined',
            userId: null,
            type: ArtworkType.painting,
            creationDate: new Date(),
        };
        this.artworks$.next([...current, newArtwork]);
        return newArtwork;
    }

    update(id: string, Artwork: Partial<IArtwork>): IArtwork {
        Logger.log(`update(${id})`, this.TAG);
        const current = this.artworks$.value;
        const index = current.findIndex((g) => g.id === id);
        if (index === -1) {
            throw new NotFoundException(`Artwork could not be found!`);
        }
        const updatedArtwork = {
            ...current[index],
            ...Artwork,
        };
        current[index] = updatedArtwork;
        this.artworks$.next(current);
        return updatedArtwork;
    }

    delete(id: string): void {
        Logger.log(`delete(${id})`, this.TAG);
        const current = this.artworks$.value;
        const index = current.findIndex((g) => g.id === id);
        if (index === -1) {
            throw new NotFoundException(`Artwork could not be found!`);
        }
        current.splice(index, 1);
        this.artworks$.next(current);
    }
}

    

