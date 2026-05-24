import * as c from 'ansi-colors';
import * as log from 'fancy-log';
import * as build from './build/index.js';
import * as meta from './metadata/index.js';


const getEntry = (pad) => (task) => {
	return `* ${task.name.padEnd(pad)} - ${task.desc}`;
};

const listEntries = async (tasks) => {
	const keys = Object.keys(tasks);
	const pad = keys.reduce((max, key) => Math.max(max, key.length), 0);
	const describe = (name) => {
		const desc = tasks[name].description;

		return { name, desc };
	}

	return keys.map((name) => ({ name, desc: tasks[name].description })).
		map(getEntry(pad));
};

const getHeader = (ents) => {
	const pad = ents.reduce((max, line) => Math.max(max, line.length), 0);
	const title = [
		'Task Menu',
		`(${build.configure().dev ? 'dev' : 'prod'}:`,
		`NODE_ENV='${process.env.NODE_ENV}')`
	].join(' ');


	return `\x1b[1;4m${title.padEnd(pad)}\x1b[0m`;
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
		then(log.info);
};

const init = (modules) => {
	const abstract = {};
	const description = meta.describe('display help menu');
	const run = async () => {
		return await listEntries(modules).then(displayEntries);
	};

	const task = Object.assign(run, { abstract, description, });

	return task;
};

export {
	init,
};
