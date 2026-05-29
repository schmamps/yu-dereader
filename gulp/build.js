import * as meta from './metadata/index.js';

const init = (explicit) => {
	const abstract = {};
	const description = meta.describe('run all tasks');
	const run = async () => {
		await Promise.all(Object.
			keys(explicit).
			filter((key) => key !== 'bundle').
			map((taskName) => explicit[taskName]())
		);

		return await explicit.bundle();
	};

	const task = Object.assign(run, { abstract, description, });

	return task;
}

export {
	init,
};
