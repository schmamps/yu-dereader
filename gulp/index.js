const help = require('./lib/help');
const modules = require('./lib/task/modules');


const taskMods = modules.load(`${__dirname}/tasks`);

for (const entry of Object.entries(taskMods)) {
	const [taskName, taskMod] = entry;

	module.exports[taskName] = taskMod.run;
}

module.exports.default = help.menu(taskMods);
