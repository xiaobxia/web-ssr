const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify");

gulp.task('util', function () {
  return gulp.src([
    './src/dll/mui.previewimage.js',
    './src/dll/mui.zoom.js',
    './src/dll/util.js'
  ])
    .pipe(concat('util.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/lib'));
});
// gulp.task('mui', function () {
//   return gulp.src( './src/dll/mui.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('./src/lib'));
// });
gulp.task('default', gulp.series('util'));
