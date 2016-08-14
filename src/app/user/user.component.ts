import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';


@Component({
    templateUrl: './app/user/user.component.html'
})
export class UserComponent{
    loginService;
    userBids;
    constructor(af: AngularFire, loginService: LoginService){
        this.loginService = loginService;

        if(this.loginService.user && this.loginService.user.userId){
            this.userBids = af.database.list('bids', {
                query: {
                orderByChild: 'username',
                equalTo: this.loginService.user.userHash
                }
            })
        }

    }

}