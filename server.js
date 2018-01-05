/**
 * Created by xiaobxia on 2018/1/4.
 */
const fs = require('fs-extra');
const express = require('express');
const compression = require('compression');
const microcache = require('route-cache');
const merge = require('merge');
const pug = require('pug');
const proxyMiddleware = require('http-proxy-middleware');
const path = require('path');

const env = process.env.NODE_ENV;
const isDev = env === 'dev';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo = `express/${require('express/package.json').version} `;
const pugOptions = {};
const config = require('./config');

const viewPath =config[env].server.viewPath;
const proxy = config[env].server.proxy || [];
const port = config[env].server.port || 4000;
const assetsSubDirectory = config[env].assetsSubDirectory || '';
const join = file => path.join(viewPath, file);
console.log(join(assetsSubDirectory))

const app = express();

Object.keys(proxy).forEach(function (context) {
  let options = proxy[context];
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

app.use(compression({threshold: 0}));

const serve = (path, cache) => express.static(join(path), {
  maxAge: cache && !isDev ? 1000 * 60 * 60 * 24 * 7 : 0
});

app.use(assetsSubDirectory, serve(assetsSubDirectory, true));

app.use(microcache.cacheSeconds(1, (req) => {
  console.log(req.originalUrl);
  return useMicroCache && req.originalUrl;
}));

app.get('/', (req, res) => {
  const s = Date.now();
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Server", serverInfo);
  try {
    const html = pug.renderFile(viewPath + 'index.pug', merge(pugOptions, {}));
    res.send(html);
    if (isDev) {
      console.log(`请求用时: ${Date.now() - s}ms`)
    }
  } catch (err) {
    console.log('in');
    res.status(500).send('500 | Internal Server Error');
    console.error(`渲染发生错误 : ${req.url}`);
    console.error(err.stack)
  }
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});
