const gulp = require('gulp');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const del = require('del');

const config = require('./config');
const path = config.base.path;
const assetsSubDirectory = config.prod.assetsSubDirectory;
const assetsPublicPath = config.prod.assetsPublicPath;

gulp.task('clean', function () {
  return del(path.dist);
});

gulp.task('lib', function () {
  return gulp.src(path.lib)
    .pipe(gulp.dest(path.dist + assetsSubDirectory+'/lib'));
});

gulp.task('asset', function () {
  return gulp.src(path.asset)
    .pipe(gulp.dest(path.dist + assetsSubDirectory+'/asset'));
});


gulp.task('pug', function () {
  return gulp.src(path.pug)
    .pipe(gulp.dest(path.dist));
});

gulp.task('scss', function () {
  return gulp.src(path.scss)
    .pipe(sass())
    .pipe(postcss([pxtorem(config.base.pxtorem), autoprefixer(config.base.autoprefixer)]))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(gulp.dest(path.dist + assetsSubDirectory+'/css'))
    .pipe(rev.manifest())
    //json
    .pipe(gulp.dest('rev/css'));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(babel())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(path.dist + assetsSubDirectory+'/js'))
    .pipe(rev.manifest())
    //json
    .pipe(gulp.dest('rev/js'));
});

gulp.task('rev', function () {
  //json文件和接收注入的pug文件
  console.log(path.dist + '/*.pug');
  return gulp.src(['rev/**/*.json', path.dist + '/*.pug'])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        //替换
        '/css/': assetsPublicPath + '/css/',
        '/js/': assetsPublicPath + '/js/'
      }
    }))
    .pipe(gulp.dest(path.dist));
});


gulp.task('build', gulp.parallel('lib', 'asset', 'pug', 'scss', 'js'));

gulp.task('default', gulp.series('clean', 'build', 'rev'));
