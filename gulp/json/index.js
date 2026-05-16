import * as fs from 'fs';


const load = (path) => {
	return fs.
		promises.
		readFile(path).
		then(JSON.parse);
};

const stringify = (data) => {
	return JSON.stringify(data, {}, '\t')
};

export { load, stringify };
