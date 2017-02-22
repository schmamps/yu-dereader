var
	gulp = require('gulp'),
	ugly = require('gulp-uglify'),
	file = require('fs'),
	plst = require('gulp-plist'),
	pkgData = require('./package.json'),
	pkgTasks = {},
	DIR = {
		src: 'src/',
		build: 'build.safariextension/',
	};

function pipeJS() {
	var opts = {mangle: false, output: {beautify: true,},};

	return gulp.
		src(DIR.src + '*.js').
		pipe(ugly(opts)).
		pipe(gulp.dest(DIR.build));
}

function writeManifest() {
	var manifest = JSON.parse(file.readFileSync(DIR.src + 'manifest.json'));
	manifest.name = pkgData.description;
	manifest.version = pkgData.version;

	var path = DIR.build + 'manifest.json';
	file.writeFileSync(path, JSON.stringify(manifest));
}

function writePList() {
	return gulp.
		src(DIR.src + 'Info.plist').
		pipe(plst({
			CFBundleDisplayName: pkgData.description,
			CFBundleShortVersionString: pkgData.version,
		})).
		pipe(gulp.dest(DIR.build));
}

function packageFiles() {
	if (gulp.parallel) {
		gulp.parallel(...Object.keys(pkgTasks));
	}
	else {
		Object.keys(pkgTasks).map(function(key) {
			pkgTasks[key]();
		});
	}
}

pkgTasks.js = pipeJS;
pkgTasks.manifest = writeManifest;
pkgTasks.plist = writePList;
Object.keys(pkgTasks).map(function(key) { gulp.task(key, pkgTasks[key]); });

gulp.task('package', packageFiles);
gulp.task('default', function() {
	gulp.watch('src/contentscript.js', ['js']);
});
