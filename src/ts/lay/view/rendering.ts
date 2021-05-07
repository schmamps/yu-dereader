import * as dom from '../../dom';

/**
 * Create selector label
**/
const createLabel = () => {
	const label = dom.create('span', 'Pixelated', {class: 'pixel'});

	return <HTMLSpanElement>label;
};

/**
 * Create rendering selector
**/
const createControl = (
	checked:boolean
) => {
	const control = dom.create('input', {type: 'checkbox', checked});

	return <HTMLInputElement>control;
};

export {
	createLabel as label,
	createControl as control,
};
