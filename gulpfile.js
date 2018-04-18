var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    gulpClean = require('gulp-clean'),
    gulpJShint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref');

var DIST_DIR = './public',
    SOURCE_DIR = './app';

gulp.task('build', ['clean', 'scripts', 'sass'], function() {
    return gulp.src([SOURCE_DIR + '/**/**/tmpl-*.html', SOURCE_DIR + '/styles.css'])
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('clean', function() {
    return gulp.src(DIST_DIR).pipe(gulpClean());
});

gulp.task('jshint', function() {
    return gulp.src([
        SOURCE_DIR + '/**/*.js',
        '!**/*.min.js',
        '!app/jasmine/lib/**'
    ])
    .pipe(gulpJShint())
    .pipe(gulpJShint.reporter('jshint-stylish'));
});

gulp.task('js-watch', ['jshint'], function() {
    browserSync.reload();
});

gulp.task('sass', function() {
    return gulp.src(SOURCE_DIR + '/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest(SOURCE_DIR))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    gulp.src(SOURCE_DIR + '/index.html')
    .pipe(useref())
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        open: true,
        port: 8080,
        server: {
            baseDir: [SOURCE_DIR]
        }
    });

    gulp.watch(SOURCE_DIR + '/**/*.js', ['js-watch']);
    gulp.watch(SOURCE_DIR + '/**/*.scss', ['sass']);
    gulp.watch(SOURCE_DIR + '/*.html').on('change', browserSync.reload);
});
