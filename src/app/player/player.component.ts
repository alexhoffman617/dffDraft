import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login.service';
import {SalaryService} from '../services/salary.service';
import {TimeService} from '../services/time.service';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';

@Component({
    templateUrl: './app/player/player.component.html',
    directives: [FlexDirective,
        LayoutDirective]
})
export class PlayerComponent {
    bids: FirebaseListObservable<any[]>;
    playerHash: ""
    name: ""
    position: ""
    team: ""
    user: ""
    username: ""
    amount: number
    years: number
    value: number
    time;
    salaryService;
    timeService;
    currentBid;
    clicked() {
        // this.value = parseInt(this.years, 10) * parseInt(this.amount, 10) + (4 - parseInt(this.years, 10)) * (parseInt(this.amount, 10) / 2)
        this.value = this.years * this.amount + (4 - this.years) * (this.amount / 2)

        var currMaxBid;
        this.bids.subscribe(snapshots => {
            currMaxBid = snapshots.filter(function (snapshot) {
                return snapshot.isWinningBid == 1
            })
        })

        this.salaryService.calculateSalaryInfo(this.user);
        if (currMaxBid.length > 0 && this.timeService.getTimeLeft(currMaxBid[0].time, this.timeService.datetime) == 'Bid Won') {
            alert("You're too slow bitch, bidding on this player has EXPIRED.");
        } else if (this.amount <= 0 || this.years <= 0 || this.years > 4) {
                alert("Fuck you, put in a valid value for amount or years");
        } else if(this.amount > this.salaryService.maxBid) {
                alert("Bitch, you're spending too much or you already have a full, shitty-ass team");
        } else if (currMaxBid.length > 0 && currMaxBid[0].value >= this.value) {
                alert("Stop being so fucking cheap, increase your bid value.");
        } else {
            this.bids.update(currMaxBid[0].$key, { isWinningBid: 0 })
            this.bids.push({ user: this.user, username: this.username, player: this.playerHash, amount: this.amount, years: this.years, value: this.value, time: firebase.database.ServerValue.TIMESTAMP, isWinningBid: 1 });                         
        }       
    }

    calculateValue($scope) {
        console.log("test")
        $scope.$watch('years * amount + (4 - years) * (amount / 2)', function (value) {
            $scope.value = value;
        });
    }

    constructor(af: AngularFire, route: ActivatedRoute, loginService: LoginService, salaryService: SalaryService, timeService: TimeService) {
        this.timeService = timeService;
        this.playerHash = route.snapshot.params['playerHash'];
        this.bids = af.database.list('bids', {
            query: {
                orderByChild: 'player',
                equalTo: this.playerHash
            }
        });

        this.user = loginService.user.userId
        this.username = loginService.user.username
        this.salaryService = salaryService;


        console.log(this.playerHash)
        var player = af.database.object('/player/' + this.playerHash, { preserveSnapshot: true });
        player.subscribe(snapshot => {
            console.log(snapshot.key)
            console.log(snapshot.val())
            this.name = snapshot.val().name
            this.position = snapshot.val().position
            this.team = snapshot.val().team
        });

    }
}