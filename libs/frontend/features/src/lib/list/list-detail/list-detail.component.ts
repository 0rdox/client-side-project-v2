import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { IList } from '@client-side-project/shared/api';
import { ListService } from '../list.service';
import { UserService } from '@client-side-project/frontend/features';
import { IUser } from '@client-side-project/shared/api';
import { Observable } from 'rxjs';
//import { ListService as backendListService } from 'libs/backend/features/src/lib/list/list.service';
import mongoose from 'mongoose';

@Component({
  selector: 'client-side-project-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css'],
})
export class ListDetailComponent implements OnInit, OnDestroy {
  list: IList | null = null;
  subscription: Subscription | undefined = undefined;

  user: IUser | undefined;
  owned = false;

  admin = false;


  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private userService: UserService,
    private router: Router
  ) {}

  //TODO: SHOULD ONLY BE ABLE TO CLAIM 1 LIST

  ngOnInit(): void {
    //get user from local storage
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : undefined;
    
    //use this instead of api call?

    this.userService.read(this.user?._id ?? null).subscribe((user) => {
      this.user = user;
    });

    
    
    //check whether user has list
    this.subscription = this.route.params
      .pipe(
        switchMap((params) => {
          return this.listService.read(params['id']);
        })
      )
      .subscribe((results) => {
        console.log(results, 'RESUTLS');
        this.list = results;

        console.log(this.list, "THIS.LIST");
        console.log(this.list.artworks, "artworks");
        
        if (this.list && this.list.userId) {
          this.getUserById(this.list.userId).subscribe((user) => {
            this.user = user;
          });

          if (this.user?.role === 'Admin') {
            this.admin = true;
          }
          if ((this.user?._id === this.list?.userId) ) {
            this.owned = true;
          }

        }
      });

  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    if (this.list) {
      this.listService.removeList(this.list._id).subscribe(() => {
        console.log("List Deleted");
        this.router.navigate(['/list']);
      });
    }
  }

onUpdate(){
  
}


  getUserById(id: string): Observable<IUser> {
    console.log(this.userService.read(id), 'USER FROM LIST');
    return this.userService.read(id);
  }
}
