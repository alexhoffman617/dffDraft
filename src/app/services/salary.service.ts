import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class SalaryService  {

  calculateSalaryInfo(user){};
  totalSalary;
  maxBid;
  constructor(af: AngularFire) {  

    this.calculateSalaryInfo= function(user){
       this.bids = af.database.list('bids', {
         query: {
           orderByChild: 'user',
           equalTo: user.userId
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
            if(winningBids.length > 15){
              this.maxBid = 0;
            } else{
              this.maxBid = (240 - currentSalary) - (16 - (winningBids.length + 1));  
            }
        }) 
    }
  }
}