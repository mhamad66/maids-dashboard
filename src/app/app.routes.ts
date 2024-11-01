import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users-list/users-list.component').then(m => m.UsersListComponent)
  },
  {
    path: 'user-details/:id',
    loadComponent: () => import('./users/user-details/user-details.component').then(m => m.UserDetailsComponent)
  },
  {
    path: 'charts',
    loadComponent: () => import('./charts/charts.component').then(m => m.ChartsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  }
];
