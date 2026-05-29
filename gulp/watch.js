import * as gulp from 'gulp';
import * as meta from './metadata/index.js';


const init = (explicit) => {
	const IGNORE = ['manifest', 'bundler'];
	const WATCH = Object.
		keys(explicit).
		filter((key) => !IGNORE.includes(key));
	const abstract = {};
	const description = meta.describe(
		`watch for updated files in tasks [${WATCH.join(', ')}]`
	);
	const run = async () => {
		WATCH.forEach((taskName) => {
			const { src, } = explicit[taskName].abstract;
			const watch = {
				[taskName]: async () => explicit[taskName].run,
			}

			gulp.watch(src, watch[taskName]);
		});
	};

	const task = Object.assign(run, { abstract, description, });

	return task
};

export {
	init,
};
