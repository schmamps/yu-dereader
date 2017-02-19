var gulp = require('gulp');
var ugly = require('gulp-uglify');
var file = require('fs');

gulp.task('js', function() {
	/* eslint-disable camelcase */
	var opts = {
		mangle: false,
		output: {beautify: true,},};

	return gulp.
		src('src/*.js').
		pipe(ugly(opts)).
		pipe(gulp.dest('build'));
});

gulp.task('manifest', function() {
	var pkg = JSON.parse(file.readFileSync('package.json'));

	var man = JSON.parse(file.readFileSync('src/manifest.json'));
	man.name = pkg.description;
	man.version = pkg.version;

	file.writeFileSync('build/manifest.json', JSON.stringify(man));
});

gulp.task('default', ['js', 'manifest']);
