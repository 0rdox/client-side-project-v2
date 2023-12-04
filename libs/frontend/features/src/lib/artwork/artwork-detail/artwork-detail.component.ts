import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { IArtwork, IGallery } from '@client-side-project/shared/api';
import { ArtworkService } from '../artwork.service';
import { UserService } from '@client-side-project/frontend/features';
import { IUser } from '@client-side-project/shared/api';
import { Observable } from 'rxjs';
//import { ArtworkService as backendArtworkService } from 'libs/backend/features/src/lib/artwork/artwork.service';
import mongoose from 'mongoose';
import { GalleryService } from '../../gallery/gallery.service';

@Component({
  selector: 'client-side-project-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css'],
})
export class ArtworkDetailComponent implements OnInit, OnDestroy {
  artwork: IArtwork | null = null;
  subscription: Subscription | undefined = undefined;

  user: IUser | undefined;
  owned = false;
  hasArtwork = false;

  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private userService: UserService,
    private galleryService: GalleryService,
    private router: Router
  ) {}

  //TODO: SHOULD ONLY BE ABLE TO CLAIM 1 ARTWORK

  ngOnInit(): void {
    //get user from local storage
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : undefined;
    
    //use this instead of api call?
    console.log(this.user, 'USER FROM LOCAL STORAGE');

    this.userService.read(this.user?._id ?? null).subscribe((user) => {
      this.user = user;
      console.log(user, 'USER FROM API');
    });

    console.log(this.user, 'USER FROM LOCAL STORAGE');
    
    //check whether user has artwork
    this.subscription = this.route.params
      .pipe(
        switchMap((params) => {
          return this.artworkService.read(params['id']);
        })
      )
      .subscribe((results) => {
        this.artwork = results;
        console.log(this.artwork, "ARTWORK");
        if (this.artwork && this.artwork.userId) {
          this.getUserById(this.artwork.userId).subscribe((user) => {
            this.user = user;
          });

          if (this.user?._id === this.artwork?.userId) {
            this.owned = true;
            this.canEdit = true
          }

          console.log(this.user?._id, 'USER ID');
          console.log(this.artwork?.userId, 'ARTWORK USER ID');
        }
      });

  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    const galleryId = this.artwork?.galleryId;

    if (this.artwork) {
      this.artworkService.removeArtwork(this.artwork._id).subscribe(() => {
        console.log("Artwork Deleted");

        if (galleryId) {
          this.galleryService.read(galleryId).subscribe((gallery: IGallery) => {
            // Remove the artwork from the gallery
            const artworkIndex = gallery.artworks!.findIndex((artwork: IArtwork) => artwork._id === this.artwork!._id);
           
            console.log(artworkIndex, "ARTWORK INDEX")
            console.log(gallery.artworks, "GALLERY ARTWORKS")
            if (artworkIndex !== -1) {
              gallery.artworks!.splice(artworkIndex, 1);
            }


            console.log(gallery.artworks, "GALLERY ARTWORKS AFTER SPLICE")
            // Update the gallery
            this.galleryService.updateGallery(gallery).subscribe(() => {
              this.router.navigate(['/gallery', galleryId]);
            });
          });
        }
      });
    }

   }

  getUserById(id: string): Observable<IUser> {
    console.log(this.userService.read(id), 'USER FROM ARTWORK');
    return this.userService.read(id);
  }
}
