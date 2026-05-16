import * as tasker from './gulp/index.js';

const explicitTasks = tasker.loadExplicit();
const metaTasks = tasker.loadMeta(explicitTasks);
const allTasks = tasker.listRunners(explicitTasks, metaTasks);
const { css, js, manifest, help, watch, build } = allTasks;


export {
	css,
	js,
	manifest,
	help,
	help as default,
	watch,
	build,
};

// export default allTasks;
