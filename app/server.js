/**
 * Created by xiaobxia on 2018/1/4.
 */
const fs = require('fs-extra');
const express = require('express');
const compression = require('compression');
const microcache = require('route-cache');
const path = require('path');
const favicon = require('serve-favicon');
const proxyMiddleware = require('http-proxy-middleware');
const sysRoutes = require('./routes');
const config = require('../config/index');
const log = require('./logger');

const serverInfo = `express/${require('express/package.json').version} `;
const env = process.env.NODE_ENV;
const isDev = env === 'dev';
// const useMicroCache = process.env.MICRO_CACHE !== 'false';

const baseDir =config[env].server.baseDir;
const port = config[env].server.port || 4000;
const assetsSubDirectory = config[env].assetsSubDirectory || '';
const join = file => path.join(baseDir, file);

const app = express();

app.use(compression({threshold: 0}));

const serve = (path, cache) => express.static(join(path), {
  maxAge: cache && !isDev ? 1000 * 60 * 60 * 24 * 7 : 0
});

const proxyTable = config[env].server.proxyTable;
if(proxyTable) {
  Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
}

app.use(favicon('favicon.png'));
app.use(assetsSubDirectory, serve(assetsSubDirectory, true));

// 每个人的id是不同的
// app.use(microcache.cacheSeconds(3, (req) => {
//   console.log(req.originalUrl);
//   return useMicroCache && req.originalUrl;
// }));

// 因为只做view层所以统一处理
app.use((req, res, next)=>{
  req.requestStartTime = Date.now();
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Server", serverInfo);
  next();
});

app.use(sysRoutes);


app.use((req, res)=>{
  res.status(404).send('404');
});

// 因为只做view层所以统一处理
app.use((err, req, res, next)=>{
  res.status(500).send('500 | Internal Server Error');
  console.error(`渲染发生错误 : ${req.url}`);
  log.error(err);
  next();
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
  console.log(`当前环境是:${env || 'dev'}`)
});
