import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class LoginService  {

 user: {
   username: "",
   password: "",
   userId: ""
 }
 userhash: ""
  login(username, password){};
  logout(){};
  constructor(af: AngularFire) {  
    this.login = function(username, password){
      var afUsernames = af.database.list('user', {
        preserveSnapshot: true,
        query: {
          orderByChild: 'username',
          equalTo: username
        }
      })

      afUsernames.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if(snapshot.val() && snapshot.val().password === password){
            this.user = snapshot.val();
            this.userId = snapshot.key
            return true;
          } else {
            return false;
          }
        })
      })
    };

    this.logout = function(){
      this.user = {
        username: "",
        password: "",
        userId: ""
      }
    }
  }
}