import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';
import { TimeService } from '../services/time.service';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';

@Component({
    templateUrl: './app/user/user.component.html',
    directives: [FlexDirective,
        LayoutDirective]
})
export class UserComponent {
    loginService;
    timeService;
    userBids;
    players;
    totalSalary: number;
    getPlayer(playerId) {

    };
    constructor(af: AngularFire, loginService: LoginService, timeService: TimeService) {
        this.loginService = loginService;
        if (this.loginService.user && this.loginService.user.userId) {
            var allPlayers = af.database.list('player');
            allPlayers.subscribe(snapshots => {
                this.players = snapshots;
            });


            this.userBids = af.database.list('bids', {
                query: {
                    orderByChild: 'username',
                    equalTo: this.loginService.user.userHash
                }
            }).map(bids => {
                return bids.map(bid => {
                    bid.playerInfo = af.database.object('/player/' + bid.player);
                    return bid;
                })
            })
        }
        this.timeService = timeService;
        this.totalSalary = 0;


        this.getPlayer = function (playerId) {
           // var player = this.players.filter(function (snapshot) { return snapshot.$key == playerId })[0];
           this.loginService.allPlayers.filter(function(player){
               return player.$key = playerId;
           })
        }

    }

}