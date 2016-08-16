import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class SalaryService  {

 user;
 userhash: ""
  calculateSalaryInfo(){};
  totalSalary;
  maxBid;
  constructor(af: AngularFire) {  

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
  }
}