const explicit = require('./explicit');
const implicit = require('./implicit');
const derived = require('./derived');


const load = (path) => {
	const declaredTasks = Object.assign(implicit.list(path), explicit.list());
	const derivedTasks = derived.list(declaredTasks);

	return Object.assign(declaredTasks, derivedTasks);
};

module.exports = {
	load,
};
