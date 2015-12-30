var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

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

gulp.task('help', $.taskListing.withFilters(null, 'default'));
gulp.task('default', ['help']);

gulp.task('serve', ['clean', 'compile', 'watch']);

///////////////////////////////////////////////////////////

gulp.task('clean', function(done) {
    del([config.build], done);
});

gulp.task('watch', function() {
    gulp.watch(config.lib_scripts, ['compile_lib-scripts']);
    gulp.watch(config.app_scripts, ['compile_app-scripts']);
    gulp.watch(config.styles.all, ['compile_styles']);
});

// All Compiling
gulp.task('compile', [
    // html
    'compile_styles',
    'compile_scripts',
]);

// Compiling styles
gulp.task('compile_styles', function() {
    return gulp.src(config.styles.root)
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync())
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build.styles));
});

// Compiling scripts
gulp.task('compile_scripts', ['compile_app-scripts', 'compile_lib-scripts']);
gulp.task('compile_app-scripts', function() {
    return concatJS(config.app_scripts, 'app.js');
});
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