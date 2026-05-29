import * as tasks from './gulp/index.js';

const {
	css,
	js,
	manifest,
	bundle,
	help,
	watch,
	build,
} = tasks.listAll();

export {
	css,
	js,
	manifest,
	bundle,
	help,
	help as default,
	watch,
	build,
};
