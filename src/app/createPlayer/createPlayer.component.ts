import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';

@Component({
  templateUrl: './app/createPlayer/createPlayer.component.html',
  directives: [FlexDirective,
              LayoutDirective]
})
export class CreatePlayerComponent  {
 players: FirebaseListObservable<any[]>;
  name: "";
  position: "";
  team: "";
  bye: "";
  clicked(){    
    this.players.push({name: this.name, position: this.position, team: this.team, bye: this.bye});
    this.name = "";
    this.position = "";
    this.team = "";
    this.bye ="";
  }
  constructor(af: AngularFire) {
    this.players = af.database.list('player');
    this.name = "";
    this.position = "";
    this.team = "";
    this.bye = "";
  };
}

