import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IUser } from '@client-side-project/shared/api';
import { UserService } from '../user.service';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-side-project-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  users: IUser | null = null;
  subscription: Subscription | undefined = undefined;
  canEdit: boolean = false; // Add isEdit property
  admin = false;
  constructor(
    private route: ActivatedRoute, 
    private UserService: UserService,
    private router: Router,
  ) { }
  userString = localStorage.getItem('user');
  user = this.userString ? JSON.parse(this.userString) : undefined;

  ngOnInit(): void {
    console.log("INIT")
    this.subscription = this.route.params.pipe(
      switchMap(params => {
        return this.UserService.read(params['id']);
      })
    ).subscribe((results) => {
      console.log(`results: ${JSON.stringify(results)}`);
      this.users = results;

      if (this.user?.role === 'Admin') {
        this.admin = true;
      }
      
      this.canEdit = this.users?._id === this.user?._id || this.user?.role === 'admin';
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    if (this.users) {
      if (this.users._id === this.user._id) {
        localStorage.removeItem('user');
        
        this.UserService.removeUser(this.users._id).subscribe(() => {
          console.log("user deleted");
          //TODO: this
          window.location.href = '/';
          // this.router.navigate(['/user']);
        });
      } else {
        this.UserService.removeUser(this.users._id).subscribe(() => {
          console.log("user deleted");
        this.router.navigate(['/user']);
        });
      }
    }
  }
}
