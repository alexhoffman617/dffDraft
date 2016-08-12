import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerTableComponent } from './playerTable/playerTable.component';
import { PlayerComponent } from './player/player.component';
import { UserComponent } from './user/user.component';


const appRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'players',
    component: PlayerTableComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'user',
    component: UserComponent
  }
];

export const AppRoutes = [
  provideRouter(appRoutes)
];