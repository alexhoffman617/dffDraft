import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: './app/createPlayer/createPlayer.component.html',
})
export class CreatePlayerComponent  {
 players: FirebaseListObservable<any[]>;
  name: "";
  position: "";
  team: "";
  clicked(){    
    this.players.push({name: this.name, position: this.position, team: this.team});
    this.name = "";
    this.position = "";
    this.team = "";
  }
  constructor(af: AngularFire) {
    this.players = af.database.list('player');
    this.name = "";
    this.position = "";
    this.team = "";
  };
}

