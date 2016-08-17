import { Component, OnInit } from '@angular/core';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';
import { ROUTER_DIRECTIVES, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  templateUrl: './app/playerTable/playerTable.component.html',
    directives: [FlexDirective,
                LayoutDirective,
                ROUTER_DIRECTIVES,
                RouterLink]
})
export class PlayerTableComponent  {
  players;
  bids;
  positionFilter;
  usernameFilter;
  loginService;
  datetime;
  getBid(playerId){};
  getTimeLeft(timestamp, inputCurrentDateTime){};
  getTimeFromTimeStamp(timestamp){};
  formatTimeNumber(input){};
  constructor(af: AngularFire, loginService: LoginService) {
    this.loginService = loginService;
    this.positionFilter = 'ALL';
    this.usernameFilter = 'ALL';
    this.players = af.database.list('player');
    af.database.list('bids', {
      query: {
        orderByChild: 'isWinningBid',
        equalTo: 1
      }
    }).subscribe(snapshots => {
      this.bids = snapshots;
    });

    this.getBid = function(playerId){
        var bid = this.bids.filter(function(snapshot){ return snapshot.player === playerId});
        if(bid.length > 0){
          return bid[0];
        } else {
          return { 
            username: "No Bids",
            amount: 0,
            value: 0,
            years: 0
          }
        }
    }

    this.getTimeLeft = function(inputTimeStamp, inputCurrentDateTime){
      var inputDateTime = new Date(inputTimeStamp);
      var endtime = inputDateTime.setDate(inputDateTime.getDate() + 1)
      var t = endtime - inputCurrentDateTime;
        var seconds = this.formatTimeNumber(Math.floor( (t/1000) % 60 ));
        var minutes = this.formatTimeNumber(Math.floor( (t/1000/60) % 60 ));
        var hours = this.formatTimeNumber(Math.floor( (t/(1000*60*60)) % 24 ));
        if(t < 0){
          return 'Bid Won';
        }
        return  hours + ':' + minutes + ':' + seconds;
        ;
    }

    this.formatTimeNumber = function(input){
      if(input.toString().length > 1){
        return input;
      } else {
        return "0" + input;
      }
    }

    this.getTimeFromTimeStamp = function(timestamp){
      return new Date(timestamp);
    }
        setInterval(() => {
        this.datetime =  new Date().getTime();
     }, 1000);
  }
}
