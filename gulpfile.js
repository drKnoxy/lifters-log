var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

// paths and configs
var build = './';
var config = {
    build: build,
    app_scripts: [
        './_js/app.js',
        './_js/**/init.js',
        './_js/**/*.js'
    ],

    // we only use minified libs, feel
    // free to drop other libs in
    lib_scripts: './_lib/**/*.min.js',
};

// tasks
gulp.task('default', ['compile','watch']);

gulp.task('watch', function() {
    gulp.watch(config.app_scripts, ['compile_app-scripts']);
    gulp.watch(config.lib_scripts, ['compile_lib-scripts']);
});

gulp.task('compile', ['compile_app-scripts', 'compile_lib-scripts']);
gulp.task('compile_app-scripts', function() {
    return concatFiles(config.app_scripts, 'app.js');
});
gulp.task('compile_lib-scripts', function() {
    return concatFiles(config.lib_scripts, 'lib.min.js');
});




function concatFiles(files, outname) {
    return gulp.src(files)
        .pipe($.concat(outname))
        .pipe(gulp.dest(config.build));
}