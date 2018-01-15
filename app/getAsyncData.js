/**
 * Created by xiaobxia on 2018/1/12.
 */
const redis = require("redis");
const bluebird = require('bluebird');
const fs = require('fs-extra');
const LRU = require("lru-cache")
const request = require('./common/request');
const log = require('./common/logger');
const config = require('../config/index');

const env = process.env.NODE_ENV;
const isDev = env === 'dev';
const cacheMaxAge = 10;
let getCache = null;
let setCache = null;
if (config[env].useRedis) {
  const client = redis.createClient({
    host: '39.108.114.91',
    port: 6379
  });
  bluebird.promisifyAll(redis.RedisClient.prototype);
  getCache = function (key) {
    return client.getAsync(key);
  };
  setCache = function (key, value) {
    client.setex(key, cacheMaxAge, value, redis.print);
  };
} else {
  const lru = LRU({max: 500, maxAge: cacheMaxAge * 1000});
  getCache = function (key) {
    return lru.get(key);
  };
  setCache = function (key, value) {
    lru.set(key, value);
  };
}

function logData(fileData) {
  if (isDev) {
    const fileName = './mock/last.json';
    fs.ensureFile(fileName).then(() => {
      fs.writeJson(fileName, fileData, {spaces: 2})
    });
  }
}

module.exports = async function (method, apiUrl, apiQuery) {
  const cacheKey = apiUrl + JSON.stringify(apiQuery);
  let data = null;
  const s = Date.now();
  let cacheData = await getCache(cacheKey);
  log.info(`获取缓存用时: ${Date.now() - s}ms`);
  if (cacheData) {
    log.info('命中缓存');
    data = JSON.parse(cacheData);
  } else {
    const s = Date.now();
    data = await request[method](apiUrl, apiQuery);
    log.info(`PHP用时: ${Date.now() - s}ms`);
    setCache(cacheKey, JSON.stringify(data));
  }
  logData(data);
  return data;
};
