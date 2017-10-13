const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const gulpSequence = require('gulp-sequence').use(gulp);
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')

/*----------dev------------*/
var jsScript = 'node'
if (process.env.npm_config_argv !== undefined && process.env.npm_config_argv.indexOf('debug') > 0) {
    jsScript = 'node debug'
}
gulp.task('nodemon', function() {
    return nodemon({
        script: 'build/server.js',
        execMap: {
            js: jsScript
        },
        verbose: true,
        ignore: ['build/*.js', 'dist/*.js', 'nodemon.json', '.git', 'node_modules/**/node_modules', 'gulpfile.js'],
        env: {
            NODE_ENV: 'development'
        },
        ext: 'js json'
    })
})

gulp.task('default', ['nodemon'], () => {
    console.log('gulpfile.js 已经运行!')
})



/*---------------------------------------------------------- build ---------------------------------------------------*/
// 清除文件
gulp.task('clean:dist', function() {
    return gulp.src(['./dist'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('babel', () => {
    return gulp.src('./src/**')
        .pipe(babel({
            "presets": ["es2015", "stage-2"],
            "plugins": ["transform-runtime"]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js:min', function() {
    return gulp.src(['./dist/**'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
})

gulp.task('replace', function() {
    return gulp.src(['./dist/config.js'])
        .pipe(replace(/PASSWORD(.+)?'/, "PASSWORD:'root'"))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', gulpSequence('clean:dist', 'babel', 'replace', 'js:min'));