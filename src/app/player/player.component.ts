import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login.service'



@Component({
    templateUrl: './app/player/player.component.html'
})
export class PlayerComponent {
    bids: FirebaseListObservable<any[]>;
    playerHash: ""
    name: ""
    position: ""
    team: ""
    user: ""
    username: ""
    amount: ""
    years: ""
    value: number
    time: ""

    clicked() {
        this.value = parseInt(this.years, 10) * parseInt(this.amount, 10) + (4 - parseInt(this.years, 10)) * (parseInt(this.amount, 10) / 2)
        //this.bids.push({ user: this.user, username: this.username, player: this.playerHash, amount: this.amount, years: this.years, value: this.value, time: this.time, isWinningBid: 1 });
    }

    calculateValue($scope) {
        console.log("test")
        $scope.$watch('years * amount + (4 - years) * (amount / 2)', function (value) {
        $scope.value = value;
    });
    }

    constructor(af: AngularFire, route: ActivatedRoute, loginService: LoginService) {
        this.user = loginService.user.userId
        this.username = loginService.user.username
        this.playerHash = route.snapshot.params['playerHash'];
        console.log(this.playerHash)
        var player = af.database.object('/player/-KP-Hw3Nv3mxNbywMhr-', { preserveSnapshot: true });
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