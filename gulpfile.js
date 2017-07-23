const gulp = require('gulp');
const uglifyES = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyES, console);
const file = require('fs');
const peditor = require('gulp-plist');
const util = require('gulp-util');
const sass = require('gulp-sass');

const DIR = {src: 'src/', build: 'build.safariextension/',};
const DATA = {package: require('./package.json'),};

const reportError = function(err) {
	util.log(err);
	this.emit('end');
};

const describe = (src, ...elements) => (
	[DIR.src + src.toString()].concat(elements).join(' > ')
);

const tasks = {};
tasks.js = {
	in: 'angola.js',

	desc: () => describe(
		tasks.js.in,
		'uglify',
		DIR.build
	),

	config: {
		mangle: false,
		output: {beautify: true,},
		compress: {
			// drop_debugger: false,  // eslint-disable-line camelcase
		},
	},

	run: () => (gulp.
		src(DIR.src + tasks.js.in).
		pipe(uglify(tasks.js.config)).
		on('error', reportError).
		pipe(gulp.dest(DIR.build))
	),
};

tasks.css = {
	in: 'maldives.sass',

	desc: () => describe(
		tasks.css.in,
		'scss',
		DIR.build
	),

	run: () => (gulp.
		src(DIR.src + tasks.css.in).
		pipe(sass()).
		pipe(gulp.dest(DIR.build))
	),
};

tasks.manifest = {
	in: 'manifest.json',
	out: 'manifest.json',

	err: (err) => {
		if (!err) { return; }

		console.log(`manifest task error: ${err}`);
	},

	desc: () => 'update the Chrome extension manifest',

	update: (base) => {
		const {description: name, version} = DATA.package;

		return Object.assign({}, base, {name, version});
	},


	write: (data) => file.writeFileSync(
		DIR.build + tasks.manifest.out,
		JSON.stringify(data)
	),

	run: () => {
		const path = DIR.src + tasks.manifest.in;

		Promise.
			resolve(file.readFileSync(path)).
			then(JSON.parse).
			then(tasks.manifest.update).
			then(tasks.manifest.write).
			catch(tasks.manifest.err);

		return true;
	},
};

tasks.plist = {
	in: [DIR.src + 'Info.plist'],

	desc: () => 'update the Safari extension plist',

	run: () => {
		const CFBundleDisplayName = DATA.package.description;
		const CFBundleShortVersionString = DATA.package.version;

		return gulp.
			src(tasks.plist.in).
			pipe(peditor({CFBundleDisplayName, CFBundleShortVersionString})).
			pipe(gulp.dest(DIR.build));
	}
};

tasks.watch = {
	names: ['js', 'css'],

	desc: () => {
		const list = tasks.watch.names.map((task) => `'${task}'`).join(', ');

		return `check for updated files in tasks: ${list}`;
	},

	getArray: (val) => (Array.isArray(val)) ? val : [val],

	getPath: (file) => DIR.src + file,

	getFiles: (key) => (tasks.watch.
		getArray(tasks[key].in).
		map(tasks.watch.getPath)
	),

	init: (name) => {
		const files = tasks.watch.getFiles(name);

		gulp.watch(files, [name]);
	},

	run: () => tasks.watch.names.map(tasks.watch.init),
};

const help = {
	indent: 4,

	space: () => ('\n' + ' '.repeat(help.indent)),

	menuWidth: (max, entry) => {
		const splitter = help.space();
		const desc = entry.split(splitter).pop();

		return Math.max(desc.length + help.indent, max);
	},

	entry: (pad) => (task) => {
		const [name, desc] = task;

		return `• ${name.padEnd(pad)} - ${desc}`;
	},

	entries: (tasks) => {
		const keys = Object.keys(tasks);
		const pad = keys.reduce((max, key) => Math.max(max, key.length), 0);

		return keys.
			map((key) => [key, tasks[key].desc()]).
			map(help.entry(pad));
	},

	head: (ents) => {
		const pad = ents.reduce((max, line) => Math.max(max, line.length), 0);
		const title = 'Task Menu'.padEnd(pad);

		return util.colors.bold(util.colors.underline(title));
	},

	display: (entries) => {
		const lines = ['', help.head(entries), ...entries, ''];

		util.log(lines.join('\n'));
	},

	menu: (tasks) => () => {
		const entries = help.entries(tasks);

		help.display(entries);
	},
};

Object.keys(tasks).map((name) => gulp.task(name, tasks[name].run));
gulp.task('default', help.menu(tasks));

