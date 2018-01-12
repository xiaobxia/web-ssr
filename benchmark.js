/**
 * Created by xiaobxia on 2018/1/7.
 */
const request = require('./app/request');

let timer1 = null;
let timer2 = null;
let timer1Count = 0;
let timer2Count = 0;
const qs = 20;

timer1 = setInterval(function () {
  timer1Count++;
  if (timer1Count < 3) {
    timer2 = setInterval(function () {
      timer2Count++;
      if (timer2Count < qs) {
        request.get('http://localhost:4000/houseDetail?houseId=2&userType=customer&houseType=2&userId=kpgnpdqqfl');
        // request.get('http://localhost:4000/communityDetail?blockId=8910&userType=customer&houseType=2&userId=kpgnpdqqfl');
      } else {
        timer2Count = 0;
        clearInterval(timer2);
      }
    }, 1000 / qs);
  } else {
    clearInterval(timer1);
  }
}, 2000);

