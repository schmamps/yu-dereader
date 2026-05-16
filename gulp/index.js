import * as css from './css.js';
import * as js from './js.js';
import * as manifest from './manifest.js';
import * as watchTaskMod from './watch.js';
import * as buildTaskMod from './build.js';
import * as helpTaskMod from './help.js';


const loadAllExplicitTasks = () => {
	return { css, js, manifest, };
};

const loadAllMetaTasks = (explicit) => {
	const watch = watchTaskMod.init(explicit);
	const build = buildTaskMod.init(explicit);
	const help = helpTaskMod.init(Object.assign({}, explicit, { watch, build, }));

	return { watch, build, help };
};

const listRunners = (explicit, meta) => {
	const taskNames = Object.keys(explicit).concat(Object.keys(meta));
	const compose = (runners, taskName) => {
		runners[taskName] = (explicit[taskName] || meta[taskName]).run;

		return runners;
	};

	return taskNames.reduce(compose, { default: meta.help.run, });
};

export {
	loadAllExplicitTasks as loadExplicit,
	loadAllMetaTasks as loadMeta,
	listRunners
};
