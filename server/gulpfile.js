const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('default', () => {
    return gulp.src('../static/modjs/**/*.js')
        .pipe(babel({ presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017"].map(require.resolve) }))
        .pipe(gulp.dest('dist'));
});