/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint func-names: "off" */
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

const src = ['./index.js', './lib/**/*.js'];
const test = ['./test/setUpBluebird.js', './test/**/*Test.js'];

gulp.task('lint', () => {
  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', () => {
  return gulp.src(src)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

/* At that time of writing Istanbul does not support async/await
gulp.task('test', ['pre-test'], () => {
  return gulp.src(test)
    .pipe(mocha())
    .pipe(istanbul.writeReports({ reporters: ['text', 'text-summary', 'html'] }));
});*/

gulp.task('test',  () => {
  return gulp.src(test)
    .pipe(mocha());
});

gulp.task('default', ['lint', 'test']);
