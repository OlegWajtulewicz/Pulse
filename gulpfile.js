const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const gcmq = require('gulp-group-css-media-queries');

gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/scss/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/scss/**/*.+(scss|sass)", gulp.parallel('styles'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));


//'_media-mixin.scss'

gulp.task('css:build', function() {
	return gulp.src(['!src/_*.scss','src/*.scss']) // Взяли файлы с расширением .scss, исключили из выборки файлы, которые начинаются с символа _
		.pipe(sass()) // компилируем scss в css
		.pipe(gcmq()) // в полученном css группируем множество медиа-выражений в общие.
		.pipe(gulp.dest('src/')) // кладем наш css файл в ту же папку
});