import { Route } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';
import { MealListComponent, MealDetailComponent } from '@client-side-project/frontend/features';
import { AboutComponent } from '@client-side-project/frontend/features';


export const appRoutes: Route[] = [
    {
        path:'',
        pathMatch:'full',
        redirectTo: '/home'   
    },

    {
        //made component a dashboard
        path:'home',
        pathMatch:'full',
        component:NxWelcomeComponent,
    },
    {
        path:'meal',
        // pathMatch:'full',
        loadChildren:() =>
        import('@client-side-project/frontend/features').then(
            (esModule) => (esModule.FeaturesModule)
        )
    },
    {
        path:'user',
       // pathMatch:'full',
        loadChildren:() =>
        import('@client-side-project/frontend/features').then(
            (esModule) => (esModule.FeaturesModule)
        )
    },
    {
        path:'about', 
        component:AboutComponent,
    },
    {
        path:'contact',
        component:AboutComponent,
    },
]

