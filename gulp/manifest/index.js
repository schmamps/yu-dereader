const file = require('fs').promises;
const {config, loadJSON,} = require('../util');

const cfg = config({in: 'manifest.json', sub: 'meta',});

const err = (err) => {
	if (!err) { return; }

	console.log(`manifest task error: ${err}`);
};

const update = (manifestAndPkg) => {
	const [manif, pkg] = manifestAndPkg;
	const {description: name, version} = pkg;

	return Object.assign({}, manif, {name, version});
};

const write = (data) => {
	const path = cfg.dest + cfg.out;
	const json = JSON.stringify(data, {}, '\t');

	return file.writeFile(path, json);
};

module.exports.build = true;

module.exports.config = {};

module.exports.desc = () => 'update the Chrome extension manifest';

module.exports.run = () => {
	const manif = cfg.src[0];

	return Promise.
		all([loadJSON(manif), loadJSON()]).
		then(update).
		then(write).
		catch(err);
};
