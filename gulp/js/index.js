const composer = require('gulp-uglify/composer');
const concat = require('gulp-concat');
const gulp = require('gulp');
const sourcemap = require('gulp-sourcemaps');
const uglifyES = require('uglify-es');
const uglify = composer(uglifyES, console);
const {config, describe, reportError} = require('../util');

const cfg = config({
	in: [
		'core.js',
		'dom.js',
		'params.js',
		'comic.js',
		'request.js',
		'characters.js',
		'nest.js',
		'ui.js',
		'config.js',
		'init.js',
	],
	out: 'angola.js',
	sub: 'js',
	uglify: {
		mangle: false,
		output: {
			beautify: true,
		},
		compress: {
			drop_debugger: false,  // eslint-disable-line camelcase
		}
	},
});

module.exports.build = true;

module.exports.config = cfg;

module.exports.desc = () => describe(
	cfg.desc,
	'concat',
	cfg.out,
	'uglify',
	cfg.dest
);

module.exports.run = () => {
	const combine = concat(cfg.out);
	const initMap = sourcemap.init();
	const writeMap = sourcemap.write('.');
	const dest = gulp.dest(cfg.dest);
	const ugly = uglify(cfg.uglify).on('error', reportError);

	return gulp.
		src(cfg.src).
		pipe(initMap).
		pipe(combine).
		pipe(ugly).
		pipe(writeMap).
		pipe(dest);
};
