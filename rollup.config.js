import typescript from '@rollup/plugin-typescript';
import jsonImport from '@rollup/plugin-json';
// import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'src/js/index.ts',
	output: {
		// dir: 'build',
		file: 'build.safariextension/yu.dereader.js',
		format: 'iife',
	},
	plugins: [
		// resolve(),
		typescript({
			lib: ['DOM', 'ES2017'],
			target: 'ES6'
		}),
		jsonImport(),
		terser(),
	],
	// external: ['tslib'],
};