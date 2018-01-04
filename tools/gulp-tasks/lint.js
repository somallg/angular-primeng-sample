// Check the coding standards and programming errors
module.exports = gulp => () => {
  const tslint = require('gulp-tslint');
  const gulpIf = require('gulp-if');
  const gulpPrint = require('gulp-print');
  const args = require('yargs').argv;
  // Built-in rules are at https://palantir.github.io/tslint/rules/
  const path = require('path');
  return gulp
    .src([
      // todo(vicb): add .js files when supported
      // see https://github.com/palantir/tslint/pull/1515
      './src/**/*.ts',
      './tools/**/*.ts',
      './tools/**/*.js',
      './*.ts',

      // Ignore node_modules directories
      '!**/node_modules/**',

      // Ignore built files directories
      '!**/built/**',
      '!**/dist/**',

      // Ignore special files
      '!**/*.externs.js',

      // Ignore generated files due to lack of copyright header
      // todo(alfaproject): make generated files lintable
      '!**/*.d.ts',
      '!**/*.ngfactory.ts',
    ])
    .pipe(gulpIf(args.verbose, gulpPrint()))
    .pipe(
      tslint({
        configuration: path.resolve(__dirname, '../../tslint.json'),
        formatter: 'prose',
      })
    )
    .pipe(tslint.report({ emitError: true }));
};