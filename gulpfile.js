/**
 * Created by fabio on 14/09/15.
 */
var rootPath = __dirname+'/';

var SOURCES_JS = [
    rootPath+'server.js',
    rootPath+'app/**/*.js'
];

// server
var gulp = require('gulp');

var server = require('gulp-express');
gulp.task('server', ['jshint'], function () {
    server.run([rootPath+'app/server.js']);

    // watch((
    gulp.watch(SOURCES_JS, function(event) {
        gulp.start('server');
        server.notify(event);
    });
});

// jshint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
    return gulp.src(SOURCES_JS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});