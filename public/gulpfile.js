const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');

// Paths to source files
const paths = {
  html: '*.html',
  css: '*.css',
  js: '*.js'
};

// HTML Minify Task
gulp.task('minify-html', () => {
  return gulp.src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'));
});

// CSS Minify Task
gulp.task('minify-css', () => {
  return gulp.src(paths.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// JS Minify Task
gulp.task('minify-js', () => {
  return gulp.src(paths.js)
    .pipe(terser())
    .pipe(gulp.dest('dist/js'));
});

// Watch Task (optional for development)
gulp.task('watch', () => {
  gulp.watch(paths.html, gulp.series('minify-html'));
  gulp.watch(paths.css, gulp.series('minify-css'));
  gulp.watch(paths.js, gulp.series('minify-js'));
});

// Default Task: Run all minify tasks
gulp.task('default', gulp.parallel('minify-html', 'minify-css', 'minify-js'));
