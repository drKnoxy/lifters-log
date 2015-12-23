var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});

var config = {
    build: './',
    scripts: [
        './_js/app.js',
        './_js/**/init.js',
        './_js/**/*.js'
    ]
};

gulp.task('watch', function() {
    gulp.watch(config.scripts, ['compile_scripts']);
});

gulp.task('compile_scripts', function() {
    return gulp.src(config.scripts)
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(config.build));
});