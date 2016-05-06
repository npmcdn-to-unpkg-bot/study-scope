var gulp = require('gulp');
var shell = require('gulp-shell');
var rimraf = require('rimraf');
var run = require('run-sequence');
var watch = require('gulp-watch');
var server = require('gulp-live-server');

var paths = {
  js: ['./src/**/*.js'],
  jade: ['./src/**/*.jade'],
  css: ['./src/**/*.css'],
  destination: './dist'
};

gulp.task('default', function (cb) {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', function (cb) {
  run('clean', 'babel', 'copy-client', 'restart', cb);
});

gulp.task('clean', function(cb ){
  rimraf(paths.destination, cb);
});

gulp.task('babel', shell.task([
  'babel src --out-dir dist'
]));

gulp.task('clean', function(cb) {
  rimraf(paths.destination, cb);
});


var express;

gulp.task('server', function() {
  express = server.new(paths.destination + '/app.js');
});

gulp.task('restart', function() {
  express.start.bind(express)();
});

var ignoreFiles = [];

gulp.task('watch', function() {
  var watcher = gulp.watch([paths.js, paths.jade, paths.css]);
  watcher.on('change', function (file) {
    var filePath = file.path;
    var fileType = filePath.slice(filePath.lastIndexOf('.'));

    if (fileType === '.js' && !filePath.includes('/src/public/')) {
      gulp.start('build');
    } else {
      gulp.start('copy-client', function() {
        express.notify.call(express, file);
      });
    }
  });
});


gulp.task('copy-templates', function() {
  return gulp.src('src/**/*.jade')
    .pipe(gulp.dest(paths.destination));
});

gulp.task('copy-public', function () {
  return gulp.src(['src/public/**/*.*', '!src/public/lib'])
    .pipe(gulp.dest(paths.destination + '/public'));
});

gulp.task('copy-client', ['copy-templates', 'copy-public']);
