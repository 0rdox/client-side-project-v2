import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
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

];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule, FormsModule],
  declarations: [UserListComponent, UserDetailComponent, UserEditComponent],
  providers: [UserService],
  exports: [UserListComponent, RouterModule],
})
export class UserModule {}
