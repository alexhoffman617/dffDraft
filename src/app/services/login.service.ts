import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class LoginService  {

 user;
 userhash: ""
  login(username, password){};
  logout(){};
  calculateSalaryInfo(){};
  totalSalary;
  maxBid;
  constructor(af: AngularFire) {  
    
    /// For Dev only, remove later
     this.user = {};
      this.user.username = "Alex";
      this.user.password = "password";
      this.user.userId = "has1";
    
    this.calculateSalaryInfo= function(){
       this.bids = af.database.list('bids', {
         query: {
           orderByChild: 'user',
           equalTo: this.user.userId
         }
       });
      var currentSalary = 0;
       this.bids.subscribe(snapshots => {
           var winningBids = snapshots.filter(function (snapshot) {
                return snapshot.isWinningBid == 1
            });
            winningBids.forEach(bid => {
              currentSalary += parseInt(bid.amount);
            });  
            this.totalSalary = currentSalary; 
            this.maxBid = (240 -currentSalary) - (16 - (winningBids.length + 1));  
        }) 

    }

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