import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IList, IUser } from '@client-side-project/shared/api';
import { ListService } from '../list.service';

@Component({
  selector: 'client-side-project-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.css'],
})
export class ListListComponent implements OnInit, OnDestroy {
  lists: IList[] | null = null;
  subscription: Subscription | undefined;
  isLoading = false;
  artworkCounts: { [listId: string]: number } = {}; // Object to store artwork counts for each list

  user!: IUser;
  admin = false;
  constructor(private listService: ListService) {}

  ngOnInit(): void {



    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;
   
    if (this.user?.role === 'Admin') {
      this.admin = true;
    }

    this.isLoading = true;
    if(this.admin) {   
      this.subscription = this.listService.list().subscribe((results) => {
        console.log(`results: ${results}`);
        this.lists = results;
        this.calculateArtworkCounts(); // Update artwork counts
        this.isLoading = false;

        console.log(this.lists, 'LISTS');
      });
    } else {
      this.subscription = this.listService.listForUser(this.user._id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.lists = results;
        this.calculateArtworkCounts(); // Update artwork counts
        this.isLoading = false;

        console.log(this.artworkCounts, 'ARTWORK COUNTS')

        console.log(this.lists, 'LISTS');
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private calculateArtworkCounts(): void {
    this.artworkCounts = {}; // Reset artwork counts
    if (this.lists) {
      for (const list of this.lists) {
        this.artworkCounts[list._id] = list.artworks!.length;
      }
    }
  }
}
