import { Canon } from '../../canon';
import * as dom from '../../dom';
import { Laid, Seeded } from '../../egg';
import { OverlayCollection } from '../../view';
import { deposit } from '../nest';
import * as overlays from './overlays';
import * as rendering from './rendering';


/**
 * Bundle view elements into single element
**/
const wrap = (
	head:string,
	spans:HTMLElement[],
	controls:HTMLElement[]
) => {
	const val = dom.create('div');

	for (let i = 0; i < spans.length; i++) {
		const label = dom.create('label', controls[i], spans[i]);

		val.appendChild(label);
	}

	deposit({head, val});
};

/**
 * Display view
**/
const display = (
	{head, val}:Seeded,
	canon:Canon
):Promise<Laid> => {
	const [overs, pixelated] = <[OverlayCollection, boolean]>val;

	return Promise.
		all([
			overlays.control(overs, canon.src),
			rendering.control(pixelated),
			overlays.label(),
			rendering.label(),
		]).
		then((elms) => {
			const [oC, rC, oL, rL,] = elms;

			wrap(head, [oL, rL], [oC, rC]);

			return [oC, rC];
		});
};

export {
	display,
};
