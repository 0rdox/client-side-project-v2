import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { IGallery } from '@client-side-project/shared/api';
import { GalleryService } from '../gallery.service';
import { UserService } from '@client-side-project/frontend/features';
import { IUser } from '@client-side-project/shared/api';
import { Observable } from 'rxjs';
//import { GalleryService as backendGalleryService } from 'libs/backend/features/src/lib/gallery/gallery.service';
import mongoose from 'mongoose';

@Component({
  selector: 'client-side-project-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css'],
})
export class GalleryDetailComponent implements OnInit, OnDestroy {
  gallery: IGallery | null = null;
  subscription: Subscription | undefined = undefined;

  user: IUser | undefined;
  owned = false;

  admin = false;
  hasGallery = false;

  isLoading = false; 

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    private userService: UserService,
    private router: Router
  ) {}

  //TODO: SHOULD ONLY BE ABLE TO CLAIM 1 GALLERY

  ngOnInit(): void {
    this.isLoading = true;
    //get user from local storage
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : undefined;
    
    //use this instead of api call?
    console.log(this.user, 'USER FROM LOCAL STORAGE');

    this.userService.read(this.user?._id ?? null).subscribe((user) => {
      this.user = user;
    });

    
    //check whether user has gallery
    this.subscription = this.route.params
      .pipe(
        switchMap((params) => {
          return this.galleryService.read(params['id']);
        })
      )
      .subscribe((results) => {
        this.isLoading = false;
        this.gallery = results;
        if (this.gallery && this.gallery.userId) {
          this.getUserById(this.gallery.userId).subscribe((user) => {
            this.user = user;
          });

          if (this.user?.role === 'Admin') {
            this.admin = true;
          }
          if ((this.user?._id === this.gallery?.userId) ) {
            this.owned = true;
          }

     
        }
      });

  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  // onDelete() {
  //   if (this.gallery) {
  //     this.galleryService.removeGallery(this.gallery._id).subscribe(() => console.log("Gallery Deleted"));
  //   }
  //   this.router.navigate(['/gallery']);
  // }

  onLeave() {
    if (this.gallery && this.user) {
      this.gallery.userId = null;
      //remove artworks?
      this.gallery.artworks = null;


      this.owned = false;
      this.user.hasGallery = false;

      this.userService
        .updateUser(this.user)
        .subscribe(() => console.log('User updated'));

      this.galleryService
        .updateGallery(this.gallery)
        .subscribe(() => console.log('Gallery updated'));
    }
    this.router.navigate(['/gallery']);
  }

  onClaim() {
    if (this.gallery && this.user) {
      this.gallery.userId = this.user?._id;
      this.gallery.artworks = [];

      this.owned = true;

      this.user.hasGallery = true;
      this.userService
        .updateUser(this.user)
        .subscribe(() => console.log('User updated'));
      this.galleryService
        .updateGallery(this.gallery)
        .subscribe(() => console.log('Gallery updated'));
    }
    // this.router.navigate(['/gallery']);
  }

  getUserById(id: string): Observable<IUser> {
    console.log(this.userService.read(id), 'USER FROM GALLERY');
    return this.userService.read(id);
  }
}
