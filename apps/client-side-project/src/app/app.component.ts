import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesModule } from '@client-side-project/frontend/features'
import { UiModule } from '@client-side-project/frontend/ui'
import { NxWelcomeComponent } from './nx-welcome.component';

import { GalleryModule } from '@client-side-project/frontend/gallery';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FeaturesModule, UiModule, GalleryModule],
  selector: 'client-side-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client-side-project';
}
