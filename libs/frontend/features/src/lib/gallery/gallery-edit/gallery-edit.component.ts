
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../gallery.service';
import { IGallery } from '@client-side-project/shared/api';

@Component({
  selector: 'client-side-project-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.css'],
})
export class GalleryEditComponent implements OnInit {
  name = '';
  email = '';
  location = '';
  userId = '';
  image = '';

  isEditing = false; // Add a flag to track if editing or creating

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    private router: Router,
  ) { }

  private gallery!: IGallery;

  ngOnInit() {
    const galleryId = this.route.snapshot.paramMap.get('id');
    
    if (galleryId) {
      this.isEditing = true;
      this.galleryService.read(galleryId).subscribe((gallery: IGallery) => {
        this.gallery = gallery;
        this.name = gallery.name;
        this.location = gallery.location;
        this.userId = gallery.userId ?? '';
        this.image = gallery.image ?? '';
      });
    }
  }
  
  saveGallery() {
    console.log("Save gallery clicked", "tag");
    console.log(this.isEditing, "tag");
    if (this.isEditing) {
      this.updateGallery();
    } else {
      this.createGallery();
    }
  }

  createGallery() {
    console.log("creating gallery clicked in gallery-edit.component.ts", "TAG");
    const newGallery: IGallery = {
      id: 'undefined',
      name: this.name, 
      location: this.location, 
      userId: this.userId, 
      image: this.image
    };
    this.galleryService.createGallery(newGallery).subscribe(() => {
      this.router.navigate(['/gallery']);
    });
  }

  updateGallery() {
    console.log("updating gallery clicked in gallery-edit.component.ts", "TAG");

    console.log(this.name);
    const updatedGallery: IGallery = {
      id: this.gallery.id,
      name: this.name,
      location: this.location, 
      userId: this.userId,
      image: this.image,
    };

    console.log(updatedGallery)
    this.galleryService.updateGallery(updatedGallery).subscribe(() => {
      this.router.navigate(['/gallery']);
    });
  }
 
}


