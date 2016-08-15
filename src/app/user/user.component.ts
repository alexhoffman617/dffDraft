import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';


@Component({
    templateUrl: './app/user/user.component.html',
})
export class UserComponent{
    loginService;
    userBids;
    players;
    totalSalary: number;
        getPlayer(playerId){
        
    };
    constructor(af: AngularFire, loginService: LoginService){
        this.loginService = loginService;
        this.totalSalary = 0;
        if(this.loginService.user && this.loginService.user.userId){
            var allPlayers = af.database.list('player');
            allPlayers.subscribe(snapshots => {
                 this.players = snapshots;
            });
            
            this.totalSalary = this.loginService.calculateTotalSalary();

            this.userBids = af.database.list('bids', {
                query: {
                orderByChild: 'username',
                equalTo: this.loginService.user.userHash
                }
            })
        }

        this.getPlayer = function(playerId){
            var player = this.players.filter(function(snapshot){ return snapshot.$key == playerId })[0];
            return player;
        }

    }

}