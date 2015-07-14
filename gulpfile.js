// Load some modules which are installed through NPM.
var gulp = require("gulp");
var gutil = require('gulp-util');
var gconnect = require('gulp-connect');
var sass = require('gulp-sass');
var del = require('del'); //Bundles JS.
var source = require('vinyl-source-stream');
var reactify = require('reactify'); // Transforms React JSX to JS.
var watchify = require('watchify');
var browserify = require('browserify'); // Bundles JS.

// Define some paths
var paths = {
    html: ["src/html/*.html"],
    sass: ["src/sass/*.sass"],
    app_js: ["./src/js/app.jsx"],
    js: ["src/js/**/*.js"]
};

gulp.task('clean',function(done) {
    del(["build"],done);
});

//Html task (minify?)
gulp.task('html',['clean'],function() {
    gulp.src(paths.html).pipe(gulp.dest("public/"));
});

// Our CSS task. It finds all our css and compiles them.
gulp.task('css',['clean'],function() {
    return gulp.src(paths.sass).pipe(sass()).pipe(gulp.dest("public/css"));
});

// JS task. It will Browserify code and compile React JSX files.
gulp.task("js",["clean"],function() {
    //Browserify / bundle the JS
    browserify(paths.app_js)
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest("./public/js"));
});

//Rerun tasks whenever a file changes.
gulp.task('watch',function() {
    gulp.watch(paths.css,['css']);
    gulp.watch(paths.js,['js']);
    gulp.watch(paths.app_js,['js']);
    gulp.watch(paths.html,['html']);
});

//Webserver for dev
gulp.task('webserver',function() {
    gconnect.server({
        root: "public",
        livereload: true
    });
});

//The default task (called when we run `gulp` from cli)
gulp.task('default',['webserver','watch','css','js','html']);

