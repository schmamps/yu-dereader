import * as gulp from 'gulp'
import * as sass from 'gulp-dart-sass'
import * as build from '../../lib/build'
import * as meta from '../metadata.js'
import * as sourcemapping from '../../lib/sourcemapping'


const abstract = meta.abstract({ in: 'dereader.sass', sub: 'css', });
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

export {
	abstract,
	desc,
	run,
};
