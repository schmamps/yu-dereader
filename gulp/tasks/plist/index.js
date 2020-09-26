const gulp = require('gulp');
const peditor = require('gulp-plist3');
const build = require('../../lib/build');
const json = require('../../lib/json');
const meta = require('../../lib/task/meta');


const abstract = meta.abstract({
	in: 'Info.plist',
	sub: 'meta',
});

const desc = meta.describe('update Safari extension plist');

const getUpdater = (pkg, prod) => {
	const CFBundleDisplayName = pkg.description;
	const CFBundleShortVersionString = prod ? pkg.version : '0.0.1';

	return peditor({CFBundleDisplayName, CFBundleShortVersionString});
};

const runPipe = (update, cfg) => {
	return gulp.
		src(cfg.src).
		pipe(update).
		pipe(cfg.dest)
	;
};

const run = () => {
	const cfg = build.configure(abstract);
	const update = (pkgData) => getUpdater(pkgData, cfg.prod);
	const pipe = (pkgData) => runPipe(pkgData, cfg);

	return Promise.
		resolve('package.json').
		then(json.load).
		then(update).
		then(pipe)
	;
};

module.exports = {
	abstract,
	desc,
	run,
};
