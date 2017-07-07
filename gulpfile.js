const
	gulp = require('gulp'),
	uglifyES = require('uglify-es'),
	composer = require('gulp-uglify/composer'),
	uglify = composer(uglifyES, console),
	file = require('fs'),
	plst = require('gulp-plist'),
	util = require('gulp-util'),

	DIR = {src: 'src/', build: 'build.safariextension/',},
	pkgData = require('./package.json'),

	pipeJS = () => {
		const base = {mangle: false, output: {beautify: true,},};
		// eslint-disable-next-line camelcase
		const temp = {}; //{compress: {drop_debugger: false}};
		const opts = Object.assign(base, temp);
		const path = DIR.src + '*.js';
		const ugly = uglify(opts).on('error', util.log);

		return gulp.src(path).pipe(ugly).pipe(gulp.dest(DIR.build));
	},

	manifest = {
		read: () => {
			const path = DIR.src + 'manifest.json';
			const contents = file.readFileSync(path);

			return JSON.parse(contents);
		},

		write: () => {
			const manifestData = manifest.read();
			const outPath = DIR.build + 'manifest.json';

			manifestData.name = pkgData.description;
			manifestData.version = pkgData.version;
			file.writeFileSync(outPath, JSON.stringify(manifestData));
		}
	},

	pList = () => {
		const path = DIR.src + 'Info.plist';
		const data = {
			CFBundleDisplayName: pkgData.description,
			CFBundleShortVersionString: pkgData.version,
		};

		return gulp.src(path).pipe(plst(data)).pipe(gulp.dest(DIR.build));
	},

	watch = () => gulp.watch('src/contentscript.js', ['js']),

	help = {
		indent: 4,
		space: () => ('\n' + ' '.repeat(help.indent)),

		menuWidth: (max, entry) => {
			const splitter = help.space();
			const desc = entry.split(splitter).pop();

			return Math.max(desc.length + help.indent, max);
		},

		entry: (task) => {
			const [name, , desc] = task;

			return `• ${name}${help.space()}${desc}`;
		},

		entries: (tasks) => {
			const lines = tasks.map(help.entry);

			return lines;
		},

		head: (entries) => {
			const title = 'Task Menu';
			const width = entries.reduce(help.menuWidth, 0);
			const pad = ' '.repeat(width - title.length);

			return util.colors.bold(util.colors.underline(title + pad));
		},

		display: (entries) => {
			const lines = ['', help.head(entries), ...entries, ''];

			util.log(lines.join('\n'));
		},

		menu: (tasks) => () => {
			Promise.resolve(tasks).then(help.entries).then(help.display);
		},
	},

	init = {
		task: (taskSet) => {
			const [name, handler,] = taskSet;

			gulp.task(name, handler);
		},

		tasks: (tasks) => {
			const defaultTask = ['default', help.menu(tasks), 'show this menu'];

			tasks.map(init.task);
			init.task(defaultTask);
		},
	};

init.tasks([
	['js', pipeJS, 'process the content script with uglify'],
	['manifest', manifest.write, 'update the Chrome manifest'],
	['plist', pList, 'update the Safari plist'],
	['watch', watch, 'run \'js\' task when content script changes'],
]);
