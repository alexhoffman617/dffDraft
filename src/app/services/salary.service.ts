import { Injectable, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoginService } from "../services/login.service"
@Injectable()
export class SalaryService implements OnInit {

  calculateSalaryInfo(user) { };
  totalSalary;
  maxBid;
  loginService;
  bids;
  winningBids;
  af;
  constructor(af: AngularFire, loginService: LoginService) {
    this.loginService = loginService;
    this.af = af;
  }
   ngOnInit(){
    this.bids = this.af.database.list('bids', {
      query: {
        orderByChild: 'user',
        equalTo: this.loginService.user.$key
      }
    });
    this.bids.subscribe(snapshots => {
      this.winningBids = snapshots.filter(function (snapshot) {
        return snapshot.isWinningBid == 1
      });

    })
    this.calculateSalaryInfo = function () {
      var currentSalary = 0;
      if(this.winningBids)
      this.winningBids.forEach(bid => {
        currentSalary += parseInt(bid.amount);
      });
      this.totalSalary = currentSalary;
      if (this.winningBids.length > 15) {
        this.maxBid = 0;
      } else {
        this.maxBid = (240 - currentSalary) - (16 - (this.winningBids.length + 1));
      }
    }
   }

}