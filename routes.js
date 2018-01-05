/**
 * Created by xiaobxia on 2018/1/5.
 */
const express = require('express');
const merge = require('merge');
const pug = require('pug');

let router = express.Router();
const env = process.env.NODE_ENV;
const isDev = env === 'dev';
const pugOptions = {};
const config = require('./config');
const serverInfo = `express/${require('express/package.json').version} `;
const baseDir =config[env].server.baseDir;

router.get('/', (req, res) => {
  const s = Date.now();
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Server", serverInfo);
  try {
    const html = pug.renderFile(baseDir + 'index.pug', merge(pugOptions, {}));
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

module.exports = router;
