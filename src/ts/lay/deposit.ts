// import * as dom from '../dom';

// interface EggDeposit {
// 	head: string,
// 	val: HTMLElement,
// };

// /**
//  * Wrap encoded `textContent` in a SPAN element
//  * @param textContent
//  */
// const createTextSpan = (textContent: string): HTMLSpanElement => {
// 	const element = <HTMLSpanElement>dom.create('span');

// 	element.textContent = textContent;

// 	return element;
// }

// /**
//  * Convert `contentVal` to element if necessary
// **/
// const elementize = (contentVal: HTMLElement | string): HTMLElement => {
// 	const notStr = (typeof (contentVal) !== 'string');

// 	return (notStr) ? contentVal : createTextSpan(contentVal);
// };

// /**
//  * Append heading and value to nest
//  */
// const depositEgg = (head: string, ...elements: Element[]) => {
// 	// tr > td[colspan=3] > div > h2, $val
// 	const row = dom.create(
// 		'tr',
// 		{ class: 'egg' },
// 		dom.create(
// 			'td',
// 			{ colspan: 3 },
// 			dom.create(
// 				'div',
// 				[dom.create('h2', head)].concat(elements)
// 			)
// 		)
// 	);

// 	const parent = dom.query('center table tbody');

// 	if (parent) {
// 		parent.appendChild(row);
// 	}

// 	return row;
// }

// export {
// 	depositEgg as deposit
// };

