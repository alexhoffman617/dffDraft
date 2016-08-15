import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { PLATFORM_DIRECTIVES, provide } from '@angular/core';
import { FlexDirective }  from './flex.directive';
import { LayoutDirective }  from './layout.directive';
import { LoginService }  from './services/login.service';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import { AppRoutes } from './app.routing';


@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule,

    
    ],
    providers: [LoginService,
  provideForms(),
disableDeprecatedForms(),
    FIREBASE_PROVIDERS,
AppRoutes,
provide(PLATFORM_DIRECTIVES, { useValue: FlexDirective, multi: true}),
provide(PLATFORM_DIRECTIVES, { useValue: LayoutDirective, multi: true}),
  defaultFirebase({
    apiKey: "AIzaSyCWZiCSTN8Z0gI9KMGxgX3L_DTN5K1sjyQ",
    authDomain: "dynasty-contract-ff.firebaseapp.com",
    databaseURL: "https://dynasty-contract-ff.firebaseio.com",
    storageBucket: "dynasty-contract-ff.appspot.com"
  }),],
    bootstrap:    [AppComponent],
})
export class AppModule {}