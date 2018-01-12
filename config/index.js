/**
 * Created by xiaobxia on 2017/9/17.
 */
const path = require('path');

const root = path.resolve(__dirname, '../');
function resolveRoot(dir) {
  return path.resolve(root, dir);
}

module.exports = {
  root: root,
  base: {
    path: {
      dist: './dist',
      scss: './src/scss/*.scss',
      scssWatch: './src/scss',
      js: './src/js/*.js',
      jsWatch: './src/js',
      lib: './src/lib/*',
      libWatch: './src/lib/*',
      asset: './src/asset/*',
      assetWatch: './src/asset/*',
      pug: './src/pug/**'
    },
    pxtorem: {
      rootValue: 10,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      //太小的不转换
      minPixelValue: 3
    },
    autoprefixer: {
      "browsers": [
        "> 1%",
        "last 2 versions"
      ]
    }
  },
  dev: {
    assetsSubDirectory: '/static',
    server: {
      port: 4000,
      baseDir: resolveRoot('dist'),
      proxyTable: {
        "/user": {
          "target": "http://192.168.2.50:8080/"
        }
      }
    },
    phpAddress: 'http://apidev.cd121.com/index',
  },
  prod: {
    assetsSubDirectory: '/static',
    assetsPublicPath: '',
    server: {
      port: 4000,
      baseDir: resolveRoot('dist')
    },
    phpAddress: 'http://apidev.cd121.com/index'
  },
  logger: {
    dir: resolveRoot('logs'),
    fileName: 'cheese.log',
    debugLogLevel: 'ALL',
    productLogLevel: 'ERROR'
  }
};
