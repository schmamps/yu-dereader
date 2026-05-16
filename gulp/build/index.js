import * as gulp from 'gulp'
import * as path from '../path/index.js'

const DEV = 'development';

const compose = (...sources) => {
	let composed = {};

	for (const source of sources) {
		try {
			composed = Object.assign(composed, source);
		}
		catch (e) {
			throw new Error('composition error for value: ' + source.toString());
		}
	}

	return composed;
};

/**
 * @typedef {Object} Configuration
 * @property {Boolean} dev - debug state
 * @property {Boolean} prod - !.dev
 * @property {string} dir - output path
 * @property {NodeJS.ReadWriteStream} - gulp.dest() to `dir`
 */


const isDev = () => {
	const envSpec = (process.env.NODE_ENV || DEV).toLowerCase().trim();

	return !envSpec.startsWith('prod');
};

/**
 *
 * @param {Object} init config: initial values
 * @param {Object} override config: final values
 * @returns {Configuration}
 */
const configure = (init = {}, override = {}) => {
	const dev = isDev();
	const prod = !dev;
	const dir = path.join('.', 'build', dev ? 'dev' : 'prod');
	const dest = gulp.dest(dir);

	return compose(init, { dev, prod, dir, dest }, override);
};

export { configure };
