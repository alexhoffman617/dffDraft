import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {ActivatedRoute} from '@angular/router';



@Component({
    templateUrl: './app/player/player.component.html'
})
export class PlayerComponent {
    playerHash: ""
    constructor(af: AngularFire, route: ActivatedRoute) {
          this.playerHash = route.snapshot.params['playerHash'];
          var player = af.database.object('/player/-KP-Hw3Nv3mxNbywMhr-',{ preserveSnapshot: true });
player.subscribe(snapshot => {
  console.log(snapshot.key)
  console.log(snapshot.val())
});
          var x = 1;
      }
}