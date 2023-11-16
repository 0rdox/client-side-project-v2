import { Injectable, NotFoundException } from '@nestjs/common';
import { IGallery } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class GalleryService {
    TAG = 'GalleryService';

    private galleries$ = new BehaviorSubject<IGallery[]>([
        {
            id: '0',
            name: 'Spaghetti con funghi',
            email: '',
            password: '',
           
        },
        {
            id: '1',
            name: 'Spaghetti con funghi',
            email: '',
            password: '',
      
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
    create(meal: Pick<IGallery, 'name' | 'email'>): IGallery {
        Logger.log('create', this.TAG);
        const current = this.galleries$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newMeal: IGallery = {
            ...meal,
            id: `meal-${Math.floor(Math.random() * 10000)}`,
            name: 'Spaghetti con funghi',
            email: '',
            password: '',
           
        };
        this.galleries$.next([...current, newMeal]);
        return newMeal;
    }
}
