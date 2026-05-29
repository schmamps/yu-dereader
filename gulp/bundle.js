import * as gulp from 'gulp';
import * as path from 'path';
import webext from 'web-ext';
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

	return await webext.cmd.build({
		sourceDir: cfg.dir,
		artifactsDir: path.resolve(cfg.dir, '..'),
		overwriteDest: true,
	});
};

const task = Object.assign(run, { abstract, description });

export { task };
