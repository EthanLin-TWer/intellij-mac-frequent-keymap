var gulp = require('gulp');
var less = require('gulp-less');
var watchLess = require('gulp-watch-less');

gulp.task('default', function () {
    return gulp.src('./less/*.less')
        .pipe(watchLess('./less/*.less'))
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});
