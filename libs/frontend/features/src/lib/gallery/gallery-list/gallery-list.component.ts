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

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
      this.subscription = this.galleryService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.galleries = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }


}
