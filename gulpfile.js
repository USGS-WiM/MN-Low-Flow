'use strict';
// Generated on 2015-08-12 using generator-wim 0.0.1

var gulp = require('gulp');
var open = require('open');
var del = require('del');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;


// Load plugins
var $ = require('gulp-load-plugins')();

//only get esri api if needed


//copy leaflet images

    gulp.task('leaflet', function() {
        return gulp.src('src/bower_components/leaflet/dist/images/*.*')
            .pipe(gulp.dest('src/images'));
    });


// Styles
gulp.task('styles', function () {
    return gulp.src(['src/styles/main.css'])
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('src/styles'))
        .pipe($.size());
});

// Icons
gulp.task('icons', function () {
    return gulp.src(['src/bower_components/bootstrap/dist/fonts/*.*', 'src/bower_components/fontawesome/fonts/*.*'])
        .pipe(gulp.dest('build/fonts'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(['src/scripts/**/*.js'])
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe($.size());
});

// HTML
gulp.task('html', ['styles', 'scripts', 'icons'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('src/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        //.pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('build'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src([
        'src/images/**/*',
        'src/lib/images/*'])
        .pipe(gulp.dest('build/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function (cb) {
    del([
        'build/styles/**',
        'build/scripts/**',
        'build/images/**',
    ], cb);
});

// Build
gulp.task('build', ['html', 'images']);

// Default task
//make sure download-esri-api (if needed) is run just after clean, but before build
//gulp.task('default', ['clean', 'download-esri-api'], function () {
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', function(){
    $.connect.server({
        root: 'src',
        port: 9000,
        livereload: true
    });
});

// Open
gulp.task('serve', ['connect'], function() {
    open("http://localhost:9000");
});

// Inject Bower components
gulp.task('wiredep', function () {
    gulp.src('src/styles/*.css')
        .pipe(wiredep({
            directory: 'src/bower_components',
            ignorePath: 'src/bower_components/'
        }))
        .pipe(gulp.dest('src/styles'));

    gulp.src('src/*.html')
        .pipe(wiredep({
            directory: 'src/bower_components',
            ignorePath: 'src/'
        }))
        .pipe(gulp.dest('src'));
});





// Watch
gulp.task('watch', function () {
	gulp.start('bs');

    // Watch for changes in `app` folder
    // gulp.watch([
    //     'src/*.html',
    //     'src/styles/**/*.css',
    //     'src/scripts/**/*.js',
    //     'src/images/**/*'
    // ], function (event) {
    //     return gulp.src(event.path)
    //         .pipe($.connect.reload());
    // });

    // Watch .css files
    // gulp.watch('src/styles/**/*.css', ['styles']);

    // Watch .js files
    // gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    // gulp.watch('src/images/**/*', ['images']);

    // Watch bower files
    // gulp.watch('bower.json', ['wiredep']);
});


/////////////////
// Browsersync //
/////////////////
// Watch for less changes
// Compile less on save
// inject CSS to browser
// Live reload for HTML and JS
gulp.task('compile-less', function () {
    gulp.src('./src/styles/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./src/styles/css/'))
        .pipe(browserSync.stream());
}); 


////////////////////
// Serve from Dev //
////////////////////
gulp.task('bs', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: "./src/"
    });

    gulp.watch("src/styles/less/**/*.less", ['compile-less']);
    gulp.watch("src/**/*.html").on("change", reload);
	gulp.watch("src/**/*.js").on("change", reload);
    gulp.watch('src/images/**/*', ['images']).on("change", reload);
	gulp.watch('bower.json', ['wiredep']).on("change", reload);

});


//////////////////////
// Serve From Build //
//////////////////////
gulp.task('serve-build', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: "./build/"
    });

});
