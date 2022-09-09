
const gulp = require('gulp');

//Css
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//Js
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

//Other

const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();





var plugins = [
    autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }),
    cssnano()
];

function image() { 
    return gulp.src('src/img/**/*')
    .pipe(gulp.dest('./build/assets/img'))
    .pipe(browserSync.stream());
}


function minJs() {
    return gulp.src(['src/script/*.js'])
    //.pipe(uglify())  - not use now
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build/script'))
    .pipe(browserSync.stream());
}


function include() {
    return gulp.src(['src/html/index.html', 'src/html/pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}




function style() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./build/styles'))
        .pipe(browserSync.stream());
}







function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch("src/scss/**/*.scss", style)
    gulp.watch("src/script/**/*.js", minJs)
    gulp.watch('src/img/*', image)
    gulp.watch("src/html/**/*.html", include).on('change', browserSync.reload)

}




function main() {
    image()
    minJs()
    include()
    style()
    watch();
    
}


exports.default = main