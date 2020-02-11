const colors = require('ansi-colors');
const fs = require('fs');
const gulp = require('gulp');
const log = require('fancy-log');


const PACKAGE = `${__dirname}/../package.json`;

const loadModule = (mods, key) => {
	mods[key] = require(`./${key}/`);

	return mods;
};

const addBuildTask = (taskName, mod) => {
	const dispName = `build/${taskName}`;
	const task = {[dispName]: () => mod.run()};

	return task[dispName];
};

const createBuildModule = (mods) => {
	const tasks = Object.
		keys(mods).
		filter((key) => mods[key].build || false).
		map((taskName) => addBuildTask(taskName, mods[taskName]))
	;

	const config = {};
	const desc = () => 'run all build tasks';
	const run = gulp.parallel(tasks);

	return {config, desc, run,};
};

module.exports.colors = colors;

module.exports.config = (opts) => {
	const {in: input = [], sub, out: output = false} = opts;
	const src = [].concat(input).map((file) => `./src/${sub}/${file}`);
	const dest = './build.safariextension/';
	const desc = (Array.isArray(input)) ? `${input[0]}...` : input;
	const out = (output) ? output : input;

	return Object.assign({}, opts, {src, dest, desc, out});
};

module.exports.describe = (src, ...elements) => (
	[src].concat(elements).join(' > ')
);

module.exports.loadJSON = (path = PACKAGE) => {
	return fs.
		promises.
		readFile(path).
		then(JSON.parse);
};

module.exports.loadModules = () => {
	const mods = fs.
		readdirSync(__dirname).
		filter((fName) => fName.match(/^\w+$/)).
		sort().
		reduce(loadModule, {});
	const build = createBuildModule(mods);

	return Object.assign(mods, {build});
};

module.exports.log = log;

module.exports.PACKAGE = PACKAGE;

module.exports.reportError = function(err) {
	log(err);
	this.emit('end');  // eslint-disable-line no-invalid-this
};
