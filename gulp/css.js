import * as gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import * as build from './build/index.js';
import * as meta from './metadata/index.js';

const abstract = meta.abstract({ in: 'dereader.sass', sub: 'css', });
const description = meta.describe(abstract.desc, 'scss', abstract.dest);
const run = async () => {
	const cfg = build.configure(abstract);
	const sass = gulpSass(dartSass);

	return await gulp.
		src(cfg.src, { sourcemaps: cfg.dev }).
		pipe(sass()).
		pipe(cfg.dest, { sourcemaps: '.' })
		;
};

const task = Object.assign(run, { abstract, description });

export { task };
