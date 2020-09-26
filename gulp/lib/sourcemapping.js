const noop = require('gulp-noop')();
const sourcemaps = require('gulp-sourcemaps');


const set = (init = {}, write = '.') => {
	const test = (testValue, testEquals = true) => {
		if (testValue === testEquals) {
			return {
				init: sourcemaps.init(init),
				write: sourcemaps.write(write),
			};
		}

		return {init: noop, write: noop};
	};

	return {if: test};
};

module.exports = {
	set,
};
