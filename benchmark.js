/**
 * Created by xiaobxia on 2018/1/7.
 */
const request = require('./app/common/request');

function doThings(fn, times, second) {
  const interval = 1000 / times;
  fn();
  let timerES = setInterval(fn, interval);
  setTimeout(function () {
    clearInterval(timerES)
  }, second * 1000);
}

const host = 'http://localhost:4000';

doThings(function () {
  request.get(`${host}/house/houseDetail`, {
    houseId: 2,
    userType: 'customer',
    houseType: 2,
    userId: 'kpgnpdqqfl'
  });
  request.get(`${host}/house/communityDetail`, {
    blockId: 2900,
    userType: 'customer',
    houseType: 2,
    userId: 'kpgnpdqqfl'
  });
}, 5, 10);

