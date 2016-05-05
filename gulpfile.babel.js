import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';

const paths = {
  js: ['./src/**/*.js'],
  jade: ['./src/**/*.jade'],
  css: ['./src/**/*.css'],
  destination: './dist'
};

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
  run('clean', 'babel', 'copy-client', 'restart', cb);
});

gulp.task('clean', cb => {
  rimraf(paths.destination, cb);
});

gulp.task('babel', shell.task([
  'babel src --out-dir dist'
]));

gulp.task('clean', cb => {
  rimraf(paths.destination, cb);
});


let express;

gulp.task('server', () => {
  express = server.new(paths.destination + '/app.js');
});

gulp.task('restart', () => {
  express.start.bind(express)();
});

const ignoreFiles = [
  
];

gulp.task('watch', () => {
  var watcher = gulp.watch([paths.js, paths.jade, paths.css]);
  watcher.on('change', (file) => {
    const filePath = file.path;
    const fileType = filePath.slice(filePath.lastIndexOf('.'));

    console.log(filePath);
    console.log(`changed ${fileType}`);

    if(fileType === '.js' && !filePath.includes('/src/public/')) {
      gulp.start('build');
    } else {
      gulp.start('copy-client', () => {
        express.notify.call(express, file);
      });
    }
  });
});


gulp.task('copy-templates', () => {
  return gulp.src('src/**/*.jade')
    .pipe(gulp.dest(paths.destination));
});

gulp.task('copy-public', () => {
  return gulp.src(['src/public/**/*.*', '!src/public/lib'])
    .pipe(gulp.dest(paths.destination + '/public'));
});

gulp.task('copy-client', ['copy-templates', 'copy-public']);
