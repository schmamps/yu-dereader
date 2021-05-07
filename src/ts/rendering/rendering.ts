

const KEY = 'rendering'

/**
 * Get pixelated state
**/
const getValue = () => {
	const prom = new Promise<boolean>((resolve) => {
		chrome.storage.local.get([KEY], (value:any) => {
			resolve(!!(value[KEY] ?? false));
		});
	});

	return prom;
};

/**
 * Set pixelated rendering state of comic
 */
const setValue = (pixelated:boolean) => {
	const prom = new Promise<boolean>((resolve) => {
		chrome.storage.local.set({[KEY]: pixelated}, () => {
			resolve(pixelated);
		});
	});

	return prom;
};

export {
	getValue as get,
	setValue as set,
};
