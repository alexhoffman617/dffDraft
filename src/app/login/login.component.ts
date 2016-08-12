import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: './app/login/login.component.html',
})
export class LoginComponent  {

 username: "";
 password: "";
 returnedUser:{}
 returnedUserHash:""
 currentUsername:""
  clicked(){};
  constructor(af: AngularFire) {
    
    
    this.clicked = function(){
          var afUsernames = af.database.list('user', {
            preserveSnapshot: true,
            query: {
              orderByChild: 'username',
              equalTo: this.username
            }
          })

          afUsernames.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              this.returnedUser = snapshot.val();
              this.returnedUserHash = snapshot.key;
            });
          })

          if(this.returnedUser && this.returnedUser.password === this.password){
            this.currentUsername = this.returnedUser.username;
          } else {
            this.currentUsername = "";
          }
    }
  }
}
