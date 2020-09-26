const gulp = require('gulp');
const build = require('../../lib/build');
const meta = require('../../lib/task/meta');
const sourcemapping = require('../../lib/sourcemapping');
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
	const sourcemaps = sourcemapping.set().if(cfg.dev);

	return gulp.
		src(rollup.config.input).
		pipe(sourcemaps.init).
		pipe(roll).
		pipe(sourcemaps.write).
		pipe(cfg.dest)
	;
};

module.exports = {
	abstract,
	desc,
	run,
};
