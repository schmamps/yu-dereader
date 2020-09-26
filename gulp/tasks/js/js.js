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
	const maps = sourcemapping.set().if(true);

	// gulp-better-rollup seems not to play nice with noop/gulp-if
	const pipeline = [
		maps.init,
		rollup.getPipe(cfg),
		maps.write,
		cfg.dest,
	].filter((_, i) => cfg.dev || i % 2 === 1);

	return pipeline.reduce(
		(steps, pipe) => pipe ? steps.pipe(pipe) : steps,
		gulp.src(rollup.config.input)
	);
};

module.exports = {
	abstract,
	desc,
	run,
};
