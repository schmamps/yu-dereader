const split = (path) => path.split(/[\\\/]+/g);

const basename = (path) => split(path).pop();

const parent = (path) => split(path).slice(0, -1).join('/');

const join = (...args) => {
	return [].
		concat(args).
		join('/').
		replace(/\/+/g, '/');
};


module.exports = {
	split,
	basename,
	parent,
	join,
};
