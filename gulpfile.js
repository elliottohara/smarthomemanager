const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('scripts', () => {
  
  const tsResult = tsProject.src()
  .pipe(sourcemaps.init())
  .pipe(tsProject())
  ;
  return tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'assets']);