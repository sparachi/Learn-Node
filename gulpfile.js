'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFilesToCheck = ['*.js', 'src/*/*.js'];
var filesToMonitor = ['*.js', 'src/*/*.js'];

gulp.task('style', function () {

	return gulp.src(jsFilesToCheck)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});

gulp.task('inject', function () {

	var wiredep = require('wiredep').stream;
	var customFileInjection = require('gulp-inject');

	var customFilesSource = gulp.src(['./public/css/*.css', './public/js/*.js'], {
		read: false
	});

	var customFileOptions = {
		ignorePath: '/public'
	};

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		//to avoid wiredep spit the entire path in our html/jade file use 'ignorePath' attribute
		ignorePath: '../../public'
	};
	// changing from *.html to *.jade
	// changing from *.jade to *.hbs
	// changing from *.hbs to *.ejs
	return gulp.src('./src/views/*.ejs')
		.pipe(wiredep(options))
		.pipe(customFileInjection(customFilesSource, customFileOptions))
		.pipe(gulp.dest('./src/views'));

});

//gulp tasks can be a pre-cursor to other gulp tasks, and can be mentioned as arguments
//as they run asynchronously, excercise caution if they are updating same file
//make sure to chain them if you have dependencies

gulp.task('serveApp', ['style', 'inject'], function () {

	var serveAppOptions = {
		script: 'app.js',
		delayTime: '50',
		env: {
			'PORT': 3030
		},
		watch: filesToMonitor
	};

	return nodemon(serveAppOptions)
		.on('restart', function (args) {
			console.log('server restarting..');
		});

});