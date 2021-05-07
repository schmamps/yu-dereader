import * as is from './is';

interface DomQuery {
	(sel:string, parent: HTMLElement | Document): null | HTMLElement
};

interface EventListener {
	on: (eventName:string, eventHandler:Function) => any,
};

interface ElementParameters {
	attrs: object,
	dataset: object,
	classList: string[],
	html: string,
	children: HTMLElement[],
};

/**
 * Test `keyName` as valid attribute
**/
const isAttrKey = (keyName:string):boolean => {
	return ![
		'innerHTML',
		'className',
		'classList',
		'textContent',
		'dataset',
		'checked',
	].includes(keyName);
};

/**
 * Get pared-down element attribute object
**/
const attrify = (
	optSpec:Record<string, any>
):Record<string, any> => {
	const attrs = <Record<string, any>>{};

	for (const key of Object.keys(optSpec).filter(isAttrKey)) {
		attrs[key] = optSpec[key].toString();
	}

	if (optSpec.checked) {
		attrs.checked = true;
	}

	return attrs;
};

/**
 * Get classList from 1: `classSpec` or 2: `listSpec`
**/
const classify = (
	classSpec:string,
	listSpec:string[]
):string[] => {
	const cList = classSpec ? classSpec.split(' ') : (listSpec ?? []);

	return cList.
		map((cName) => cName.trim()).
		filter((cName) => cName.length > 0);
};


/**
 * Parse rest arguments for `create()`
**/
const parseCreateArgs = (
	args:any[]
):ElementParameters => {
	const flat = args.flat(Infinity);
	const children = flat.filter(is.child);
	const prop = flat.
		filter(is.propList).
		reduce((all, one) => Object.assign(all, one), {})
	const html = flat.filter(is.string).join(' ') ||
			(prop.innerHTML ?? prop.textContent ?? '')

	const dataset = prop.dataset ?? {}
	const classList = classify(prop.class ?? '', prop.classList ?? []);

	return {attrs: attrify(prop), html, classList, dataset, children};
};

/**
 * Create `HTMLElement` w/ specified tag name, classes & attrs
 * @param {string} tagName - name of element
 * @param {any[]} args - type dependent, combined left to right:
 * 	Array: 'flattened' into individual args: [1, [2, 3], 4] -> [1, 2, 3, 4]
 * 	object: element attributes
 * 	string: textContent of element (precedence over text/HTML attributes)
 * 	HTMLElement: child of created element
**/
const create = (
	tagName:string,
	...args:any[]
): HTMLElement => {
	const elm = document.createElement(tagName);
	const {html, classList, children, dataset, attrs} = parseCreateArgs(args);

	elm.innerHTML = html;
	classList.forEach((className) => elm.classList.add(className));
	children.forEach((child) => elm.appendChild(child));
	Object.entries(dataset).forEach(([key, val]) => elm.dataset[key] = val);
	Object.entries(attrs).forEach(([key, val]) => elm.setAttribute(key, val));

	return elm;
};

/**
 * List elements matching `xPath`
**/
const evalAll = (xPath:string): XPathResult => {
	return document.evaluate(xPath, document, null, 0);
};

/**
 * Get first element matching `xPath`
**/
const evalOne = (xPath:string): Node => {
	const all = evalAll(xPath);

	return all.iterateNext();
};

/**
 *  Chain addEventListener to `context`
**/
const listen = (context: HTMLElement | Window): EventListener => {
	const on = (eventName, handler) => {
		context.addEventListener(eventName, handler);
	};

	return {on};
};

/**
 * Wrap `context.querySelector()`
**/
const query = (
	sel:string,
	context: HTMLElement | Document = document
): HTMLElement | null => {
	return context.querySelector(sel);
};

/**
 * Wrap `context.querySelectorAll()`
 */
const all = (
	sel:string,
	context: HTMLElement | Document = document
): HTMLElement[] => {
	return Array.from(context.querySelectorAll(sel));
}


/**
 * Wrap `dom.query` for meta
**/
const meta = (property:string): HTMLMetaElement => {
	return <HTMLMetaElement> query(`meta[property="${property}"]`);
};


/**
 * Get values of `sel:SelectElement` options
**/
const values = (sel:HTMLSelectElement):string[] => {
	return Array.
		from(sel.options).
		map((opt) => opt.value ?? '');
};

/**
 * Wrap `children` in a `tagName` element
**/
const wrap = (
	tagName:string,
	...children
):HTMLElement => {
	const parent = create(tagName);

	for (const child of children.flat(Infinity)) {
		parent.appendChild(<HTMLElement>child);
	}

	return parent;
};

export {
	create,
	evalOne as eval,
	listen,
	meta,
	query,
	all,
	values,
	wrap,
};
