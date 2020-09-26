const gulp = require('gulp');
const meta = require('../../lib/task/meta');


const WATCH = ['css', 'js'];

const abstract = {};
const desc = meta.describe(
	`watch for updated files in tasks [${WATCH.join(', ')}]`
);

const initWatch = (taskName) => {
	const {abstract, run} = require(`../${taskName}/`);
	const dispName = `watch/${taskName}`;
	const task = {[dispName]: () => run()};

	gulp.watch(abstract.src, task[dispName]);
};

const run = () => WATCH.forEach(initWatch);


module.exports = {
	isMeta: true,
	abstract,
	desc,
	run,
};
