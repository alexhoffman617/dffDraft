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
  getBid(playerId){};
  constructor(af: AngularFire, loginService: LoginService) {
    this.positionFilter = 'QB';
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

  }
}
