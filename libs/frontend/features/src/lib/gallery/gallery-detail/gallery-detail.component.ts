import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { IGallery } from '@client-side-project/shared/api';
import { GalleryService } from '../gallery.service';
import { UserService } from '@client-side-project/frontend/features';
import { IUser } from '@client-side-project/shared/api';
import { Observable } from 'rxjs';

import  mongoose  from 'mongoose';

@Component({
  selector: 'client-side-project-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css'],
})
export class GalleryDetailComponent implements OnInit, OnDestroy {
  gallery: IGallery | null = null;
  subscription: Subscription | undefined = undefined;

  user: IUser | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : undefined;
    
    this.subscription = this.route.params.pipe(
      switchMap(params => {
        return this.galleryService.read(params['id']);
      })
    ).subscribe((results) => {
      this.gallery = results;
      if (this.gallery && this.gallery.userId) {
        this.getUserById(this.gallery.userId).subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    if (this.gallery) {
      this.galleryService.removeGallery(this.gallery._id).subscribe(() => console.log("Gallery Deleted"));
    }
    this.router.navigate(['/gallery']);
  }

  onClaim() {
    if (this.gallery) {

  
      
      this.gallery.userId = this.user?._id;

      console.log(this.gallery, "GALLERY")
      this.galleryService.updateGallery(this.gallery).subscribe(() => console.log("Gallery updated"));
    }
    // this.router.navigate(['/gallery']);
  }

  getUserById(id: string): Observable<IUser> {
    console.log(this.userService.read(id), "USER FROM GALLERY");
    return this.userService.read(id);
  }
}


