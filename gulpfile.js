var fs          = require('fs');
var gulp        = require('gulp');
var child       = require('child_process');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var babel       = require('gulp-babel');
var babelcore   = require('babel-core');
var autoprefixer= require('gulp-autoprefixer');
var concatCss   = require('gulp-concat-css');
var uglifycss   = require('gulp-uglifycss');
var concat      = require('gulp-concat');
var pump        = require('pump');
var uglify      = require('gulp-uglify');

// Static Server + watching scss/html files

gulp.task('server', ['sass'], function() {
	var server = child.spawn('node', ['bin/www']);
	var log = fs.createWriteStream('server.log', {flags: 'a'});
	server.stderr.pipe(log);

	browserSync.init({
		proxy: "localhost:3000",
		port: 3001,
		notify: true
	});

	gulp.watch("assets/scss/**/*.scss", ['sass']);
	gulp.watch("assets/js/**/*.js", ['js']);
	gulp.watch(["routes/*.html", "views/**/*.ejs"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("assets/scss/*.scss")
	.pipe(sass({ outputStyle: 'compressed' })
		.on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascase: false
	}))
	.pipe(gulp.dest("public/stylesheets"))
	.pipe(browserSync.stream())
	.pipe(notify("Compiled successfully"));
});

gulp.task('compressCss', function(){
	return gulp.src(["public/stylesheets/*.css", '!public/stylesheets/admin.css', '!public/stylesheets/bundle.css'])
		.pipe(concatCss("public/stylesheets/bundle.css"))
		.pipe(uglifycss({
			"maxLineLen": 80
		}))
		.pipe(gulp.dest("./"));
})

gulp.task('js', function(){
	gulp.src("assets/js/**/*.js")
	.pipe(babel({
		presets: ['env']
	}).on('error', console.log))
	.pipe(gulp.dest("public/javascripts"));

	return browserSync.reload();
})

gulp.task('compressHomeJs', function(cb){
	pump([
        gulp.src(['public/javascripts/vendor/jquery.js', 'public/javascripts/vendor/foundation.min.js', 'public/javascripts/app.js', 'public/javascripts/home.js', 'public/javascripts/client-auth.js']),
        concat('bundle-home.js'),
        uglify(),
        gulp.dest('public/javascripts/')
    ],
    cb
  );
})

gulp.task('default', ['server']);