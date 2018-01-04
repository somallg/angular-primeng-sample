'use strict';

// THIS CHECK SHOULD BE THE FIRST THING IN THIS FILE
// This is to ensure that we catch env issues before we error while requiring other dependencies.
const engines = require('./package.json').engines;
require('./tools/check-environment')({
  requiredNodeVersion: engines.node,
  requiredNpmVersion: engines.npm,
  requiredYarnVersion: engines.yarn
});

const gulp = require('gulp');

// See `tools/gulp-tasks/README.md` for information about task loading.
function loadTask(fileName, taskName) {
  const taskModule = require('./tools/gulp-tasks/' + fileName);
  const task = taskName ? taskModule[taskName] : taskModule;
  return task(gulp);
}

gulp.task('format:enforce', loadTask('format', 'enforce'));
gulp.task('format', loadTask('format', 'format'));
gulp.task('prettier', loadTask('format', 'prettier'));
gulp.task('lint', ['format:enforce', 'validate-commit-messages', 'tslint']);
gulp.task('lint', ['format:enforce', 'validate-commit-messages', 'tslint']);
gulp.task('tslint', loadTask('lint'));
gulp.task('validate-commit-messages', loadTask('validate-commit-message'));

gulp.task('hello', loadTask('hello'));
