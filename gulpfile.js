var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');

gulp.task('html', function() {
  return gulp.src('site/index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('styles', function() {
  return gulp.src('site/css/main.css')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
  return browserify('site/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    // .pipe(uglify())
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

gulp.task('default', ['html', 'styles', 'scripts', 'server'], function(){
  gulp.watch('./site/index.html', ['html']);
  gulp.watch('./site/css/*.css', ['styles']);  
  gulp.watch('./site/js/**/*.js', ['scripts']); 
});