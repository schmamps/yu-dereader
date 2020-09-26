const fs = require('fs');
const path = require('../../lib/path');


const loadModule = (mods, modName, root) => {
	mods[modName] = require(path.join(root, modName));

	return mods;
};

const list = (path) => {
	return fs.
		readdirSync(path).
		filter((fName) => fName.match(/^\w+$/)).
		sort().
		reduce((mods, modName) => loadModule(mods, modName, path), {})
	;
};

module.exports = {
	list,
};
