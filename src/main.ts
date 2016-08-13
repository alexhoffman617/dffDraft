import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import {PLATFORM_DIRECTIVES, provide} from '@angular/core';
import {FlexDirective}  from './app/flex.directive';
import {LayoutDirective}  from './app/layout.directive';
import { LoginService }  from './app/services/login.service';


import { AppRoutes } from './app/app.routing';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, { useValue: FlexDirective, multi: true}),
  provide(PLATFORM_DIRECTIVES, { useValue: LayoutDirective, multi: true}),
  LoginService,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyCWZiCSTN8Z0gI9KMGxgX3L_DTN5K1sjyQ",
    authDomain: "dynasty-contract-ff.firebaseapp.com",
    databaseURL: "https://dynasty-contract-ff.firebaseio.com",
    storageBucket: "dynasty-contract-ff.appspot.com"
  }),
  AppRoutes
]);
