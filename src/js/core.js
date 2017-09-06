'use strict';

const core = {  // eslint-disable-line no-unused-vars
	BIWRBR: 'butiwouldratherbereading',

	compose: (...funcs) => (value = null) => (
		funcs.reduce((val, fn) => fn(val), value)
	)
};
