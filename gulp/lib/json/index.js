const fs = require('fs');


const load = (path) => {
	return fs.
		promises.
		readFile(path).
		then(JSON.parse);
};

const stringify = (data) => {
	return JSON.stringify(data, {}, '\t')
};

module.exports = {
	load,
	stringify,
};
