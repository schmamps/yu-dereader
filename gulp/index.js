const EXPLICIT = ['css', 'js', 'manifest'].
	slice(0, 1);

import * as css from './css.js';
import * as js from './js.js';
import * as manifest from './manifest.js';
import * as watch from './watch.js';
import * as build from './build.js';
import * as help from './help.js';


const loadAllExplicitTasks = () => {
	return { css, js, manifest, };
};

const loadAllMetaTasks = (explicit) => {
	return {
		help: help.init(explicit),
		watch: watch.init(explicit),
		build: build.init(explicit),
	};
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
	listRunners,
	EXPLICIT,
};
