import * as gulp from 'gulp';
import * as path from 'path';
import * as build from './build/index.js';
import * as meta from './metadata/index.js';
import * as rollup from 'rollup';
import rollupTypescript from '@rollup/plugin-typescript';
import rollupJson from '@rollup/plugin-json';

const abstract = meta.abstract({
	in: ['**/*.ts'],
	sub: 'ts',
	out: 'yu.js',
});

const description = meta.describe(abstract.desc, 'transpile', abstract.out);

const run = async () => {
	const cfg = build.configure(abstract);

	return await rollup.
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

const task = Object.assign(run, { abstract, description });

export { task };
