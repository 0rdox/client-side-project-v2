import { Component } from '@angular/core';
import { IUser } from '@client-side-project/shared/api';

@Component({
  selector: 'client-side-project-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})

export class UserEditComponent {
  user: IUser = {
    name: '',
    id: '',
    email: '',
    password: ''
  }


  // constructor {
  //   private UserService: UserService,
  //   private Route: ActivatedRoute,
  //   private Rrouter: Router,
  // }

}
