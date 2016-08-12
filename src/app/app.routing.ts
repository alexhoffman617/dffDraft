import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatePlayerComponent } from './createPlayer/createPlayer.component';
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
    path: 'createPlayer',
    component: CreatePlayerComponent
  },
  {
    path: 'players',
    component: PlayerTableComponent
  },
  {
    path: 'player/:playerHash',
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