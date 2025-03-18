import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'mantenedor',
    loadComponent: () =>
      import('./pages/mantenedor/mantenedor.page').then((m) => m.MantenedorPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'detalle',
    loadComponent: () =>
      import('./pages/detalle/detalle.page').then((m) => m.DetallePage),
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./pages/carrito/carrito.page').then((m) => m.CarritoPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
];