// Generated on 2014-06-15 using generator-bookmarklet 0.2.0

'use strict';

var buffer = require('buffer');
var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var gulpConcat = require('gulp-concat');
var gulpJshint = require('gulp-jshint');
var gulpUglify = require('gulp-uglify');
var jshintStylish = require('jshint-stylish');
var map = require('map-stream');

gulp.task('scripts', function () {
    var header = new Buffer('javascript:');

    gulp.src('app/{,*/}*.js')
        .pipe(gulpJshint())
        .pipe(gulpJshint.reporter(jshintStylish))
        .pipe(gulpUglify())
        .pipe(gulpConcat('bookmarklet.js'))
        .pipe(map(function (file, cb) {
            file.contents = buffer.Buffer.concat([header, file.contents]);
            cb(null, file);
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function () {
    gulp.src('dist').pipe(gulpClean());
});

gulp.task('default', ['clean', 'scripts']);

gulp.task('watch', function () {
    gulp.watch('app/{,*/}*.js', function () {
        gulp.run('scripts');
    });
});
