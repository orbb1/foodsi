var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    gulpClean = require('gulp-clean'),
    gulpJShint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

var DIST_DIR = './public',
    SOURCE_DIR = './app';

gulp.task('clean', function() {
    return gulp.src(DIST_DIR).pipe(gulpClean());
});

gulp.task('jshint', function() {
    return gulp.src([
        SOURCE_DIR + '/**/*.js',
        '!**/*.min.js'
    ])
    .pipe(gulpJShint())
    .pipe(gulpJShint.reporter('jshint-stylish'));
});

gulp.task('js-uglify', ['clean'], function() {
    gulp.src(SOURCE_DIR + '/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('js-watch', ['jshint'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('sass', function() {
    return gulp.src(SOURCE_DIR + '/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest(DIST_DIR))
    .pipe(gulp.dest(SOURCE_DIR))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        open: true,
        port: 8080,
        server: {
            baseDir: [DIST_DIR, SOURCE_DIR]
        }
    });

    gulp.watch(SOURCE_DIR + '/**/*.js', ['js-watch']);
    gulp.watch(SOURCE_DIR + '/**/*.scss', ['sass']);
    gulp.watch(SOURCE_DIR + '/*.html').on('change', browserSync.reload);
});