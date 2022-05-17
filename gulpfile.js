//Hämtar in gulp-paketet och sparar i ett objekt
const {src, dest, parallel, series, watch} = require('gulp');
//Hämtar in gulp-concat, som slår ihop filer
const concat = require('gulp-concat');
//Hämtar in gulp-terser, som minifierar
const terser = require('gulp-terser');
//Hämtar in browsersync
const browserSync = require('browser-sync').create();
//Hämtar sass och konverterar till CSS
const sass = require('gulp-sass')(require('sass'));
//Hämtar sourcemaps som "trackar" vart sass-koden kommer ifrån
const sourcemaps = require('gulp-sourcemaps');


const files = {
    htmlPath : "src/**/*.html",
    jsPath : "src/js/*.js",
    sassPath : "src/scss/*.scss"
}


//HTML-task. Kopierar över filerna till katalogen pub
function htmlCopy(){
    return src(files.htmlPath)
    .pipe(dest('pub'))
    .pipe(browserSync.stream());
}


//JS-task. Kopierar över filerna till katalogen pub/js
function jsCopy(){
    return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(dest('pub/js'));
}

//Sass-task
function sassTask(){
    return src(files.sassPath)
   .pipe(sourcemaps.init())
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(sourcemaps.write('./maps'))
   .pipe(dest('pub/css'))
   .pipe(browserSync.stream());
}

//Watch-task som ser till att allt uppdateras automatiskt
function watchTask(){
    browserSync.init({
        server: "./pub"
    });


	watch([files.htmlPath, files.sassPath, files.jsPath], parallel(htmlCopy, jsCopy, sassTask)).on('change', browserSync.reload);
}

//Exporterar
exports.default = series (
    parallel(htmlCopy, jsCopy, sassTask),
    watchTask
)