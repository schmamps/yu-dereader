const gulp = require('gulp');
const compose = require('./compose');
const path = require('./path');

const DEV = 'development';


const isDev = () => {
	const envSpec = (process.env.NODE_ENV || DEV).toLowerCase().trim();

	return !envSpec.startsWith('prod');
};

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
