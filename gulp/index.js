const helpModule = require('./lib/help');
const taskModules = require('./lib/task/modules').load(`${__dirname}/tasks`);

Object.keys(taskModules).map(String).sort().forEach((tName) => {
	// add `[module].run` as gulp task named '[module]'
	module.exports[tName] = taskModules[tName].run;
});

// add help menu task
module.exports.default = helpModule.menu(taskModules);
