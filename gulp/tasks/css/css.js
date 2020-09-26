const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const build = require('../../lib/build');
const meta = require('../../lib/task/meta');
const sourcemapping = require('../../lib/sourcemapping');


const abstract = meta.abstract({in: 'dereader.sass', sub: 'css',});
const desc = meta.describe(abstract.desc, 'scss', abstract.dest);

const run = () => {
	const cfg = build.configure(abstract);
	const sourcemaps = sourcemapping.set().if(cfg.dev);
	const toCSS = sass();

	return gulp.
		src(cfg.src).
		pipe(sourcemaps.init).
		pipe(toCSS).
		pipe(sourcemaps.write).
		pipe(cfg.dest)
	;
};

module.exports = {
	abstract,
	desc,
	run,
};
