var gulp = require('gulp');
var babel = require('gulp-babel');

var paths = {
  source: './lib/**/*.js',
  build: './build'
};

gulp.task('default', function() {
  gulp.src(paths.source)
    .pipe(babel())
    .pipe(gulp.dest(paths.build));
});

