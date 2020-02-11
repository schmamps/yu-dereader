const gulp = require('gulp');
const peditor = require('gulp-plist');
const {config, loadJSON} = require('../util');

const cfg = config({
	in: 'Info.plist',
	sub: 'meta',
});

const getUpdater = (pkg) => {
	return peditor({
		CFBundleDisplayName: pkg.description,
		CFBundleShortVersionString: pkg.version,
	});
};

const runPipe = (update) => {
	const dest = gulp.dest(cfg.dest);

	return gulp.
		src(cfg.src).
		pipe(update).
		pipe(dest);
};

module.exports.build = true;

module.exports.config = cfg;

module.exports.desc = () => 'update Safari extension plist';

module.exports.run = () => {
	return loadJSON().
		then(getUpdater).
		then(runPipe);
};
