// clang-format entry points
const srcsToFmt = ['src/**/*.{js,ts}', 'tools/**/*.{js,ts}'];

module.exports = {
  // Check source code for formatting errors (clang-format)
  enforce: gulp => () => {
    const format = require('gulp-clang-format');
    const clangFormat = require('clang-format');
    return gulp
      .src(srcsToFmt)
      .pipe(
        format.checkFormat('file', clangFormat, { verbose: true, fail: true })
      );
  },

  // Format the source code with clang-format (see .clang-format)
  format: gulp => () => {
    const format = require('gulp-clang-format');
    const clangFormat = require('clang-format');

    const args = require('yargs').argv;
    const gulpPrint = require('gulp-print');
    const gulpIf = require('gulp-If');

    return gulp
      .src(srcsToFmt, { base: '.' })
      .pipe(gulpIf(args.verbose, gulpPrint()))
      .pipe(format.format('file', clangFormat))
      .pipe(gulp.dest('.'));
  },

  // Format the source code with prettier
  prettier: gulp => () => {
    const prettierPlugin = require('gulp-prettier-plugin');
    const prettierOptions = require('./prettier.json');

    const args = require('yargs').argv;
    const gulpPrint = require('gulp-print');
    const gulpIf = require('gulp-If');

    return gulp
      .src(srcsToFmt, { base: '.' })
      .pipe(gulpIf(args.verbose, gulpPrint()))
      .pipe(prettierPlugin(prettierOptions, { filter: true }))
      .pipe(gulp.dest('.'));
  },
};
