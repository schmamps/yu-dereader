const fs = require('fs');
const build = require('../../lib/build');
const json = require('../../lib/json');
const log = require('../../lib/log');
const path = require('../../lib/path');
const meta = require('../../lib/task/meta');

const abstract = meta.abstract({in: 'manifest.json', sub: 'meta',});
const desc = meta.describe('update the Chrome extension manifest');


const err = (err) => {
	log.error(err, 'manifest task');
};

const update = (dataSources) => {
	const [manif, pkg, prod] = dataSources;
	const name = pkg.description;
	const version = (prod) ? pkg.version : '0.0.1';

	return Object.assign({}, manif, {name, version});
};

const write = (data, cfg) => {
	const fullPath = path.join(cfg.dir, cfg.in);
	const contents = json.stringify(data);
	const writeToDisk = () => fs.promises.writeFile(fullPath, contents);

	return fs.
		promises.
		mkdir(cfg.dir, {recursive: true}).
		then(writeToDisk)
	;
};

const run = () => {
	const cfg = build.configure(abstract);
	const writeManifest = (manifest) => write(manifest, cfg);

	return Promise.
		all([
			json.load(cfg.src[0]),
			json.load('package.json'),
			cfg.prod
		]).
		then(update).
		then(writeManifest).
		catch(err)
	;
};

module.exports = {
	abstract,
	desc,
	run,
};
