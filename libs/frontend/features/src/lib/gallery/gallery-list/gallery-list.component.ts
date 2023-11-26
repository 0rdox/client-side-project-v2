import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IUser } from '@client-side-project/shared/api';
import { GalleryService } from '../gallery.service';
import { Subscription } from 'rxjs';
import { IGallery } from '@client-side-project/shared/api';

@Component({
  selector: 'client-side-project-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css'],
})
export class GalleryListComponent implements OnInit, OnDestroy {
  galleries: IGallery[] | null = null;
  subscription: Subscription | undefined = undefined;
  isLoading: boolean = false; // Add isLoading property

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.isLoading = true; // Set isLoading to true before making the request
    this.subscription = this.galleryService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.galleries = results;
      this.isLoading = false; // Set isLoading to false after receiving the response
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
