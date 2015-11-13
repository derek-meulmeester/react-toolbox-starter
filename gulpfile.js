/**
  3rd PARTY PACKAGES
**/
var del = require('del');
var path = require('path');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback')

var bundleName = 'rts';
var srcDir = './src/';
var buildDir = './build/';

/*
  Clean
 */
gulp.task('clean:build', function() {
  return del.sync([ buildDir + '**' ], {
    force: true
  });
});

/*
  Images
*/
gulp.task('copy:images',function(){
  gulp.src(srcDir + 'img/**')
      .pipe(gulp.dest(buildDir + 'img'))
});

/*
  Styles
*/
gulp.task('sass:build',function() {
  gulp.src(srcDir + 'css/sass/**/*.scss')
      .pipe(sass().on('error', handleErrors))
      .pipe(rename(bundleName + '.css'))
      .pipe(gulp.dest(buildDir + 'css'))
      .pipe(browserSync.stream());
});

/*
  Fonts
 */
gulp.task('copy:fonts', function() {
  gulp.src(srcDir + 'css/fonts/**.*')
      .pipe(gulp.dest(buildDir + 'css/fonts'))
});

/*
  HTML
 */
gulp.task('copy:html', function() {
  gulp.src(srcDir + '*.html')
      .pipe(gulp.dest(buildDir))
      .pipe(browserSync.stream());
});

/*
  JavaScript
 */
gulp.task('js:build', function() {
  gulp.src(srcDir + 'js/app.js')
      .pipe(webpack(require('./webpack.config.js'))
        .on('error', handleErrors))
      .pipe(rename(bundleName + '.js'))
      .pipe(gulp.dest(buildDir + 'js/'));
});

/*
  Browser Sync
*/
gulp.task('browser-sync', ['copy:html', 'sass:build'], function() {
    browserSync.init({
        server : {
          baseDir: 'build'
        },
        middleware : [ historyApiFallback() ]
    });

    gulp.watch(srcDir + 'css/sass/**/*.scss', ['sass:build']);
    gulp.watch(srcDir + '*.html', ['copy:html']);
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('default', [
    'clean:build',
    'copy:images',
    'copy:fonts',
    'copy:html',
    'js:build',
    'browser-sync'
  ]);
