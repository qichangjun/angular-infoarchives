'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src(['app/**/*.scss','!app/custom_components/bootstrap-sass-3.3.5/**/*.scss','!app/bower_components/bootstrap-sass/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('app/'));
});

gulp.task('less', function () {
    return gulp.src('app/custom_components/angular-ui-grid-3.0.7/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(plugins.less())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('app/custom_components/angular-ui-grid-3.0.7/less/'));
});

gulp.task('rubySass', function () {
    return rubySass('app/custom_components/bootstrap-sass-3.3.5/assets/stylesheets/bootstrap.scss',{ sourcemap: true })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/custom_components/bootstrap-sass-3.3.5/assets/stylesheets/'));
});



gulp.task('styles',['less','sass','rubySass'], function () {

});

gulp.task('coffee', function () {
    return gulp.src('app/**/*.coffee')
        .pipe(plugins.coffee())
        .pipe(gulp.dest('app/'));
});


gulp.task('html', function () {
    return gulp.src('app/modules/**/*.html')
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(gulp.dest('dist/modules'))
});

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')({
            filter: '**/*.{eot,svg,ttf,woff,woff2}'
        }).concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});


gulp.task('fonts', function () {
    return gulp.src('**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(plugins.flatten())
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('favicon', function () {
    return gulp.src('app/favicon.ico')
        .pipe(gulp.dest('dist/'))
});

gulp.task('xmlStyle', function () {
    return gulp.src('app/xmlStyle/file.xsl')
        .pipe(gulp.dest('dist/'))
});

gulp.task('transJson', function () {
    return gulp.src('app/i18n/*.json')
        .pipe(gulp.dest('dist/i18n'))

});
gulp.task('docIcons', function () {
    return gulp.src('app/images/docIcons/*.{png,gif,jpg}')
        .pipe(gulp.dest('dist/images/docIcons'))

});

gulp.task('images',['favicon','docIcons'], function () {
    return gulp.src(['app/images/*.{png,gif,jpg}'])
        .pipe(plugins.flatten())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('venderStyle', function () {
    return gulp.src(['app/custom_components/zTree_v3/css/zTreeStyle/img/*.{png,gif,jpg,css,eot,svg,ttf,woff,woff2}'])
        .pipe(gulp.dest('dist/css/img'));
});

gulp.task('build', ['coffee','styles','fonts','images','html','transJson','venderStyle','xmlStyle'], function () {
    var htmlFilter = plugins.filter('*.html',{restore: true});
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    var assets;
    return gulp.src('app/index.html')
        .pipe(assets = plugins.useref.assets())
        .pipe(plugins.rev())
        .pipe(jsFilter)
        .pipe(plugins.uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.autoprefixer({
            browsers:  ['> 0%'],
            cascade: false
        }))
        .pipe(plugins.csso())
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(plugins.revReplace())
        .pipe(htmlFilter)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest('dist'))
});

gulp.task('clean', require('del').bind(null, [ 'dist']));

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});



