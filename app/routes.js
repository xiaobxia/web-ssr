/**
 * Created by xiaobxia on 2018/1/5.
 */
const express = require('express');
const merge = require('merge');
const pug = require('pug');
const path = require('path');
const fs = require('fs-extra');
const redis = require("redis");
const bluebird = require('bluebird');
const request = require('./request');
const log = require('./logger');
const Parameter = require('./validate');
const config = require('../config/index');

const p = new Parameter();
let router = express.Router();
const env = process.env.NODE_ENV;
const isDev = env === 'dev';
const baseDir = config[env].server.baseDir;
const phpAddress = config[env].phpAddress;
const pugOptions = {
  // debug: isDev,
  compileDebug: isDev
};
bluebird.promisifyAll(redis.RedisClient.prototype);
const client = redis.createClient({
  host: '39.108.114.91',
  port: 6379
});
const cacheMaxAge = 2;

function validateData(rule, data) {
  let fake = {};
  for (let key in rule) {
    if (rule.hasOwnProperty(key)) {
      if (!rule[key].type) {
        rule[key] = 'string';
      }
      fake[key] = data[key];
    }
  }
  let msgList = p.validate(rule, fake);
  if (msgList !== undefined) {
    let msg = msgList[0];
    throw new Error(msg.field + ' ' + msg.message);
  } else {
    return fake;
  }
}

function logData(fileData) {
  if (isDev) {
    const fileName = './mock/last.json';
    fs.ensureFile(fileName).then(() => {
      fs.writeJson(fileName, fileData, {spaces: 2})
    });
  }
}

function getViewFile(fileName) {
  return path.resolve(baseDir, fileName);
}

function consolePhpTime(req) {
  log.info(`PHP用时: ${Date.now() - req.requestStartTime}ms`);
}

function consoleRenderTime(fn) {
  const s = Date.now();
  const result = fn();
  log.info(`渲染用时: ${Date.now() - s}ms`);
  return result;
}

/**
 * 路由部分
 */

router.get('/', async (req, res, next) => {
  log.trace('请求进入: /');
  try {
    const html = pug.renderFile(getViewFile('index.pug'), merge(pugOptions, {}));
    res.send(html);
  } catch (err) {
    next(err);
  } finally {
    log.info(`请求"${req.originalUrl}"的累计用时: ${Date.now() - req.requestStartTime}ms`);
  }
});

router.get('/houseDetail', async (req, res, next) => {
  log.trace('请求进入: /houseDetail');
  try {
    const query = validateData({
      houseId: {required: true},
      userType: {required: true},
      houseType: {required: true},
      userId: {required: true}
    }, req.query);
    let apiUrl = '';
    let apiQuery = {};
    if (query.houseType === '1') {
      apiUrl = phpAddress + '/house/houseInfo';
      apiQuery = {
        houseId: query.houseId,
        user: query.userType
      };
    } else {
      apiUrl = phpAddress + '/rent/houseInfo';
      apiQuery = {
        houseId: query.houseId
      };
    }
    const cacheKey = apiUrl + JSON.stringify(apiQuery);
    let cacheData = await client.getAsync(cacheKey);
    let data = null;
    if (cacheData) {
      log.info('命中缓存');
      data = JSON.parse(cacheData);
    } else {
      data = await request.post(apiUrl, apiQuery);
      consolePhpTime(req);
      client.setex(cacheKey, cacheMaxAge, JSON.stringify(data), redis.print);
    }
    logData(data);
    data.houseType = query.houseType;
    data.userType = query.userType;
    data.userId = query.userId;
    data.attentionState = "0";
    if (data.title.length > 16) {
      data.title = data.title.substring(0, 16) + '...';
    }
    const html = consoleRenderTime(function () {
      return pug.renderFile(getViewFile('houseDetail.pug'), merge(pugOptions, data));
    });
    res.send(html);
  } catch (err) {
    next(err);
  } finally {
    log.info(`请求"${req.originalUrl}"的累计用时: ${Date.now() - req.requestStartTime}ms`);
  }
});

router.get('/communityDetail', async (req, res, next) => {
  log.trace('请求进入: /communityDetail');
  try {
    const query = validateData({
      blockId: {required: true},
      userType: {required: true},
      houseType: {required: true},
      userId: {required: true}
    }, req.query);
    const apiUrl = phpAddress + '/community/communityInfo';
    const apiQuery = {
      blockId: query.blockId,
      houseType: query.houseType
    };
    const cacheKey = apiUrl + JSON.stringify(apiQuery);
    let cacheData = await client.getAsync(cacheKey);
    let data = null;
    if (cacheData) {
      log.info('命中缓存');
      data = JSON.parse(cacheData);
    } else {
      data = await request.post(apiUrl, apiQuery);
      consolePhpTime(req);
      client.setex(cacheKey, cacheMaxAge, JSON.stringify(data), redis.print);
    }
    logData(data);
    if (data.address.length > 10) {
      data.address = data.address.substring(0, 10) + '...';
    }
    data.userId = query.userId;
    data.houseType = query.houseType;
    data.userType = query.userType;
    data.attentionState = '1';
    const html = consoleRenderTime(function () {
      return pug.renderFile(getViewFile('communityDetail.pug'), merge(pugOptions, data));
    });
    res.send(html);
  } catch (err) {
    next(err);
  } finally {
    log.info(`请求"${req.originalUrl}"的累计用时: ${Date.now() - req.requestStartTime}ms`);
  }
});

module.exports = router;
