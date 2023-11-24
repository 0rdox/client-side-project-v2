import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IUser } from '@client-side-project/shared/api';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'client-side-project-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.subscription = this.userService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.users = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }

  resetUsers(){
   // this.userService.resetArray();
  }
}
