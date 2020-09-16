const gulp = require('gulp');
const shell = require('gulp-shell');
const {config, describe,} = require('../util');


const cfg = config({
	in: ['**/*.ts'],
	out: 'yu.js',
	sub: 'ts',
});

module.exports.build = true;

module.exports.config = cfg;

module.exports.desc = () => describe(
	cfg.desc,
	'rollup',
	cfg.out
);

module.exports.run = () => {
	return gulp.
		src('package.json', {read: false}).
		pipe(shell(['rollup -c']));
};
