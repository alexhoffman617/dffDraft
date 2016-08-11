import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerTableComponent } from './playerTable/playerTable.component';

const appRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'players',
    component: PlayerTableComponent
  }
];

export const AppRoutes = [
  provideRouter(appRoutes)
];