import * as gulp from 'gulp';
import * as path from './path/index.js';
import webext from 'web-ext';
import * as build from './build/index.js';
import * as meta from './metadata/index.js';
import * as json from './json/index.js';

const getFilename = async (dir) => {
	const { version } = await json.load(path.resolve(dir, 'manifest.json'));

	return `yu-dereader-${version}.xpi`;
}

const abstract = meta.abstract({
	in: ['*.css', '*.js', '*.json', '*.png'],
	sub: '../build',
});

const description = meta.describe(abstract.desc, 'bundle', abstract.out);

const run = async () => {
	const cfg = build.configure(abstract);
	const paths = cfg.in.map((pattern) => path.resolve(cfg.dir, pattern));

	return await webext.cmd.build({
		sourceDir: cfg.dir,
		artifactsDir: path.resolve(cfg.dir, '..'),
		overwriteDest: true,
		filename: await getFilename(cfg.dir),
	});
};

const task = Object.assign(run, { abstract, description });

export { task };
