const gulp = require('gulp');
const describe = require('./meta/describe');


const addBuildTask = (taskName, mod, modMethod) => {
	const dispName = `build/${taskName}`;
	const task = {[dispName]: () => mod[modMethod]()};

	return task[dispName];
};

const deriveBuild = (declaredMods, nonMeta) => {
	const tasks = nonMeta.map((taskName) => addBuildTask(
		taskName,
		declaredMods[taskName],
		'run'
	));

	const abstract = {};
	const desc = describe('run all build tasks in default mode');

	return {abstract, desc, run: gulp.parallel(tasks)};
};

const list = (declaredMods) => {
	const nonMeta = Object.
		keys(declaredMods).
		filter((taskName) => !declaredMods[taskName].isMeta).
		sort()
	;

	const derived = {
		build: deriveBuild(declaredMods, nonMeta)
	};

	return derived;
};

module.exports = {
	list,
};
