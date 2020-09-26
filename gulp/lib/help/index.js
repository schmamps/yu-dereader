const colors = require('ansi-colors');
const log = require('fancy-log');
const describe = require('../task/meta/describe');
const build = require('../build');


const getEntry = (pad) => (task) => {
	return `• ${task.name.padEnd(pad)} - ${task.desc}`;
};

const listEntries = (tasks) => {
	const keys = Object.keys(tasks);
	const pad = keys.reduce((max, key) => Math.max(max, key.length), 0);

	return keys.
		map((name) => ({name, desc: tasks[name].desc()})).
		map(getEntry(pad));
};

const getHeader = (ents) => {
	const pad = ents.reduce((max, line) => Math.max(max, line.length), 0);
	const title = [
		'Task Menu',
		`(${build.configure().dev ? 'dev' : 'prod'}:`,
		`NODE_ENV='${process.env.NODE_ENV}')`
	].join(' ');

	return colors.bold(colors.underline(title.padEnd(pad)));
};

const displayEntries = (entries) => {
	return Promise.
		resolve([
			'',
			getHeader(entries),
			...entries,
			'',
		]).
		then((lines) => lines.join('\n')).
		then(log);
};

const desc = describe('display help menu');

const menu = (modules) => () => {
	return Promise.
		resolve(modules).
		then(listEntries).
		then(displayEntries);
}
;

module.exports = {
	config: {},
	desc,
	menu,
};
