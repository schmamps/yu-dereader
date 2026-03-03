const gulp = require('gulp');
const compose = require('./compose');
const path = require('./path');

const DEV = 'development';

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

	return compose(init, {dev, prod, dir, dest}, override);
};

module.exports = {
	configure,
};
