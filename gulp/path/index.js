import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const isProjectDir = (path) => {
	return fs.existsSync(`${path}/package.json`);
}

const getProjectDir = () => {
	let pd = path.dirname(fileURLToPath(import.meta.url));

	while (!isProjectDir(pd)) {
		pd = fs.realpathSync([pd, '..'].join('/'));
	}

	return pd;
}

const joinDirs = (...args) => {
	return args.
		concat().
		join('/').
		replace(/\/+/g, '/');
}

const split = (path) => path.split(/[\\\/]+/g);
const basename = (path) => split(path).pop();
const parent = (path) => split(path).slice(0, -1).join('/');
const resolve = (...args) => {
	console.group('resolve');
	console.dir(args);
	console.groupEnd();

	return 1 / 0;
}
const ROOT = getProjectDir();


export {
	split,
	basename,
	parent,
	joinDirs as join,
	resolve,
	ROOT,
};
