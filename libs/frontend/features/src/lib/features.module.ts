import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//meal
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealService } from './meal/meal.service';
//user
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/user.service';

//
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'meal',
    pathMatch: 'full',
    component: MealListComponent,
  },
  // {
  //   path: 'user',
  //   pathMatch: 'full',
  //   component: UserListComponent,
  // },
  {
    path: ':id',
    pathMatch: 'full',
    component: MealDetailComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    UserListComponent
  ],
  providers: [MealService, UserService],
  exports: [MealListComponent, MealDetailComponent, UserListComponent],
})
export class FeaturesModule { }
