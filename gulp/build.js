import * as meta from './metadata/index.js';

const init = (explicit) => {
	return {
		run: () => {
			return Promise.all(
				Object.keys(explicit).map((taskName) => explicit[taskName].run())
			);
		},
		desc: meta.describe('run all tasks'),
		abstract: {}
	};
}

export {
	init,
};
