import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ActivitiesListComponent } from './features/activities/activities-list/activities-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'activities', pathMatch: 'full' },
      {
        path: 'activities',
        component: ActivitiesListComponent,
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  // Wildcard route for 404
  { path: '**', redirectTo: '' }
];
