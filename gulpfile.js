var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var sass = require('gulp-sass')(require('sass'));

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

// Compiling styles
gulp.task('compile_styles', function() {
    return gulp.src(config.styles.root)
        .pipe($.sourcemaps.init())
        .pipe(sass.sync())
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build.styles));
});

// Compiling scripts
gulp.task('compile_app-scripts', function() {
    return concatJS(config.app_scripts, 'app.js');
});
gulp.task('compile_lib-scripts', function() {
    return concatJS(config.lib_scripts, 'lib.min.js');
});
gulp.task('compile_scripts', gulp.parallel('compile_app-scripts', 'compile_lib-scripts'));

// All Compiling
gulp.task('compile', gulp.parallel(
    // html
    'compile_styles',
    'compile_scripts'
));

///////////////////////////////////////////////////////////

gulp.task('clean', function() {
    return del([config.build.styles, config.build.scripts]);
});

gulp.task('watch', function() {
    gulp.watch(config.lib_scripts, gulp.series('compile_lib-scripts'));
    gulp.watch(config.app_scripts, gulp.series('compile_app-scripts'));
    gulp.watch(config.styles.all, gulp.series('compile_styles'));
});

gulp.task('serve', gulp.series('compile', 'watch'));
gulp.task('default', gulp.series('compile'));

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