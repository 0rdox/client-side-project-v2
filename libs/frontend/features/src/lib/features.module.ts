import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';
import { GalleryDetailComponent } from './gallery/gallery-detail/gallery-detail.component';
import { GalleryEditComponent } from './gallery/gallery-edit/gallery-edit.component';
import { GalleryService } from './gallery/gallery.service';

import { UiModule } from '@client-side-project/frontend/ui';

import { ArtworkEditComponent } from './artwork/artwork-edit/artwork-edit.component';
import { ArtworkService } from './artwork/artwork.service';
import { ArtworkDetailComponent } from './artwork/artwork-detail/artwork-detail.component';
import { ListListComponent } from './list/list-list/list-list.component';
import { ListDetailComponent } from './list/list-detail/list-detail.component';
import { ListEditComponent } from './list/list-edit/list-edit.component';
import { ListService } from './list/list.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
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
      },
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
  {
    path: 'artwork',
    children: [
      {
        path: ':id',
        pathMatch: 'full',
        component: ArtworkDetailComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ArtworkEditComponent,
      },
    ],
  },
  {
    path: 'list',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ListListComponent,
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: ListEditComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: ListDetailComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ListEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,

    GalleryListComponent,
    GalleryDetailComponent,
    GalleryEditComponent,

    ArtworkEditComponent,
    ArtworkDetailComponent,

    ListListComponent,
    ListDetailComponent,
    ListEditComponent,
  ],
  providers: [UserService, GalleryService, ArtworkService, ListService],
  exports: [
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,

    GalleryListComponent,
    GalleryDetailComponent,
    GalleryEditComponent,

    ArtworkEditComponent,
    ArtworkDetailComponent,

    ListListComponent,
    ListDetailComponent,
    ListEditComponent,
  ],
})
export class FeaturesModule {}
