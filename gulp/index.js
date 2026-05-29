import { task as css } from './css.js';
import { task as js } from './js.js';
import { task as manifest } from './manifest.js';
import { task as bundle } from './bundle.js';
import { init as watchInit } from './watch.js';
import { init as buildInit } from './build.js';
import { init as helpInit } from './help.js';


const listAllTasks = () => {
	const explicit = { css, js, manifest, bundle, };
	const watch = watchInit(explicit);
	const build = buildInit(explicit);
	const help = helpInit(Object.assign({}, explicit, { watch, build, }));

	return Object.assign({}, explicit, { watch, build, help, });
}

export {
	listAllTasks as listAll,
};
