import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//meal
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealEditComponent } from './meal/meal-edit/meal-edit.component';
import { MealService } from './meal/meal.service';
// //user
// import { UserListComponent } from './user/user-list/user-list.component';
// import { UserService } from './user/user.service';

//
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MealListComponent,
  },
  {
path:'new',
pathMatch:'full',
component:MealEditComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: MealDetailComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: MealEditComponent,
  }



  //Gallery en User in Features Model routing --> Children
  

];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule, FormsModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
   MealEditComponent,
  ],
  providers: [MealService, ],
  exports: [MealListComponent, MealDetailComponent, ],
})
export class FeaturesModule { }
