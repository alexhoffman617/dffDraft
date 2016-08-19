import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';
import { LoginService } from '../services/login.service';

@Component({
  templateUrl: './app/createPlayer/createPlayer.component.html',
  directives: [FlexDirective,
              LayoutDirective]
})
export class CreatePlayerComponent  {
 players: FirebaseListObservable<any[]>;
  bids;
  name: "";
  position: "";
  team: "";
  bye: "";
  user;
  player;
  amount;
  years;
  value;
  time;
  username;
  loginService;
  timeNow;
  submitPlayer(){    
    this.players.push({name: this.name, position: this.position, team: this.team, bye: this.bye});
    this.name = "";
    this.position = "";
    this.team = "";
    this.bye ="";
  }
  submitBid(){    
 //   this.bids.subscribe(snapshots => {
 //     var that = this;
 //     snapshots.filter(function(snapshot){
 //       return snapshot.player == that.player.$key && snapshot.isWinningBid == 1;
 //     })
 //     snapshots.forEach(function(snapshot){
 //       that.bids.update(snapshot.$key, { isWinningBid: 0 })
 //     })
 //   });
    this.bids.push({amount: parseInt(this.amount), isWinningBid: 1, player: this.player.$key, value: parseInt(this.value),
                    years: parseInt(this.years), time: parseInt(this.time), user: this.user.$key, username: this.user.username });
    this.user = "";
    this.player = "";
    this.amount = "";
    this.years = "";
    this.value = "";
    this.time = "";
  }
  constructor(af: AngularFire, loginService: LoginService) {
    this.loginService = loginService
    this.players = af.database.list('player');
    this.bids = af.database.list('bids');
    this.timeNow = new Date().getTime();
    this.name = "";
    this.position = "";
    this.team = "";
    this.bye = "";
  };
}

