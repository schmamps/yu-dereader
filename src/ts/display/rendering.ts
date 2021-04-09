import * as comic from '../comic';
import * as dom from '../dom';
import { deposit } from './nest';
import * as rendering from '../eggs/rendering';


const ID = 'pixelated-rendering';

/**
 * Set pixel rendering
**/
const setRender = (pixelated: boolean):void => {
	const CLASS_NAME = 'pixel';

	if (pixelated) {
		comic.element.classList.add(CLASS_NAME)
	}
	else {
		comic.element.classList.remove(CLASS_NAME);
	}
};

/**
 * Handle rendering change
**/
const onRenderingChange = (e: Event): void => {
	e.preventDefault();

	const pixelated = (<HTMLInputElement>e.target).checked;

	rendering.set(pixelated).then(setRender);
};

/**
 * Get rendering checkbox
 */
const getInput = (pixelated: boolean): HTMLInputElement => {
	const input = <HTMLInputElement>dom.create('input', {type: 'checkbox', id: ID});

	input.checked = pixelated;
	input.addEventListener('change', onRenderingChange);

	return input;
}

/**
 * Display toggle and set style
 */
const displayRendering = (head: string, pixelated: boolean) => {
	const content = dom.create('label');
	const labelText = dom.create('span', {text: 'pixelated'});
	const input = getInput(pixelated);

	content.appendChild(labelText);
	content.appendChild(input);

	setRender(pixelated);
	deposit(head, content);
};

export {
	displayRendering as display,
};
