import { UNPIXEL } from '../../consts';
import * as dom from '../../dom';
import * as rendering from '../../rendering';

/**
 * Handle rendering change
**/
const onChange = (
	comic:HTMLImageElement
) => (
	e:InputEvent
) => {
	const toggleClass = (checked) => {
		if (checked) {
			comic.classList.remove(UNPIXEL);
		}
		else {
			comic.classList.add(UNPIXEL);
		}
	}

	rendering.
		set((<HTMLInputElement>e.currentTarget).checked).
		then(toggleClass);
};

/**
 * Initialize rendering interactivity
**/
const hatchRendering = (
	renderCtl:HTMLInputElement,
	comic:HTMLImageElement
) => {
	dom.
		listen(renderCtl).
		on('change', onChange(comic));

	if (!renderCtl.checked) {
		comic.classList.add(UNPIXEL);
	}
};

export {
	hatchRendering as hatch,
};
