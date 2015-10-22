'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var mainBowerFiles = require('main-bower-files');

var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

gulp.task('css:production', function() {
    return gulp.src('less/main.less')
        .pipe(plugins.less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(plugins.addSrc.prepend(mainBowerFiles()))
        .pipe(plugins.ignore.include('*.css'))
        .on('error', plugins.notify.onError("Error: <%= error.file %> <%= error.message %>"))
        .pipe(plugins.concat('main.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('build/css/'))
        .pipe(plugins.notify('CSS:production build finished'));
});

gulp.task('css', function() {
    return gulp.src('less/main.less')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.addSrc.prepend(mainBowerFiles()))
        .pipe(plugins.ignore.include('*.css'))
        .on('error', plugins.notify.onError("Error: <%= error.file %> <%= error.message %>"))
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest('build/css/'))
        .pipe(plugins.notify('CSS build finished'));
});

gulp.task('js:production', function() {
    return gulp.src(['js/**/*.js'])
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('build/js/'))
        .pipe(plugins.notify('JS build finished'));
});

gulp.task('js', function() {
    return gulp.src(['js/*.js'])
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(plugins.notify('JS build finished'));
});

gulp.task('js:libs', function() {
    return gulp.src(mainBowerFiles())
        .pipe(plugins.ignore.include('*.js'))
        .on('error', plugins.notify.onError("Error: <%= error.file %> <%= error.message %>"))
        .pipe(plugins.concat('libs.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('build/js/'));
});

gulp.task('assets:fonts', function() {
    var fonts = ['ttf', 'woff', 'eot', 'svg'].join(',');

    return gulp.src(mainBowerFiles())
        .pipe(plugins.ignore.include('**/*.{'+ fonts +'}'))
        .pipe(plugins.addSrc('fonts/**/*.{'+ fonts +'}'))
        .pipe(plugins.flatten())
        .pipe(gulp.dest('build/fonts/'))
});

gulp.task('build', ['js', 'js:libs', 'css', 'assets:fonts']);
gulp.task('build:production', ['js:production', 'js:libs', 'css:production', 'assets:fonts']);

gulp.task('default', ['build'], function() {
    gulp.watch('less/**', ['css']);
    gulp.watch('js/**', ['js']);
});