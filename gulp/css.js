import * as gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import * as build from './build/index.js';
import * as meta from './metadata/index.js';


const abstract = meta.abstract({ in: 'dereader.sass', sub: 'css', });
const desc = meta.describe(abstract.desc, 'scss', abstract.dest);

const run = async () => {
	const cfg = build.configure(abstract);
	const sass = gulpSass(dartSass);
	const result = gulp.
		src(cfg.src, { sourcemaps: cfg.dev }).
		pipe(sass()).
		pipe(cfg.dest, { sourcemaps: '.' })
		;

	return result;
};

export {
	abstract,
	desc,
	run,
};
