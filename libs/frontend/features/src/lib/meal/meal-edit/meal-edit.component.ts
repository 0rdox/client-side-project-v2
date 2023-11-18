import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMeal } from '@client-side-project/shared/api';
import { MealService } from '../meal.service';
import { MealSort } from '@client-side-project/shared/api';


@Component({
  selector: 'client-side-project-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.css'],
})

export class MealEditComponent implements OnInit {
  title = '';
  description = '';
  cook = '';
  isVega = false;
  dateServed = new Date();
  sort = MealSort.Breakfast;
//change to gallery:IGallery 

  isEditing = false; // Add a flag to track if editing or creating

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private router: Router,
  ) { }

  private meal!: IMeal;

  ngOnInit() {
    const mealId = this.route.snapshot.paramMap.get('id');
    
    if (mealId) {
      this.isEditing = true;
      this.mealService.read(mealId).subscribe((meal: IMeal) => {
        this.meal = meal;
        this.title = meal.title;
        this.description = meal.description;
      });
    }


  }
  
  saveMeal() {
  console.log("save meal", "tag");

    if (this.isEditing) {
      this.updateMeal();
    } else {
      this.createMeal();
    }
  }

  updateMeal() {
    console.log("updating meal", "TAG");
    const updatedMeal: IMeal = {
      id: this.meal.id,
      title: this.title,
      description: this.description,
      cook: this.meal.cook,
      isVega: this.meal.isVega,
      dateServed: this.meal.dateServed,
      sort: this.meal.sort,
    };
    this.mealService.update(updatedMeal).subscribe(() => {
      this.router.navigate(['/meal']);
    });
  }


  createMeal() {
    console.log("creating meal", "TAG");
    const newMeal: IMeal = {
      id: '',
      title: this.title,
      description: this.description,
      isVega: false,
      dateServed: new Date(),
      sort: MealSort.Breakfast,
      cook: this.cook,
    };
    this.mealService.create(newMeal).subscribe(() => {
      this.router.navigate(['/meal']);
    });
  }
}
//     const mealId = this.route.snapshot.paramMap.get('id');
//     console.log(mealId, "ID");
//     this.mealService.read(mealId).subscribe((meal: Imeal) => {
//       this.name = meal.name;
//       this.email = meal.email;
//     });
//   }

//   updatemeal() {
//     const mealId = this.route.snapshot.paramMap.get('id');
//     console.log(mealId, "ID");
//     this.mealService.read(mealId).subscribe((meal: Imeal) => {
//       const updatedmeal: Imeal = {
//         id: meal.id,
//         name: this.name,
//         email: this.email,
//         password: meal.password
//       };
//       this.mealService.updatemeal(updatedmeal);

// console.log("Finished Update", "TAG");
//       this.router.navigate(['/meal']);
//       console.log("Navigated", "TAG");
//     });
//   }
//}
