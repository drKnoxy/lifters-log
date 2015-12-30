var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});

var config = {
    build: {
        styles: './css',
        scripts: './js',
    },
    app_scripts: [
        './_js/app.js',
        './_js/**/init.js',
        './_js/**/*.js',
    ],
    lib_scripts: './_lib/**/*.min.js',
    styles: {
        root: './app.scss',
        all: [
            './app.scss',
            './_scss/**/*.scss',
        ]
    }
};

/**
 *
 */
gulp.task('help', $.taskListing.withFilters(null, 'default'));
gulp.task('default', ['help']);

/**
 * Remove all build / temp files
 */
gulp.task('clean', function(done) {
    // del([config.build], done);
});

/**
 *
 */
gulp.task('watch', function() {
    gulp.watch(config.lib_scripts, ['compile_lib-scripts']);
    gulp.watch(config.app_scripts, ['compile_app-scripts']);
    gulp.watch(config.styles.all, ['compile_styles']);
});

/**
 * Run all compiling tasks
 */
gulp.task('compile', [
    'compile_styles',
    // html
    // scripts
    'compile_scripts',
]);

/**
 *
 */
gulp.task('compile_styles', function() {
    return gulp.src(config.styles.root)
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync())
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build.styles));
});

/**
 *
 */
gulp.task('compile_scripts', ['compile_app-scripts', 'compile_lib-scripts']);

/**
 *
 */
gulp.task('compile_app-scripts', function() {
    return concatJS(config.app_scripts, 'app.js');
});

/**
 *
 */
gulp.task('compile_lib-scripts', function() {
    return concatJS(config.lib_scripts, '/lib.min.js');
});

function concatJS(src, newname) {
    var template = [
    "// <%= file.path %>",
    "(function(){",
        '"use strict";',
        "<%= contents %>",
    "})();",
    " ",
    ].join("\n");

    return gulp.src(src)
        .pipe($.wrap(template))
        .pipe($.concat(newname))
        .pipe(gulp.dest(config.build.scripts));
}