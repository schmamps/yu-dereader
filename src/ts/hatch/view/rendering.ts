import { PIXELATED } from '../../consts';
import * as dom from '../../dom';
import * as rendering from '../../rendering';

/**
 * Handle rendering change
**/
const onChange = (
	renderCtl:HTMLInputElement,
	comic:HTMLImageElement
) => (
	e:InputEvent
) => {
	const toggleClass = (add) => {
		if (add) {
			comic.classList.add(PIXELATED);
		}
		else {
			comic.classList.remove(PIXELATED);
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
		on('change', onChange(renderCtl, comic));
};

export {
	hatchRendering as hatch,
};
