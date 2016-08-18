import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class TimeService {
    datetime;
    getTimeLeft(timestamp, inputCurrentDateTime){};
    getTimeFromTimeStamp(timestamp){};
    formatTimeNumber(input){};
    constructor(af: AngularFire) {
        this.getTimeLeft = function (inputTimeStamp, inputCurrentDateTime) {
            var inputDateTime = new Date(inputTimeStamp);
            var endtime = inputDateTime.setDate(inputDateTime.getDate() + 1)
            var t = endtime - inputCurrentDateTime;
            var seconds = this.formatTimeNumber(Math.floor((t / 1000) % 60));
            var minutes = this.formatTimeNumber(Math.floor((t / 1000 / 60) % 60));
            var hours = this.formatTimeNumber(Math.floor((t / (1000 * 60 * 60)) % 24));
            if (t < 0) {
                return 'Bid Won';
            }
            return hours + ':' + minutes + ':' + seconds;
            ;
        }

        this.formatTimeNumber = function (input) {
            if (input.toString().length > 1) {
                return input;
            } else {
                return "0" + input;
            }
        }

        this.getTimeFromTimeStamp = function (timestamp) {
            return new Date(timestamp);
        }

        setInterval(() => {
        this.datetime =  new Date().getTime();
     }, 1000);
    }
}