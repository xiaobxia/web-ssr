const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require("gulp-babel");
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const config = require('./config');
const path = config.base.path;
const assetsSubDirectory = config.prod.assetsSubDirectory;

gulp.task('clean', function () {
  return del(path.dist);
});

gulp.task('lib', function () {
  return gulp.src(path.lib)
    .pipe(gulp.dest(path.dist + assetsSubDirectory + '/lib'));
});

gulp.task('asset', function () {
  return gulp.src(path.asset)
    .pipe(gulp.dest(path.dist + assetsSubDirectory + '/asset'));
});

gulp.task('pug', function () {
  return gulp.src(path.pug)
    .pipe(gulp.dest(path.dist));
});

gulp.task('scss', function () {
  return gulp.src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([pxtorem(config.base.pxtorem), autoprefixer(config.base.autoprefixer)]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist + assetsSubDirectory + '/css'));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist + assetsSubDirectory + '/js'));
});

gulp.task('build', gulp.parallel('lib', 'asset', 'pug', 'scss', 'js'));

gulp.task('watch', function () {
  gulp.watch(path.assetWatch, gulp.series('asset'));
  gulp.watch(path.libWatch, gulp.series('lib'));
  gulp.watch(path.pug, gulp.series('pug'));
  gulp.watch(path.scssWatch, gulp.series('scss'));
  gulp.watch(path.jsWatch, gulp.series('js'));
});

gulp.task('default', gulp.series('clean', 'build', 'watch'));
