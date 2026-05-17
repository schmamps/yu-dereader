import * as build from './build/index.js';
import * as meta from './metadata/index.js';
import * as path from 'path';

import * as gulp from 'gulp';
import * as rollup from 'rollup';
import rollupTypescript from '@rollup/plugin-typescript';
import rollupJson from '@rollup/plugin-json';

const abstract = meta.abstract({
	in: ['**/*.ts'],
	sub: 'ts',
	out: 'yu.js',
});

const desc = meta.describe(abstract.desc, 'transpile', abstract.out);

const run = () => {
	const cfg = build.configure(abstract);

	const result = rollup.
		rollup({
			input: path.resolve('src/ts', 'index.ts'),
			plugins: [
				rollupTypescript({
					tsconfig: path.resolve('./tsconfig.json'),
				}),
				rollupJson(),
			],
		}).
		then((bundle) => bundle.write({
			file: path.resolve(cfg.dir, cfg.out),
			format: 'iife',
			sourcemap: cfg.dev,
		}));

	return result;
};

export {
	abstract,
	desc,
	run,
};
