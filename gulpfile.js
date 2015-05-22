var gulp 			= require('gulp'),
    sass 			= require('gulp-ruby-sass'),
    autoprefixer 	= require('gulp-autoprefixer'),
    minifycss 		= require('gulp-minify-css'),
    jshint 			= require('gulp-jshint'),
    uglify 			= require('gulp-uglify'),
    imagemin 		= require('gulp-imagemin'),
    rename 			= require('gulp-rename'),
    concat 			= require('gulp-concat'),
    notify 			= require('gulp-notify'),
    cache 			= require('gulp-cache'),
    livereload 		= require('gulp-livereload'),
    del 			= require('del'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
  return sass('assets/sass/', { style: 'compact', 
                                sourcemap: true 
                              })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['assets/js/**/*.js', '!assets/js/libs/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('assets/sass/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('assets/js/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('assets/images/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
