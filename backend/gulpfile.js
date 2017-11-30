const gulp = require('gulp');

const gulpsync = require('gulp-sync')(gulp);

const gls = require('gulp-live-server');

const server = gls('./index', { env: process.env });


gulp.task('start', () => {
  server.start.apply(server);
});

gulp.task('stop', () => {
  server.stop.apply(server);
});

gulp.task('watch', () => {
  gulp.watch('./**/*.*', ['start']);
});


gulp.task('dev', gulpsync.sync(['start', 'watch']));
gulp.task('prod', gulpsync.sync(['start']));
