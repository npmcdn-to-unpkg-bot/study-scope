

// var gulp      = require('gulp');
// var plumber   = require('gulp-plumber');
// var cleanCSS = require('gulp-clean-css');
// var jade = require('gulp-jade');
// var webserver = require('gulp-webserver');
// var opn       = require('opn');
//
// var sourcePaths = {
//   styles: ['src/**/*.css'],
//   templates: ['src/**/*.jade']
// };
//
// var distPaths = {
//   root: 'dist/'
// };
//
// var server = {
//   host: 'localhost',
//   port: '9001'
// };
//
// gulp.task('minify-css', function() {
//   return gulp.src(sourcePaths.styles)
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest(distPaths.root));
// });
//
// gulp.task('templates', function() {
//   return gulp.src(sourcePaths.templates)
//     .pipe(jade({
//       pretty: true
//     }))
//     .pipe(gulp.dest(distPaths.root));
// });
//
// gulp.task('webserver', function() {
//   gulp.src( '.' )
//     .pipe(webserver({
//       host:             server.host,
//       port:             server.port,
//       livereload:       true,
//       directoryListing: false
//     }));
// });
//
// gulp.task('openbrowser', function() {
//   opn( 'http://' + server.host + ':' + server.port + '/index.html');
// });
//
// gulp.task('watch', function() {
//   gulp.watch(sourcePaths.styles, ['minify-css']);
//   gulp.watch(sourcePaths.templates, ['templates']);
// });
//
// gulp.task('build', ['minify-css', 'templates']);
//
// gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);