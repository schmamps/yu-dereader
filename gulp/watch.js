import * as meta from './metadata/index.js';
import * as gulp from 'gulp';


const init = (explicit) => {
	const WATCH = Object.keys(explicit).filter((key) => key != 'manifest');

	return {
		abstract: {},
		desc: meta.describe(
			`watch for updated files in tasks [${WATCH.join(', ')}]`
		),
		run: async () => {
			WATCH.forEach((taskName) => {
				const { src, } = explicit[taskName].abstract;
				const watch = {
					[taskName]: async () => explicit[taskName].run,
				}

				gulp.watch(src, watch[taskName]);
			});
		},
	};
};

export {
	init,
};
