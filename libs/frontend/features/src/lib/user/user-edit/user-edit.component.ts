import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@client-side-project/shared/api';
import { UserService } from '../user.service';

@Component({
  selector: 'client-side-project-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  profilePicture = '';
  isEditing = false; // Add a flag to track if editing or creating

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  private user!: IUser;

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    //userid means logged in
    //i need a form for: name, email, password, profile image (create user)
    //i need a form for: email, password (login)

    //create a new component for login + create -> user-login


    if (userId) {
      this.isEditing = true;
      this.userService.read(userId).subscribe((user: IUser) => {
        this.user = user;
        this.name = user.name;
        this.email = user.email;
      });
    }
  }

  saveUser() {
    console.log('Save user clicked', 'tag');
    console.log(this.isEditing, 'tag');
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  updateUser() {
    console.log('updating user clicked in user-edit.component.ts', 'TAG');

    const updatedUser: IUser = {
      id: this.user.id,
      name: this.name,
      email: this.email,
      password: this.user.password,
    };
    this.userService.updateUser(updatedUser).subscribe(() => {
      this.router.navigate(['/user']);
    });
  }

  createUser() {
    console.log('creating user clicked in user-edit.component.ts', 'TAG');
    const newUser: IUser = {
      id: 'undefined',
      name: this.name,
      email: this.email,
      password: 'Secret123!', // Set a default password for new users
    };
    this.userService.createUser(newUser).subscribe(() => {
      this.router.navigate(['/user']);
    });
  }
}
//     const userId = this.route.snapshot.paramMap.get('id');
//     console.log(userId, "ID");
//     this.userService.read(userId).subscribe((user: IUser) => {
//       this.name = user.name;
//       this.email = user.email;
//     });
//   }

//   updateUser() {
//     const userId = this.route.snapshot.paramMap.get('id');
//     console.log(userId, "ID");
//     this.userService.read(userId).subscribe((user: IUser) => {
//       const updatedUser: IUser = {
//         id: user.id,
//         name: this.name,
//         email: this.email,
//         password: user.password
//       };
//       this.userService.updateUser(updatedUser);

// console.log("Finished Update", "TAG");
//       this.router.navigate(['/user']);
//       console.log("Navigated", "TAG");
//     });
//   }
//}
