import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';
import { TimeService } from '../services/time.service';
import { SalaryService } from '../services/salary.service';
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
    salaryService;
    userBids;
    players;
    totalSalary: number;
    getPlayer(playerId) {

    };
    constructor(af: AngularFire, loginService: LoginService, timeService: TimeService, salaryService: SalaryService) {
        this.loginService = loginService;
        this.salaryService = salaryService;
        this.salaryService.reInit(this.loginService);
        this.salaryService.calculateSalaryInfo();
        if (this.loginService.user && this.loginService.userId) {
            var allPlayers = af.database.list('player');
            allPlayers.subscribe(snapshots => {
                this.players = snapshots;
            });


            this.userBids = af.database.list('bids', {
                query: {
                    orderByChild: 'user',
                    equalTo: this.loginService.userId
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