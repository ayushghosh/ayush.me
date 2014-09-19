// Include gulp
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');


var location = {
    "bc": "./bower_components/",
    "src": "./src/",
    "dist": "./dist/",
    "temp": "./temp/",
}

gulp.task('styles', function() {
  gulp.src([
        // location.bc + '/normalize-css/normalize.css',
        location.src + '/css/*.css',
    ])
    .pipe(concat('all.css'))
    .pipe(gulp.dest(location.dist+'/css'))
    .pipe(rename('all.min.css'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(location.dist+'/css'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
            location.bc + 'zepto/zepto.min.js',
            location.src+ 'js/app.js',

        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(location.dist+'/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(location.dist+'/js'));
});
gulp.task('pages', function() {
    var opts = {comments:false,spare:true};

  gulp.src(location.src+'*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(location.src + '**/js/*.js', ['scripts']);
    gulp.watch(location.src + '**/*.html', ['pages']);
    gulp.watch(location.src + '**/css/*.css', ['styles']);
});

// Default Task
gulp.task('default', ['scripts','styles','pages','watch']);