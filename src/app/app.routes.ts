import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'all-trips', pathMatch: 'full' },
      {
        path: 'all-trips',
        loadComponent: () => import('./pages/all-trips/all-trips').then(m => m.AllTripsComponent)
      },
      {
        path: 'my-trips',
        loadComponent: () => import('./pages/my-trips/my-trips').then(m => m.MyTripsComponent)
      },
      {
        path: 'trip/:id',
        loadComponent: () => import('./pages/trip-detail/trip-detail').then(m => m.TripDetailComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
