import { Injectable, NotFoundException } from '@nestjs/common';
import { IMeal, MealSort } from '@client-side-project/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class MealService {
    TAG = 'MealService';

    private meals$ = new BehaviorSubject<IMeal[]>([
        {
            id: '0',
            title: 'Spaghetti con funghi',
            description: 'Vega version of the famous spaghetti recipe.',
            isVega: true,
            dateServed: new Date(),
            cook: "Gordon Ramsey",
            sort: MealSort.Dinner,
        },
        {
            id: '1',
            title: 'Hamburger',
            description: 'Hamburger with cheese',
            isVega: false,
            dateServed: new Date(),
            cook: "Jamie Oliver",
            sort: MealSort.Dinner,
        },
        {
            id: '2',
            title: 'Chicken Curry',
            description: 'Delicious chicken curry with aromatic spices.',
            isVega: false,
            dateServed: new Date(),
            cook: "Sanjeev Kapoor",
            sort: MealSort.Lunch,
        },
        {
            id: '3',
            title: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella cheese, and basil.',
            isVega: true,
            dateServed: new Date(),
            cook: "Antonio Carluccio",
            sort: MealSort.Dinner,
        },
        {
            id: '4',
            title: 'Sushi',
            description: 'Fresh and delicious sushi rolls.',
            isVega: false,
            dateServed: new Date(),
            cook: "Jiro Ono",
            sort: MealSort.Lunch,
        },
        {
            id: '5',
            title: 'Pancakes',
            description: 'Fluffy pancakes with maple syrup.',
            isVega: true,
            dateServed: new Date(),
            cook: "Julia Child",
            sort: MealSort.Breakfast,
        }
    ]);

    getAll(): IMeal[] {
        Logger.log('getAll', this.TAG);
        return this.meals$.value;
    }

    getOne(id: string): IMeal {
        Logger.log(`getOne(${id})`, this.TAG);
        const meal = this.meals$.value.find((td) => td.id === id);
        if (!meal) {
            throw new NotFoundException(`Meal could not be found!`);
        }
        return meal;
    }

    create(meal: Pick<IMeal, 'title' | 'description'>): IMeal {
        Logger.log('create', this.TAG);
        const current = this.meals$.value;
        
        const newMeal: IMeal = {
            ...meal,
            id: `meal-${Math.floor(Math.random() * 10000)}`,
            isVega: false,
            dateServed: new Date(),
            cook: "Janko Seremak",
            sort: MealSort.Breakfast,
        };
        this.meals$.next([...current, newMeal]);
        return newMeal;
    }

    delete(id: string): IMeal {
        Logger.log(`delete(${id})`, this.TAG);
        const current = this.meals$.value;
        const mealIndex = current.findIndex((meal) => meal.id === id);

        if (mealIndex === -1) {
            throw new NotFoundException(`Meal could not be found!`);
        }

        const deletedMeal = current.splice(mealIndex, 1)[0];
        this.meals$.next(current);
        return deletedMeal;
    }
      
    
    update(id: string, meal: Partial<IMeal>): IMeal {
        Logger.log(`update(${id})`, this.TAG);
        const current = this.meals$.value;
        
        const mealIndex = current.findIndex((meal) => meal.id === id);

        if (mealIndex === -1) {
            throw new NotFoundException(`Meal could not be found!`);
        }

        const updatedMeal = {
            ...current[mealIndex],
            ...meal,
        };

        console.log(updatedMeal, "updatedMeal");    
        current[mealIndex] = updatedMeal;
        this.meals$.next(current);
        return updatedMeal;
    }
}
