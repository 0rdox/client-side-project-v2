import { Route } from '@angular/router';

import { AboutComponent, DashboardComponent } from '@client-side-project/frontend/features';
import {  UserEditComponent } from '@client-side-project/frontend/features';



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
        component:DashboardComponent,
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

