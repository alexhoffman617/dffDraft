import { Component, Directive, Input, HostBinding } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ROUTER_DIRECTIVES, RouterLink, RouterLinkActive } from '@angular/router';
import { FORM_DIRECTIVES } from '@angular/forms';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdInput } from '@angular2-material/input/input';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav/sidenav';
import { LoginService } from './services/login.service';
import { FlexDirective }  from './flex.directive';
import { LayoutDirective }  from './layout.directive';

interface IChat {
    name: string;
    message: string;
    timestamp: number;
 }



@Component({
  moduleId: module.id,
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES,
  RouterLink,
  RouterLinkActive,
  FORM_DIRECTIVES,
  MdToolbar,
  MdInput,
  MD_SIDENAV_DIRECTIVES,
  FlexDirective,
  LayoutDirective
  ],
  providers: [LoginService]
})


export class AppComponent {
  items: FirebaseListObservable<any[]>;
  chats: FirebaseListObservable<any[]>;
  chatsPush: FirebaseListObservable<any[]>;
  title: 'app works!';
  name: "";
  message: "";
  loginService: {}
  clicked(){};
  constructor(af: AngularFire, loginService: LoginService) {
    this.loginService = loginService;
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


    this.clicked = function(){
      if(this.loginService.user && this.loginService.user.username != ""){
              this.chatsPush.push({name: this.loginService.user.username, message: this.message});
      }
    }
  }
}
