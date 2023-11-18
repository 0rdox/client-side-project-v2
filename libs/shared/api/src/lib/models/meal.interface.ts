import { Id } from './id.type';

export enum MealSort {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Other = 'Other'
}

// Voor nu is onze user een string; later zullen we hier een User object van maken.
type User = string;

export interface IMeal {
    id: string;
    title: string;
    description: string;
    isVega: boolean;
    dateServed: Date;
    sort: MealSort;
    cook: User | null;
}

export type ICreateMeal = Pick<
    IMeal,
    'title' | 'description' | 'sort' 
>;
export type IUpdateMeal = Partial<Omit<IMeal, 'id'>>;
export type IUpsertMeal = IMeal;
