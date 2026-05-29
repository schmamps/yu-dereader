import * as gulp from 'gulp';
import * as path from 'path';
import zip from 'gulp-zip';
import * as build from './build/index.js';
import * as meta from './metadata/index.js';

const abstract = meta.abstract({
	in: ['*.css', '*.js', '*.json', '*.png'],
	sub: '../build',
	out: 'yu-dereader.xpi',
});

const description = meta.describe(abstract.desc, 'bundle', abstract.out);

const run = async () => {
	const cfg = build.configure(abstract);
	const paths = cfg.in.map((pattern) => path.resolve(cfg.dir, pattern));

	return await gulp.
		src(paths).
		pipe(zip(cfg.out)).
		pipe(cfg.dest)
		;
};

const task = Object.assign(run, { abstract, description });

export { task };
