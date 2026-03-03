import * as dom from '../dom';

/**
 * Wrap encoded `textContent` in a SPAN element
 * @param textContent
 */
const createTextSpan = (textContent: string): HTMLSpanElement => {
	const element = dom.create('span');

	element.textContent = textContent;

	return element;
}

/**
 * Convert `contentVal` to element if necessary
**/
const elementize = (contentVal:HTMLElement|string):HTMLElement => {
	const notStr = (typeof(contentVal) !== 'string');

	return (notStr) ? contentVal : createTextSpan(contentVal);
};

/**
 * Append heading and value to nest
 */
const depositEgg = ({head, val}) => {
	// tr > td[colspan=3] > div > h2, $val
	const row = dom.create(
		'tr',
		{class: 'egg'},
		dom.create(
			'td',
			{colspan: 3},
			dom.create(
				'div',
				[dom.create('h2', head), elementize(val)]
			)
		)
	);

	dom.query('center table tbody').appendChild(row);
}

export {
	depositEgg as deposit
};

