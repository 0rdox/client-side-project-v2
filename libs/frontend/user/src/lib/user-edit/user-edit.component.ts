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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
 private router: Router,
  ) { }
 
  private user!: IUser;

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.read(userId).subscribe((user: IUser) => {
      this.user = user;
      this.name = user.name;
      this.email = user.email;
    });
  }
  
  updateUser() {
    const updatedUser: IUser = {
      id: this.user.id,
      name: this.name,
      email: this.email,
      password: this.user.password
    };
    this.userService.updateUser(updatedUser).subscribe(() => {
      this.router.navigate(['/user']);
    });
  }

//   ngOnInit() {
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
}
