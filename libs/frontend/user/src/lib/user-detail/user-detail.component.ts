import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IUser } from '@client-side-project/shared/api';
import { UserService } from '../user.service';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'client-side-project-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  users: IUser | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private route: ActivatedRoute, private UserService: UserService) { }



  ngOnInit(): void {
    console.log("INIT")
    this.subscription = this.route.params.pipe(
      switchMap(params => {
        console.log(`switchMap params: ${JSON.stringify(params)}`);
        return this.UserService.read(params['id']);
      })
    ).subscribe((results) => {
      console.log(`results: ${JSON.stringify(results)}`);
      this.users = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
