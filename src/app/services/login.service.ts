import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class LoginService  {

 user;
 userId;
  login(email, password){};
  logout(){};
  calculateSalaryInfo(){};
  allUsers;
  allPlayers;
  constructor(af: AngularFire) {  
  this.allUsers = af.database.list('user');
  this.allPlayers = af.database.list('player').map(items => {
    return items
  });

    /// For Dev only, remove later
    // this.user = {};
    //  this.user.username = "Alex";
    //  this.user.password = "password";
    //  this.user.userId = "AlexHoffman";
    //  this.user.email = "alexhoffman617@gmail.com"
    //  this.user.maxSalary = 240
    
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

    this.login = function(email, password){
      var afUsernames = af.database.list('user', {
        preserveSnapshot: true,
        query: {
          orderByChild: 'email',
          equalTo: email
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
        userId: "",
        email: "",
        maxSalary: ""
      }
    }
  }
}