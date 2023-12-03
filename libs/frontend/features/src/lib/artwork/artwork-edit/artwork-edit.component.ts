import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkService } from '../artwork.service';
import { ArtworkType, IArtwork, IGallery } from '@client-side-project/shared/api';
import { IUser } from '@client-side-project/shared/api';
import { GalleryService } from '../../gallery/gallery.service';
import { Types } from 'mongoose';

@Component({
  selector: 'client-side-project-artwork-edit',
  templateUrl: './artwork-edit.component.html',
  styleUrls: ['./artwork-edit.component.css'],
})
export class ArtworkEditComponent implements OnInit {
  
  userString = localStorage.getItem('user');
  user = this.userString ? JSON.parse(this.userString) : undefined;
  id = this.user._id;

  
 
 title = '';
  description = '';
  type = 'undefined';
  creationDate = '';
  image = '';




// userString = localStorage.getItem('user');
// user = this.userString ? JSON.parse(this.userString) : undefined;


  isEditing = false; // Add a flag to track if editing or creating

  galleryId = this.route.snapshot.paramMap.get('id');
  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private galleryService: GalleryService,
    private router: Router,
  ) { }

  gallery = this.galleryService.read(this.galleryId).subscribe((gallery: any) => {});

  private artwork!: IArtwork;

  ngOnInit() {
    console.log("TESTING CONSOLE LOGS SSSSSSSSSSSSSSSSSSSSSS" , "TAGSSSSSSSSSSSSSSSSSSSSSSSSSSs");
    console.log(this.id, "id");
    console.log(this.user, "user");
    console.log(this.userString, "userString");
    const galleryId = this.route.snapshot.paramMap.get('id');
    console.log(galleryId, "galleryId");
    
    const url = window.location.protocol + '//' + window.location.host + window.location.pathname;
    
    if (url.includes("artwork")) {
      this.isEditing = true;
      // this.artworkService.read(artworkId).subscribe((artwork: IArtwork) => {
      //   this.artwork = artwork;
      //   this.title = artwork.title;
      //   this.description = artwork.description;
      //   this.type = artwork.type;
      //   this.creationDate = artwork.creationDate.toString();
      //   this.image = artwork.image;
      // });
    }
  }
  
  saveArtwork() {
    console.log("Save artwork clicked", "tag");
    console.log(this.isEditing, "tag");
    if (this.isEditing) {
      this.updateArtwork();
    } else {
      this.createArtwork();
    }
  }

  createArtwork() {
    console.log("creating artwork clicked in artwork-edit.component.ts", "TAG");

    // Get the gallery ID from the route parameter
    const galleryId = this.route.snapshot.paramMap.get('id');



    // Create a new artwork object
    const newArtwork: IArtwork = {
      _id: new Types.ObjectId().toString(),
      title: this.title,
      description: this.description,
      type: this.type as ArtworkType,
      creationDate: new Date(),
      image: this.image,
      userId: this.id,
    };

    // Add the artwork to the database
    this.artworkService.createArtwork(newArtwork).subscribe((result: any) => {
      // Update the artwork array of the gallery
      console.log(result, "result");
      this.galleryService.read(galleryId).subscribe((gallery: IGallery) => {
        gallery.artworks!.push(result); // Add the new artwork to the array
        this.galleryService.updateGallery(gallery).subscribe(() => {
          this.router.navigate(['/gallery', galleryId]);
        });
      });
    });
  }

    


  updateArtwork() {
    console.log("updating artwork clicked in artwork-edit.component.ts", "TAG");

    console.log(this.title, "title");
    const updatedArtwork: IArtwork = {
      _id: this.artwork._id,
      title: this.artwork.title,
      description: this.artwork.description,
      type: ArtworkType.painting,
      creationDate: new Date(),
      image: this.artwork.image,
      userId: this.artwork.userId
    };

    console.log(updatedArtwork)
    this.artworkService.updateArtwork(updatedArtwork).subscribe(() => {
      this.router.navigate(['/gallery']);
    });
  }

}