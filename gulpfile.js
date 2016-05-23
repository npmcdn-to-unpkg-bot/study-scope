var gulp = require('gulp');
var shell = require('gulp-shell');
var rimraf = require('rimraf');
var run = require('run-sequence');
var watch = require('gulp-watch');
var server = require('gulp-live-server');
var connect = require('gulp-connect');
var browserify = require('browserify');
var reactify  = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
  js: ['./src/**/*.js'],
  jsx: ['./src/**/*.jsx'],
  jade: ['./src/**/*.jade'],
  css: ['./src/**/*.css'],
  destination: './dist'
};

gulp.task('default', function(cb) {
  run('server', 'build', 'watch', cb);
});

gulp.task('debug', function (cb) {
  run('server', 'restart',  cb);
});

gulp.task('build', function(cb) {
  run('clean', 'babel', 'copy-client', 'compile-react', 'restart', cb);
});

gulp.task('build-deploy', function(cb) {
  run('clean', 'babel', 'copy-client', 'compile-react', 'server', 'restart', cb);
});

gulp.task('clean', function(cb) {
  rimraf(paths.destination, cb);
});

gulp.task('babel', shell.task([
  'babel src --out-dir dist --ignore "**/*.jsx, src/public/js/lib/*.js"'
]));

gulp.task('clean', function(cb) {
  rimraf(paths.destination, cb);
});

gulp.task('compile-react', ['compile-react-rooms', 'compile-react-participant-adder' ,'compile-react-rooms-list']);

gulp.task('compile-react-rooms', function() {
  return browserify({
    entries:'./src/public/js/react/rooms-manager.jsx',
    debug: true
  })
    .transform(reactify)
    .bundle()
    .pipe(source('rooms-manager.js'))
    .pipe(gulp.dest('./dist/public/js/react/'));
});

gulp.task('compile-react-participant-adder', function() {
  return browserify({
    entries:'./src/public/js/react/participant-adder.jsx',
    debug: true
  })
    .transform(reactify)
    .bundle()
    .pipe(source('participant-adder.js'))
    .pipe(gulp.dest('./dist/public/js/react/'));
});

gulp.task('compile-react-rooms-list', function() {
  return browserify({
    entries:'./src/public/js/react/rooms-list.jsx',
    debug: true
  })
    .transform(reactify)
    .bundle()
    .pipe(source('rooms-list.js'))
    .pipe(gulp.dest('./dist/public/js/react/'));
});


var express;

gulp.task('server', function() {
  express = server.new(paths.destination + '/app.js');
});

gulp.task('restart', function() {
  express.start.bind(express)();
});

var ignoreFiles = [

];

gulp.task('watch', function() {
  var watcher = gulp.watch([paths.js, paths.jade, paths.css, paths.jsx]);
  watcher.on('change', function(file) {
    var filePath = file.path;
    var fileType = filePath.slice(filePath.lastIndexOf('.'));

    if(fileType === '.js' && !filePath.includes('/src/public/')) {
      gulp.start('build');
    } else if (fileType === '.jsx') {
      gulp.start('compile-react', function() {
        express.notify.call(express, file);
      });
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

gulp.task('copy-public', function() {
  return gulp.src(['src/public/**/*.*', '!src/public/js/react/**/*.*'])
    .pipe(gulp.dest(paths.destination + '/public'));
});

gulp.task('copy-client', ['copy-templates', 'copy-public']);