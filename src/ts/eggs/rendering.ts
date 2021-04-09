import { EggLayer } from '../display';
import * as dom from '../dom';
import { EggData } from './types';


const NAME = 'Pixelated';
const KEY = 'rendering'

/**
 * Create toggling element
 */
const createToggler = (): HTMLInputElement => {
	const input = <HTMLInputElement>dom.
		create('input', {type: 'checkbox', name: KEY});
	const label = dom.create('label', {text: 'pixelated'});

	input.appendChild(label)

	return input;
}

/**
 * Get rendering toggle element
 */
const getToggler = (): HTMLInputElement => {
	return <HTMLInputElement>dom.query(`input[name=${KEY}]`);
}

/**
 * Get pixelated state
**/
const getValue = (): Promise<EggData> => {
	const prom = new Promise((resolve) => {
		chrome.storage.local.get([KEY], (value: any) => {
			const head = NAME;
			const val = !!(value[KEY] ?? false);

			resolve({head, val});
		});
	});

	return <Promise<EggData>>prom;
};

/**
 * Set pixelated rendering state of comic
 */
const setValue = (pixelated: boolean): Promise<boolean> => {
	const prom = new Promise((resolve) => {
		chrome.storage.local.set({[KEY]: pixelated}, () => {
			resolve(pixelated);
		});
	});

	return <Promise<boolean>>prom;
}

export {
	getValue as get,
	setValue as set,
	createToggler,
	getToggler,
	NAME as name,
	KEY as key,
};
