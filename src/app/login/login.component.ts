import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';

@Component({
  templateUrl: './app/login/login.component.html',
  directives: [FlexDirective,
              LayoutDirective]
})
export class LoginComponent  {

 username: "";
 password: "";
 loginService;
  constructor(af: AngularFire, loginService: LoginService) {
    this.loginService = loginService;
  }
  login(){
    this.loginService.login(this.username, this.password)
  };
  logout(){
    this.loginService.logout();
  }
}
