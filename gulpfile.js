var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');

gulp.task('html', function() {
  return gulp.src('site/index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {
  return browserify('site/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build/js'));
});

gulp.task('server', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: { enable: true, path: 'flappybirdECS' },
      open: true
    }));
});

gulp.task('default', ['html', 'scripts']);