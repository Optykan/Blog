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

gulp.task('server', ['compressCss', 'compressJs'], function() {
	var server = child.spawn('node', ['bin/www']);
	var log = fs.createWriteStream('server.log', {flags: 'a'});
	server.stderr.pipe(log);

	browserSync.init({
		proxy: "localhost:3000",
		port: 3001,
		notify: true,
		open: false
	});

	gulp.watch("assets/scss/**/*.scss", ['compressCss']);
	gulp.watch("assets/js/**/*.js", ['compressJs']);
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

gulp.task('compressCss', ['sass'], function(){
	gulp.src(['public/stylesheets/animate.css', 'public/stylesheets/foundation.css', 'public/stylesheets/home.css', 'public/stylesheets/style.css', 'public/stylesheets/parallax.css'])
		.pipe(concatCss("public/stylesheets/bundle/bundle-home.css"))
		.pipe(uglifycss({
			"maxLineLen": 80
		}))
		.pipe(gulp.dest("./"));

	gulp.src(['public/stylesheets/foundation.css', 'public/stylesheets/blog.css', 'public/stylesheets/style.css', 'public/stylesheets/parallax.css'])
		.pipe(concatCss("public/stylesheets/bundle/bundle-blog.css"))
		.pipe(uglifycss({
			"maxLineLen": 80
		}))
		.pipe(gulp.dest("./"));

	return gulp.src(['public/stylesheets/foundation.css', 'public/stylesheets/style.css', 'public/stylesheets/parallax.css', 'public/stylesheets/error.css'])
		.pipe(concatCss("public/stylesheets/bundle/bundle-error.css"))
		.pipe(uglifycss({
			"maxLineLen": 80
		}))
		.pipe(gulp.dest("./"))
		.pipe(browserSync.stream());
})

gulp.task('js', function(){
	gulp.src(["assets/js/**/*.js", "!assets/js/sw.js"])
	.pipe(babel({
		presets: ['env']
	}).on('error', console.log))
	.pipe(gulp.dest("public/javascripts"));

	gulp.src("assets/js/sw.js")
	.pipe(babel({
		presets: ['env']
	}).on('error', console.log))
	.pipe(gulp.dest("public/"));

	return browserSync.reload();
})

gulp.task('compressJs', ['js'], function(){
    gulp.src(['public/javascripts/vendor/jquery.js', 'public/javascripts/vendor/wow.min.js', 'public/javascripts/vendor/foundation.min.js', 'public/javascripts/vendor/lazyload.js', 'public/javascripts/app.js', 'public/javascripts/home.js', 'public/javascripts/client-auth.js'])
        .pipe(concat('bundle-home.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/'))
    return gulp.src(['public/javascripts/vendor/jquery.js', 'public/javascripts/vendor/foundation.min.js', 'public/javascripts/vendor/lazyload.js', 'public/javascripts/app.js', , 'public/javascripts/blog.js', 'public/javascripts/client-auth.js'])
        .pipe(concat('bundle-blog.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/'));
})

gulp.task('default', ['server']);