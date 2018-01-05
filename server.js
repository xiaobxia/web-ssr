/**
 * Created by xiaobxia on 2018/1/4.
 */
const fs = require('fs-extra');
const express = require('express');
const compression = require('compression');
const microcache = require('route-cache');
const path = require('path');
const sysRoutes = require('./routes');

const env = process.env.NODE_ENV;
const isDev = env === 'dev';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const config = require('./config');

const baseDir =config[env].server.baseDir;
const port = config[env].server.port || 4000;
const assetsSubDirectory = config[env].assetsSubDirectory || '';
const join = file => path.join(baseDir, file);

const app = express();

app.use(compression({threshold: 0}));

const serve = (path, cache) => express.static(join(path), {
  maxAge: cache && !isDev ? 1000 * 60 * 60 * 24 * 7 : 0
});

app.use(assetsSubDirectory, serve(assetsSubDirectory, true));

app.use(microcache.cacheSeconds(1, (req) => {
  console.log(req.originalUrl);
  return useMicroCache && req.originalUrl;
}));

app.use(sysRoutes);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});
