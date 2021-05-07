const typescript = require('@rollup/plugin-typescript');
const jsonImport = require('@rollup/plugin-json');


module.exports = {
	input: 'src/ts/index.ts',
	output: {
		file: 'build/dev/yu.js',
		format: 'iife',
	},
	plugins: [
		typescript({
			lib: ['DOM', 'ES2017', 'ES2019.Array'],
			target: 'ES6'
		}),
		jsonImport(),
	],
};
