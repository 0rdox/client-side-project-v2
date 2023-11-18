import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GalleryService } from './gallery.service';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { UserService } from '@client-side-project/frontend/user';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GalleryListComponent,
  },
  // {
  //   path: 'new',
  //   pathMatch: 'full',
  //   component: UserEditComponent,
  // },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule, FormsModule,],
  declarations: [GalleryListComponent, GalleryDetailComponent, GalleryEditComponent],
  providers: [GalleryService, UserService],
  exports: [GalleryListComponent, RouterModule],
})
export class GalleryModule {}


