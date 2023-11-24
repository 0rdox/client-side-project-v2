import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealEditComponent } from './meal/meal-edit/meal-edit.component';
import { MealService } from './meal/meal.service';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';
import { GalleryDetailComponent } from './gallery/gallery-detail/gallery-detail.component';
import { GalleryEditComponent } from './gallery/gallery-edit/gallery-edit.component';
import { GalleryService } from './gallery/gallery.service';

import { ArtworkEditComponent } from './artwork/artwork-edit/artwork-edit.component';
import { ArtworkService } from './artwork/artwork.service';

  const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/home',
    },
    {
      path: 'meal',
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: MealListComponent,
        },
        {
          path: 'new',
          pathMatch: 'full',
          component: MealEditComponent,
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
        },
      ],
    },
    {
      path: 'user',
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: UserListComponent,
        },
        {
          path: 'new',
          pathMatch: 'full',
          component: UserEditComponent,
        },
        {
          path: ':id',
          pathMatch: 'full',
          component: UserDetailComponent,
        },
        {
          path: ':id/edit',
          pathMatch: 'full',
          component: UserEditComponent,
        }
      ],
    },
    {
      path: 'gallery',
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: GalleryListComponent,
        },
        {
          path: 'new',
          pathMatch: 'full',
          component: GalleryEditComponent,
        },
        {
          path: ':id',
          pathMatch: 'full',
          component: GalleryDetailComponent,
        },
        {
          path: ':id/edit',
          pathMatch: 'full',
          component: GalleryEditComponent,
        },
        {
          path: ':id/add',
          pathMatch: 'full',
          component: ArtworkEditComponent,
        },
      ],
    },
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    MealEditComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    GalleryListComponent,
    GalleryDetailComponent,
    GalleryEditComponent,
    ArtworkEditComponent
  ],
  providers: [
    MealService,
    UserService,
    GalleryService,
    ArtworkService
  ],
  exports: [
    MealListComponent,
    MealDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    GalleryListComponent,
    GalleryDetailComponent,
    GalleryEditComponent,
    ArtworkEditComponent
  ],
})
export class FeaturesModule {}
