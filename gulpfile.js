var postcss = require('gulp-postcss');
var gulp = require('gulp');
var babel = require('gulp-babel');
var minify = require('gulp-minify');
var watch = require('gulp-watch');

gulp.task('css', function () {
    return gulp.src('./src/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('babel1',function () {
    gulp.src('src/index.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify({
            noSource:true,
            ext:{min:'.js'}
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('babel2',function () {
    gulp.src('src/play.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify({
            noSource:true,
            ext:{min:'.js'}
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch',function () {
    var watcher1 = gulp.watch('src/**/*.js', ['babel1']);
    watcher1.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    var watcher2 = gulp.watch('src/**/*.css', ['css']);
    watcher2.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default',['css','babel1','babel2']);