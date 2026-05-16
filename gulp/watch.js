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
				const abstract = explicit[taskName].abstract;
				const run = explicit[taskName].run;

				gulp.watch(abstract.src, () => run());
			});
		},
	};
};

export {
	init,
};
