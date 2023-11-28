import { Route } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';
import { AboutComponent } from '@client-side-project/frontend/features';

import { UserEditComponent } from 'libs/frontend/features/src/lib/user/user-edit/user-edit.component';

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
        path:'',
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
    {
        path: 'create',
        component: UserEditComponent,
    },
    {
        path: 'login',
        component: UserEditComponent,
    }
]

