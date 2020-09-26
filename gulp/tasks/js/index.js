const gulp = require('gulp');
// const buffer = require('vinyl-buffer');
// const sourceStream = require('vinyl-source-stream');
const build = require('../../lib/build');
const meta = require('../../lib/task/meta');
// const sourcemaps = require('../../lib/sourcemaps');
const path = require('../../lib/path');
const rollup = require('./rollup');

const abstract = meta.abstract({
	in: ['**/*.ts'],
	out: path.basename(rollup.config.output.file),
	sub: path.split(rollup.config.input).slice(-2)[0],
});

const desc = meta.describe(abstract.desc, 'rollup', abstract.out);

const run = () => {
	const cfg = build.configure(abstract);
	const roll = rollup.getPipe(cfg);
	// const stream = sourceStream(rollup.config.input);
	// const srcMap = sourcemaps.set({loadMaps: true}).if(cfg.dev);

	return gulp.
		src(rollup.config.input).
		pipe(roll).
		pipe(cfg.dest)
	;
};

module.exports = {
	abstract,
	desc,
	run,
};
