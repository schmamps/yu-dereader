const gulp = require('gulp');


const WATCH = ['css', 'js'];

const initWatch = (taskName) => {
	const {config, run} = require(`../${taskName}/`);
	const dispName = `watch/${taskName}`;
	const task = {[dispName]: () => run()};

	gulp.watch(config.src, task[dispName]);
};

module.exports.build = false;

module.exports.config = {};

module.exports.desc = () => {
	const list = WATCH.join(', ');

	return `watch for updated files in tasks: [${list}]`;
};

module.exports.run = () => WATCH.forEach(initWatch);
