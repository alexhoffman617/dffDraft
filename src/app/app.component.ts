import { Component, Directive, Input, HostBinding } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FORM_DIRECTIVES } from '@angular/forms';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdInput } from '@angular2-material/input/input';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';





@Component({
  moduleId: module.id,
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES,
  FORM_DIRECTIVES,
  MdToolbar,
  MdInput,
  MD_SIDENAV_DIRECTIVES]
})


export class AppComponent {
  items: FirebaseListObservable<any[]>;
  chats: FirebaseListObservable<any[]>;
  chatsPush: FirebaseListObservable<any[]>;
  title: 'app works!';
  name: "";
  message: "";
  clicked(){    
    this.chatsPush.push({name: this.name, message: this.message});
  }
  constructor(af: AngularFire) {
    this.items = af.database.list('items');

    this.chatsPush = af.database.list('chat')
    this.chats = af.database.list('chat',{
        query:{
          limitToLast:20
      }
    }
  );

    this.name = ""
    this.message = ""

  }
}
