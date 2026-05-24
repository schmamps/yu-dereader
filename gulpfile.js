import * as tasks from './gulp/index.js';

const {
	css,
	js,
	manifest,
	help,
	watch,
	build
} = tasks.listAll();

export {
	css,
	js,
	manifest,
	help,
	help as default,
	watch,
	build,
};
