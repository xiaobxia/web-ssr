/**
 * Created by xiaobxia on 2017/9/17.
 */
const path = require('path');
module.exports = {
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
      pug: './src/pug/*'
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
      baseDir: './dist/'
    },
  },
  prod: {
    assetsSubDirectory: '/static',
    assetsPublicPath: '',
    server: {
      port: 4000,
      baseDir: './dist/'
    }
  }
};
