const browserify = require('browserify');
const noop = require('gulp-noop');
const tsify = require('tsify');
const vss = require('vinyl-source-stream');

const build = require('../../lib/build');
const meta = require('../../lib/task/meta');
const path = require('../../lib/path');

const abstract = meta.abstract({
	in: ['**/*.ts'],
	sub: 'ts',
	out: 'yu.js',
});

const desc = meta.describe(abstract.desc, 'transpile', abstract.out);

const run = () => {
	const cfg = build.configure(abstract);

	const project = browserify({
		basedir: './src/ts/',
		debug: cfg.dev,
		entries: ['index.ts'],
		cache: {},
		packageCache: {}
	});

	return project.
		plugin(tsify).
		bundle().
		pipe(vss('yu.js')).
		pipe(cfg.dest);
};

module.exports = {
	abstract,
	desc,
	run,
};
