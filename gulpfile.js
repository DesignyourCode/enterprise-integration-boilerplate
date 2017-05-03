var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    concat = require('gulp-concat'),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    imagemin = require('gulp-imagemin'),
    sassGlob = require('gulp-sass-glob'),
    runSequence = require('run-sequence'),
    styleInject = require('gulp-style-inject'),
    inlinesource = require('gulp-inline-source'),
    gulpRemoveHtml = require('gulp-remove-html'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/styles/**/*.scss")
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest("dist/styles/"))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: "minify-css",
            message: 'Compressed CSS and updated browserSync'
        }));
});

// HTML
var paths = {
    html: {
        src: 'src',
        files: 'src/*.html',
        dist: 'dist',
        distProd: 'dist/prod'
    }
};

gulp.task('html', function () {
    return gulp.src(paths.html.files)
        .pipe(styleInject())
        .pipe(inlinesource())
        .pipe(replace('src="/content', 'src="https://clients-url.com/content'))
        .pipe(replace('src="/content', 'src="https://clients-url.com/content'))
        .pipe(replace('href="/content', 'href="https://clients-url.com/content'))
        .pipe(gulp.dest(paths.html.dist))
        .pipe(gulp.dest(paths.html.distProd))
        .pipe(browserSync.stream());
});

gulp.task('html-prod', function () {
    return gulp.src(paths.html.distProd + '/index.html')
        .pipe(replace('https://clients-url.com', ''))
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest(paths.html.distProd));
});

var scripts = [
    'src/lib/vendor/*.js',
    'src/lib/app.js'
];

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .on('error', function errorHandler (error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/lib/'))
        .pipe(reload({ stream: true }));
});

// static server and watching html files
gulp.task('serve', function(callback) {
    runSequence('sass', 'scripts', 'html', 'html-prod', function() {
        browserSync.init({
            port: 8000,
            server: './dist/'
        });

        gulp.watch(scripts, function() { runSequence('scripts', 'html', 'html-prod') });
        gulp.watch('src/styles/**/*.scss', function() { runSequence('sass', 'html', 'html-prod') });
        gulp.watch(paths.html.files, function() { runSequence('sass', 'html', 'html-prod') }).on('change', browserSync.reload);
    });
});

gulp.task('default', ['serve']);