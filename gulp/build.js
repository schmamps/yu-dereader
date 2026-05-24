import * as meta from './metadata/index.js';

const init = (explicit) => {
	const abstract = {};
	const description = meta.describe('run all tasks');
	const run = async () => {
		return await Promise.all([
			Object.keys(explicit).map((taskName) => explicit[taskName]()),
		]);
	};

	const task = Object.assign(run, { abstract, description, });

	return task;
}

export {
	init,
};
