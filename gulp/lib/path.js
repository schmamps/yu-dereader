const fs = require('fs');

const split = (path) => path.split(/[\\\/]+/g);

const basename = (path) => split(path).pop();

const parent = (path) => split(path).slice(0, -1).join('/');

const join = (...args) => {
	return [].
		concat(args).
		join('/').
		replace(/\/+/g, '/');
};

let root = __dirname;
do {
	root = fs.realpathSync([root, '..'].join('/'));
	console.log(root);
} while (!Array.from(fs.readdirSync(root)).includes('package.json'));


module.exports = {
	split,
	basename,
	parent,
	join,
	ROOT: root,
};
