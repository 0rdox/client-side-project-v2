import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { IList } from '@client-side-project/shared/api';
import { Types } from 'mongoose';

@Component({
  selector: 'client-side-project-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css'],
})
export class ListEditComponent implements OnInit {

  title = '';
  description = '';
  image = '';


  isEditing = false; // Add a flag to track if editing or creating

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private router: Router,
  ) { }

  list!: IList;

  ngOnInit() {
    const listId = this.route.snapshot.paramMap.get('id');
    

    if (listId) {
      this.isEditing = true;
      this.listService.read(listId).subscribe((list: IList) => {
        this.list = list;
      });
    }
  }
  
  saveList() {
    console.log("Save list clicked", "tag");
    console.log(this.isEditing, "tag");
    if (this.isEditing) {
      this.updateList();
    } else {
      this.createList();
    }
  }

  createList() {
    console.log("creating list clicked in list-edit.component.ts", "TAG");
   
const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : undefined;

    const newList: IList = {
      _id: new Types.ObjectId().toString(),
      title: this.title,
      description: this.description,
      //localstorage user
      userId: user._id,
      image: this.image,
    };
    this.listService.createList(newList).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  updateList() {
    console.log("updating list clicked in list-edit.component.ts", "TAG");

    const updatedList: IList = {
      _id: this.list._id,
      title: this.list.title,
      description: this.list.description,
      userId: this.list.userId,
      image: this.list.image,
    };

    console.log(updatedList)
    this.listService.updateList(updatedList).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
 
}
