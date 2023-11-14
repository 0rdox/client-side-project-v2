import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from '../meal.service';
import { IMeal } from '@client-side-project/shared/api';
import { Subscription } from 'rxjs';


@Component({
    selector: 'client-side-project-meal-list',
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit, OnDestroy {
    meals: IMeal[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private mealService: MealService) {}

    ngOnInit(): void {
        this.subscription = this.mealService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.meals = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
