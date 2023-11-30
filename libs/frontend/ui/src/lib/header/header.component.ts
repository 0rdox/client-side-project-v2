import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@client-side-project/backend/auth';
import { IUser } from '@client-side-project/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-side-project-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})


export class HeaderComponent implements OnInit {
  user: IUser | null | undefined;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
 }
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;
    
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/about']);
  }
}
