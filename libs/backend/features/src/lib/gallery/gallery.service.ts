import { Injectable, NotFoundException } from '@nestjs/common';
import { IGallery, galleriesort } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class GalleryService {
    TAG = 'GalleryService';

    private galleries$ = new BehaviorSubject<IGallery[]>([
        {
            id: '0',
            title: 'Spaghetti con funghi',
            description: 'Vega version of the famous spaghetti recipe.',
            isVega: true,
            dateServed: new Date(),
            cook: "Gordon Ramsey",
            sort: galleriesort.Dinner,
        },
        {
            id: '1',
            title: 'Hamburger',
            description: 'Hamburger with cheese',
            isVega: false,
            dateServed: new Date(),
            cook: "Jamie Oliver",
            sort: galleriesort.Dinner,
        }
    ]);

    getAll(): IGallery[] {
        Logger.log('getAll', this.TAG);
        return this.galleries$.value;
    }

    getOne(id: string): IGallery {
        Logger.log(`getOne(${id})`, this.TAG);
        const meal = this.galleries$.value.find((td) => td.id === id);
        if (!meal) {
            throw new NotFoundException(`Meal could not be found!`);
        }
        return meal;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(meal: Pick<IGallery, 'title' | 'description'>): IGallery {
        Logger.log('create', this.TAG);
        const current = this.galleries$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newMeal: IGallery = {
            ...meal,
            id: `meal-${Math.floor(Math.random() * 10000)}`,
            isVega: false,
            dateServed: new Date(),
            cook: "Janko Seremak",
            sort: galleriesort.Breakfast,
        };
        this.galleries$.next([...current, newMeal]);
        return newMeal;
    }
}
