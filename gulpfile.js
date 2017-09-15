const gulp = require('gulp');

const gulpsync = require('gulp-sync')(gulp);

const gls = require('gulp-live-server');

const server = gls('./server', { env: process.env });


gulp.task('server:start', () => {
  server.start.apply(server);
});

gulp.task('server:stop', () => {
  server.stop.apply(server);
});

gulp.task('server:watch', () => {
  gulp.watch('./server/**/*.*', ['server:start']);
});


gulp.task('server:dev', gulpsync.sync(['server:start', 'server:watch']));
gulp.task('server:prod', gulpsync.sync(['server:start']));

