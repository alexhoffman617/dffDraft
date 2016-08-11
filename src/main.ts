import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyCWZiCSTN8Z0gI9KMGxgX3L_DTN5K1sjyQ",
    authDomain: "dynasty-contract-ff.firebaseapp.com",
    databaseURL: "https://dynasty-contract-ff.firebaseio.com",
    storageBucket: "dynasty-contract-ff.appspot.com"
  })
]);
