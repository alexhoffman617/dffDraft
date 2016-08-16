import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';
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
    salaryService;
    userBids;
    players;
    totalSalary: number;
    getPlayer(playerId) {

    };
    constructor(af: AngularFire, loginService: LoginService, salaryService: SalaryService) {
        this.loginService = loginService;
        this.totalSalary = 0;
        if (this.loginService.user && this.loginService.user.userId) {
            var allPlayers = af.database.list('player');
            allPlayers.subscribe(snapshots => {
                this.players = snapshots;
            });

            this.salaryService.calculateSalaryInfo();

            this.userBids = af.database.list('bids', {
                query: {
                    orderByChild: 'username',
                    equalTo: this.loginService.user.userHash
                }
            })
        }

        this.getPlayer = function (playerId) {
            var player = this.players.filter(function (snapshot) { return snapshot.$key == playerId })[0];
            return player;
        }

    }

}