'use strict';

////////////////////////////////////////////
// CONFIGURATIONS

var ASSETS_PATH = 'assets/';
var BUILD_PATH = 'build/';
var CSS_FILE_NAME = 'main.css';
var JS_FILE_NAME = 'main.js';
var JS_LIB_FILE_NAME = 'lib.js';

///////////////////////////////////////////
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var argv = require('yargs').argv;

var mainBowerFiles = require('main-bower-files');

var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

var minifyCss = require('gulp-minify-css');

gulp.task('css', function() {
    var less = plugins.less({
        plugins: [autoprefix, cleancss]
    });
    less.on('error', function (e) {
        console.log(e.message);
        less.end();
    });

    return gulp.src(ASSETS_PATH + 'less/main.less')
        .pipe(plugins.if(!argv.production, plugins.sourcemaps.init()))
        .pipe(less)
        .pipe(plugins.if(!argv.production, plugins.sourcemaps.write()))
        .pipe(plugins.addSrc.prepend(mainBowerFiles('**/*.css')))
        .on('error', plugins.notify.onError("Error: <%= error.file %> <%= error.message %>"))
        .pipe(plugins.concat(CSS_FILE_NAME))
        .pipe(plugins.if(argv.production, minifyCss()))
        .pipe(gulp.dest(BUILD_PATH + 'css/'))
        .pipe(plugins.notify('CSS build finished'));
});


gulp.task('js', function() {
    return gulp.src([ASSETS_PATH + 'js/**/*.js'])
        .pipe(plugins.if(!argv.production, plugins.sourcemaps.init()))
        .pipe(plugins.concat(JS_FILE_NAME))
        .pipe(plugins.if(!argv.production, plugins.sourcemaps.write()))
        .pipe(plugins.if(argv.production, plugins.uglify()))
        .pipe(gulp.dest(BUILD_PATH))
        .pipe(plugins.notify('JS build finished'));
});

gulp.task('js:libs', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .on('error', plugins.notify.onError("Error: <%= error.file %> <%= error.message %>"))
        .pipe(plugins.concat(JS_LIB_FILE_NAME))
        .pipe(plugins.if(argv.production, plugins.uglify()))
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('images', function() {
    return gulp.src([ASSETS_PATH + 'images/**/*'])
        .pipe(gulp.dest(BUILD_PATH + 'images/'));
});

gulp.task('fonts', function() {
    var fonts = ['ttf', 'woff', 'woff2', 'eot', 'svg'].join(',');

    return gulp.src(mainBowerFiles('**/*.{'+ fonts +'}'))
        .pipe(plugins.addSrc(ASSETS_PATH + 'fonts/**/*.{'+ fonts +'}'))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(BUILD_PATH + 'fonts/'))
});

gulp.task('build', ['js', 'js:libs', 'css', 'fonts', 'images']);

gulp.task('default', ['build'], function() {
    gulp.watch(ASSETS_PATH + 'less/**', ['css']);
    gulp.watch(ASSETS_PATH + 'js/**', ['js']);
    gulp.watch(ASSETS_PATH + 'images/**', ['images']);
});