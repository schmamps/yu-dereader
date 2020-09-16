const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sourcemap = require('gulp-sourcemaps');
const {config, describe,} = require('../util');

const cfg = config({in: 'dereader.sass', sub: 'css',});

module.exports.build = true;

module.exports.config = cfg;

module.exports.desc = () => describe(cfg.desc, 'scss', cfg.dest);

module.exports.run = () => {
	const initMap = sourcemap.init();
	const toCSS = sass();
	const writeMap = sourcemap.write('.');
	const dest = gulp.dest(cfg.dest);

	return gulp.
		src(cfg.src).
		pipe(initMap).
		pipe(toCSS).
		pipe(writeMap).
		pipe(dest);
};
