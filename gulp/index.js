const help = require('./help');
const util = require('./util');


const addTask = (...args) => {
	const [taskName, taskModule] = args.flat();

	module.exports[taskName] = taskModule.run;
};

const modules = util.loadModules();
Object.entries(modules).forEach(addTask);
module.exports.default = help.menu(modules);
