import { Component, OnInit } from '@angular/core';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from '../services/login.service';
import { TimeService } from '../services/time.service';
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
  bidStateFilter;
  nameSearchFilter;
  loginService;
  timeService;
  getBid(playerId){};

  constructor(af: AngularFire, loginService: LoginService, timeService: TimeService) {
      af.database.list('bids', {
      query: {
        orderByChild: 'isWinningBid',
        equalTo: 1
      }
    }).subscribe(snapshots => {
      this.bids = snapshots;
    });
    this.loginService = loginService;
    this.timeService = timeService;
    this.positionFilter = 'ALL';
    this.usernameFilter = 'ALL';
    this.bidStateFilter = 'ALL';
    this.nameSearchFilter = "";
    this.players = af.database.list('player');


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
  }
}
