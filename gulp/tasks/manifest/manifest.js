const fs = require('fs');
const build = require('../../lib/build');
const json = require('../../lib/json');
const log = require('../../lib/log');
const path = require('../../lib/path');
const meta = require('../../lib/task/meta');

const DEFAULTS = {server: {host: 'localhost', port: 4242,},};

const abstract = meta.abstract({in: 'manifest.json', sub: 'meta',});
const desc = meta.describe('update the Chrome extension manifest');

const err = (err) => {
	log.error(err, 'manifest task');
};

const reduceEnv = (env, kv) => {
	const [keySpec, val] = kv;

	if (!keySpec.includes('flask_run')) {
		return env;
	}

	return Object.assign(env, {[keySpec.substr(-4)]: val});
};

const parseEnv = (content) => {
	let env = content.
		split(/[\r\n]+/).
		filter((line) => line.includes('=')).
		map((line) => line.split('=')).
		map((pair) => pair.map((item) => item.toLowerCase().trim())).
		reduce(reduceEnv, {})
	;

	return Object.assign({}, DEFAULTS.server, env);
};

const getTestServer = () => {
	const envPath = path.join(path.ROOT, 'anqwtz', '.flaskenv');

	try {
		const envData = fs.readFileSync(envPath, 'utf-8');

		return parseEnv(envData);
	}
	catch (_) {
		console.info('Flask environment not found, using defaults');

		return DEFAULTS.server;
	}
};

const getBuildSettings = (pkg, manif, prod) => {
	if (prod) {
		return {
			// eslint-disable-next-line camelcase
			content_scripts: manif.content_scripts,
			version: pkg.version,
		};
	}

	const version = ['0'].
		concat(pkg.version.split('.')).
		slice(0, 3).
		join('.');
	const {host, port} = getTestServer();
	for (const proto of ['http', 'https']) {
		manif.content_scripts[0].matches.push(`${proto}://${host}:${port}/*`);
	}

	// eslint-disable-next-line camelcase
	return {version, content_scripts: manif.content_scripts};
};

const getIcons = (manif, prod) => {
	if (!prod) {
		return manif.icons;
	}

	return {
		'128': manif.web_accessible_resources[0].resources[0],
	};
};

const update = (dataSources) => {
	const [manif, pkg, prod] = dataSources;
	const name = pkg.description;
	const {version, content_scripts: cs} = getBuildSettings(pkg, manif, prod);
	const icons = getIcons(manif, prod);

	return Object.assign(
		{},
		manif,
		// eslint-disable-next-line camelcase
		{name, version, content_scripts: cs, icons});
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
