import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login.service'
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

    clicked() {
        // this.value = parseInt(this.years, 10) * parseInt(this.amount, 10) + (4 - parseInt(this.years, 10)) * (parseInt(this.amount, 10) / 2)
        this.value = this.years * this.amount + (4 - this.years) * (this.amount / 2)

        this.time = "test"
        var check;
        this.bids.subscribe(snapshots => {
            check = snapshots.filter(function (snapshot) {
                return snapshot.isWinningBid == 1
            })
        })
        if (check.length > 0) {
            if (check[0].value < this.value) {
                this.bids.update(check[0].$key, { isWinningBid: 0 })
                this.bids.push({ user: this.user, username: this.username, player: this.playerHash, amount: this.amount, years: this.years, value: this.value, time: this.time, isWinningBid: 1 });
            } else {
                console.log("Bid failed")
                alert("Bid does not exceed previous bid's value");
            }
        } else {
            this.bids.push({ user: this.user, username: this.username, player: this.playerHash, amount: this.amount, years: this.years, value: this.value, time: this.time, isWinningBid: 1 });
        }
    }

    calculateValue($scope) {
        console.log("test")
        $scope.$watch('years * amount + (4 - years) * (amount / 2)', function (value) {
            $scope.value = value;
        });
    }

    constructor(af: AngularFire, route: ActivatedRoute, loginService: LoginService) {
        this.bids = af.database.list('bids');
        this.user = loginService.user.userId
        this.username = loginService.user.username
        this.playerHash = route.snapshot.params['playerHash'];
        console.log(this.playerHash)
        var player = af.database.object('/player/' + this.playerHash, { preserveSnapshot: true });
        player.subscribe(snapshot => {
            console.log(snapshot.key)
            console.log(snapshot.val())
            this.name = snapshot.val().name
            this.position = snapshot.val().position
            this.team = snapshot.val().team
        });

        console.log(this.playerHash);

        var x = 1;
    }
}