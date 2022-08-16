const livereload = require("gulp-livereload");
const gulp = require("gulp");
// gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin");
const { parallel } = require('gulp');
// gulp plugin to minify CSS, using clean-css
const cleanCSS = require('gulp-clean-css');
//  to cancat files
var concat = require('gulp-concat');
// Enabling you to compile your Pug templates into HTML
const pug = require('gulp-pug');
//To Show file name chrome
var sourcemaps = require('gulp-sourcemaps');







function pugtoHTML() {
  return gulp
    .src(["src/**/*.pug", "!src/0-mywork/comp/*.pug"]) //مصدر الملف
    .pipe( pug({ pretty: true})) //ضغط //pugلتحويل الي اكواد html
    // .pipe(htmlmin({ collapseWhitespace: true })) 
    .pipe(gulp.dest("build")) //هينقله هنا
    .pipe(livereload());
}



function movecss() {
  return gulp
    .src(["src/0-mywork/css-files/*.css"]) //
    .pipe(sourcemaps.init()) //sourse map
    .pipe(cleanCSS({compatibility: 'ie8'})) //minify
    .pipe(concat('all.css')) //هيجمعهم
    .pipe(sourcemaps.write()) //sourse map
    .pipe(gulp.dest("build")) //
    .pipe(livereload());
}






exports.default = function () {
  require("./server.js");
  livereload.listen();

  gulp.watch( ["src/**/*.pug", "src/**/*.css"]  ,  parallel(pugtoHTML, movecss) );
};
