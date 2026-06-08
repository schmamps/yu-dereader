import * as fs from 'fs'
import * as path from './path/index.js';
import * as build from './build/index.js';
import * as json from './json/index.js';
import * as log from './log/index.js';
import * as meta from './metadata/index.js';

const DEFAULTS = { server: { host: 'localhost', port: 4242, }, };

const abstract = meta.abstract({ in: 'manifest.json', sub: 'meta', });
const description = meta.describe('update the Chrome extension manifest');

const err = (err) => {
	log.error(err, 'manifest task');
};

const reduceEnv = (env, kv) => {
	const [keySpec, val] = kv;

	if (!keySpec.includes('flask_run')) {
		return env;
	}

	return Object.assign(env, { [keySpec.substr(-4)]: val });
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

const getDevSettings = (pkg, manif) => {
	const version = '0.' + pkg.version.replace(/\./g, '');
	const { content_scripts } = manif;
	const { host, port } = getTestServer();

	for (const proto of ['http', 'https']) {
		content_scripts[0].matches.push(`${proto}://${host}:${port}/*`);
	}

	return { version, content_scripts };
}

const getProdSettings = (pkg, manif) => {
	const version = pkg.version;
	const { content_scripts } = manif;

	return { version, content_scripts };
}

const getBuildSettings = (pkg, manif, prod) => {
	if (prod) {
		return getProdSettings(pkg, manif);
	}

	return getDevSettings(pkg, manif);
};

const loadSrc = async (cfg) => {
	return json.load(cfg.src[0]);
}

const loadPkg = async () => {
	return json.load('package.json');
}

const isProd = async (cfg) => {
	return cfg.prod;
}

const update = (dataSources) => {
	const [manif, pkg, prod] = dataSources;
	const name = pkg.description;
	const { version, content_scripts: cs } = getBuildSettings(pkg, manif, prod);

	return Object.assign(
		{},
		manif,
		{ name, version, content_scripts: cs });
};

const write = (data, cfg) => {
	const fullPath = path.join(cfg.dir, cfg.in);
	const contents = json.stringify(data);
	const writeToDisk = () => fs.promises.writeFile(fullPath, contents);

	return fs.
		promises.
		mkdir(cfg.dir, { recursive: true }).
		then(writeToDisk)
		;
};

const run = async () => {
	const cfg = build.configure(abstract);
	const writeManifest = (manifest) => write(manifest, cfg);

	return await Promise.
		all([loadSrc(cfg), loadPkg(), isProd(cfg)]).
		then(update).
		then(writeManifest).
		catch(err)
		;
};

const task = Object.assign(run, { abstract, description, });

export { task };
