var fs          = require('fs');
var gulp        = require('gulp');
var child       = require('child_process');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');

// Static Server + watching scss/html files

gulp.task('server', ['sass'], function() {
	var server = child.spawn('node', ['bin/www']);
	var log = fs.createWriteStream('server.log', {flags: 'a'});
	server.stderr.pipe(log);

	browserSync.init({
		proxy: "localhost:3000",
		port: 3001
	});

	gulp.watch("assets/scss/*.scss", ['sass']);
	gulp.watch(["routes/*.html", "views/*/*.ejs"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("assets/scss/*.scss")
	.pipe(sass({ outputStyle: 'compressed' })
		.on('error', sass.logError))
	.pipe(gulp.dest("public/stylesheets"))
	.pipe(browserSync.stream())
	.pipe(notify("Compiled successfully"));
});

gulp.task('default', ['server']);