const util = require('./util');


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
	const title = 'Task Menu'.padEnd(pad);

	return util.colors.bold(util.colors.underline(title));
};

const display = (entries) => Promise.
	resolve(['', getHeader(entries), ...entries, '']).
	then((lines) => lines.join('\n')).
	then(util.log)
;

module.exports.menu = (tasks) => () => Promise.
	resolve(tasks).
	then(listEntries).
	then(display)
;
