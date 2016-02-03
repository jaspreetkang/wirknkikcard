var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var ngHtml2Js = require('gulp-ng-html2js');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var ngAnnotate = require('browserify-ngannotate');
var debowerify = require('debowerify');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('clean', function(cb) {
    del([
        './public/dist'
    ], cb);
});

gulp.task('build-css', function() {
    return gulp.src('./public/stylesheets/*')
        .pipe(concat('all.css'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        //.pipe(cachebust.resources())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('build-template-cache', function() {

    return gulp.src('./public/partials/*.html')
        .pipe(ngHtml2Js({
            moduleName: 'wirknPartials',
            prefix: '/partials/'
        }))
        .pipe(concat('templateCachePartials.js'))
        .pipe(gulp.dest('./public/dist/partials'));
});

gulp.task('build-js', function() {
    var b = browserify({
        entries: './public/javascripts/app.js',
        debug: false,
        paths: ['./public/javascripts', './public/vendor'],
        transform: [debowerify, ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('build', ['build-css', 'build-template-cache', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    gulp.src(['./**/*.js',
              '!./node_modules/**/*.js',
              '!./public/vendor/**/*.js',
              '!./public/dist/**/*.js',
              '!./public/javascripts/branchio/**/*.js',
              '!./public/javascripts/segment/**/*.js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch([
        './**/*.js',
        './**/*.css',
        './**/*.html',
        '!./public/dist/**/*.*'
    ],
    ['lint', 'build']);
});

gulp.task('default', ['lint', 'watch']);
