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
loggedIn = false;
  friends!: string[];

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService,
    private router: Router
  ) {}
  
  userString = localStorage.getItem('user');
  userToken = localStorage.getItem('token');
  loggedInUser = this.userString ? JSON.parse(this.userString) : undefined;

  ngOnInit(): void {
    console.log('INIT');
    this.subscription = this.route.params
      .pipe(
        switchMap((params) => {
          return this.UserService.read(params['id']);
        })
      )
      .subscribe((results) => {
        console.log(`results: ${JSON.stringify(results)}`);
        this.users = results;


        if (this.loggedInUser != undefined ) {
        this.loggedIn = true;
        }
        
        // const decodedToken = jwt.decode(userToken)

        if (this.loggedInUser?.role === 'Admin') {
          this.admin = true;
        }

        this.canEdit =
          this.users?._id === this.loggedInUser?._id || this.loggedInUser?.role === 'admin';

        //get friends with neo4j
        this.UserService.getFriends(this.users?._id).subscribe((results) => {
          console.log(`My friends: ${JSON.stringify(results)}`);
          

          // this.friends = results;
          this.friends = [];
          for (let i = 0; i < results.length; i++) {
            const friend = results[i];
            console.log(friend, 'FRIEND');

            this.UserService.read(friend).subscribe((user: IUser) => {
              this.friends.push(user?.name);
              console.log(this.friends, 'FRIENDS');
            });
          }
        });
      });
      
  }


  recommendations = '' as any;

  getRecommmendations(id: string) {
    this.UserService.getRecommendations(id).subscribe((results) => {
      this.recommendations = results.map((result: any) => ({
        ...result,
        commonFriends: result.commonFriends ? result.commonFriends.low : 0,
      }));
    });
  }

  addFriend(friendId: string | undefined) {
    console.log(friendId, 'FRIENDID');
    console.log(this.loggedInUser?._id, 'USERID');

    if (this.friends.includes(friendId!)) {
      console.log('Friend already exists');
      return;
    }

    this.UserService.addFriend(this.loggedInUser, friendId!).subscribe((results) => {
      console.log(`results: ${JSON.stringify(results)}`);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    if (this.users) {
      if (this.users._id === this.loggedInUser._id) {
        localStorage.removeItem('user');

        this.UserService.removeUser(this.users._id).subscribe(() => {
          console.log('user deleted');
          //TODO: this
          window.location.href = '/';
          // this.router.navigate(['/user']);
        });
      } else {
        this.UserService.removeUser(this.users._id).subscribe(() => {
          console.log('user deleted');
          this.router.navigate(['/user']);
        });
      }
    }
  }
}
