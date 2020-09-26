const terser = require('rollup-plugin-terser').terser;
const config = require('../../../rollup.config.cjs');
const better = require('gulp-better-rollup');
const compose = require('../../lib/compose');
const path = require('../../lib/path');


const getPipe = (cfg) => {
	const outputOpts = compose(
		config.output,
		{file: path.join(cfg.dir, path.basename(config.output.file))}
	);
	const {plugins} = config;

	if (cfg.prod) {
		plugins.push(terser());
	}

	return better({plugins}, outputOpts);
};

module.exports = {
	getPipe,
	config,
};
