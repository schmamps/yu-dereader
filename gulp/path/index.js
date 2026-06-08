import * as fs from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const isProjectDir = (path) => {
	return fs.existsSync(`${path}/package.json`);
}

const getProjectDir = () => {
	let pd = dirname(fileURLToPath(import.meta.url));

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

const ROOT = getProjectDir();


export {
	ROOT,
	join,
	resolve,
};
