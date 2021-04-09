import * as dom from '../dom';

const nest = dom.query('center table tbody');


/**
 * Convert `contentVal` to element if necessary
**/
const elementize = (contentVal: HTMLElement | string):HTMLElement => {
	if (typeof(contentVal) !== 'string') {
		return contentVal;
	}

	return dom.create('span', {text: contentVal});
};


const depositEgg = (head: string, content: HTMLElement | string) => {
	const row = <HTMLTableRowElement>dom.create('tr', {class: 'egg'});
	const col = <HTMLTableCellElement>dom.create('td', {colspan: 3});
	const wrap = <HTMLDivElement>dom.create('div');
	const header = <HTMLHeadElement>dom.create('h2', {text: head});

	wrap.appendChild(header);
	wrap.appendChild(elementize(content));
	col.appendChild(wrap);
	row.appendChild(col);
	nest.appendChild(row);
}

export {
	depositEgg as deposit,
};
