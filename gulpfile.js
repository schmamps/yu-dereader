const gulp = require('gulp');
const uglifyES = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyES, console);
const file = require('fs');
const peditor = require('gulp-plist');
const util = {colors: require('ansi-colors'), log: require('fancy-log'),};
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemap = require('gulp-sourcemaps');

const config = (opts) => {
	const {in: input = [], sub, out: output = false} = opts;
	const src = [].concat(input).map((file) => `./src/${sub}/${file}`);
	const dest = './build.safariextension/';
	const desc = (Array.isArray(input)) ? `${input[0]}...` : input;
	const out = (output) ? output : input;

	return Object.assign({}, opts, {src, dest, desc, out});
};

const DATA = {package: require('./package.json'),};

const reportError = function(err) {
	util.log(err);
	this.emit('end');  // eslint-disable-line no-invalid-this
};

const describe = (src, ...elements) => (
	[src].concat(elements).join(' > ')
);

const tasks = {};
tasks.js = {
	config: () => config({
		in: [
			'core.js',
			'dom.js',
			'params.js',
			'comic.js',
			'request.js',
			'characters.js',
			'nest.js',
			'ui.js',
			'config.js',
			'init.js',
		],
		out: 'angola.js',
		sub: 'js',
		uglify: {
			mangle: false,
			output: {
				beautify: true,
			},
			compress: {
				drop_debugger: false,  // eslint-disable-line camelcase
			}
		},
	}),

	desc: () => {
		const cfg = tasks.js.config();

		return describe(
			cfg.desc,
			'concat',
			cfg.out,
			'uglify',
			cfg.dest
		);
	},

	run: () => {
		const cfg = tasks.js.config();
		const combine = concat(cfg.out);
		const initMap = sourcemap.init();
		const writeMap = sourcemap.write('.');
		const dest = gulp.dest(cfg.dest);
		const ugly = uglify(cfg.uglify).on('error', reportError);

		return gulp.
			src(cfg.src).
			pipe(initMap).
			pipe(combine).
			pipe(ugly).
			pipe(writeMap).
			pipe(dest);
	},
};

tasks.css = {
	config: () => config({
		in: 'maldives.sass',
		sub: 'css',
	}),

	desc: () => {
		const cfg = tasks.css.config();

		return describe(cfg.desc, 'scss', cfg.dest);
	},

	run: () => {
		const cfg = tasks.css.config();
		const initMap = sourcemap.init();
		const toCSS = sass();
		const writeMap = sourcemap.write('.');
		const dest = gulp.dest(cfg.dest);

		return gulp.
			src(cfg.src).
			pipe(initMap).
			pipe(toCSS).
			pipe(writeMap).
			pipe(dest);
	},
};

tasks.manifest = {
	config: () => config({
		in: 'manifest.json',
		sub: 'meta',
	}),

	err: (err) => {
		if (!err) { return; }

		console.log(`manifest task error: ${err}`);
	},

	desc: () => 'update the Chrome extension manifest',

	update: (base) => {
		const {description: name, version} = DATA.package;

		return Object.assign({}, base, {name, version});
	},

	write: (data) => {
		const cfg = tasks.manifest.config();

		file.writeFileSync(cfg.dest + cfg.out, JSON.stringify(data));
	},

	run: () => {
		const cfg = tasks.manifest.config();
		const path = cfg.src[0];

		return Promise.
			resolve(file.readFileSync(path)).
			then(JSON.parse).
			then(tasks.manifest.update).
			then(tasks.manifest.write).
			catch(tasks.manifest.err);
	},
};

tasks.plist = {
	config: () => config({
		in: 'Info.plist',
		sub: 'meta',
	}),

	desc: () => 'update the Safari extension plist',

	run: () => {
		const cfg = tasks.plist.config();
		const update = peditor({
			CFBundleDisplayName: DATA.package.description,
			CFBundleShortVersionString: DATA.package.version,});
		const dest = gulp.dest(cfg.dest);

		return gulp.src(cfg.src).pipe(update).pipe(dest);
	}
};

tasks.watch = {
	names: ['js', 'css'],

	desc: () => {
		const list = tasks.watch.names.map((task) => `'${task}'`).join(', ');

		return `check for updated files in tasks: ${list}`;
	},

	name: (name) => {
		const cfg = tasks[name].config();

		gulp.watch(cfg.src, gulp.series(name));
	},

	run: () => tasks.watch.names.map(tasks.watch.name),
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

		return Promise.resolve(help.display(entries));
	},
};

Object.
	keys(tasks).
	map((name) => gulp.task(name, tasks[name].run));
gulp.task('default', help.menu(tasks));
