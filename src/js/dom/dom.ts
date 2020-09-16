interface DomQuery {
	(sel: string, parent: HTMLElement | Document): null | HTMLElement
};

interface EventListener {
	on: (eventName: string, eventHandler: Function) => any,
};

/**
 * Create `HTMLElement` w/ specified tag name, classes & attrs
**/
const create = (
	tagName: string,
	options: object = {}
): HTMLElement => {
	const elm = document.createElement(tagName);

	for (const entry of Object.entries(options)) {
		const [key, val] = entry;

		switch (key) {
		case 'textContent':
		case 'text':
			elm.textContent = val;
			break;
		case 'classList':
		case 'class':
			for (const cls of [].concat(val)) {
				elm.classList.add(cls);
			}

			break;
		case 'innerHTML':
		case 'html':
			elm.innerHTML = val;
			break;
		default:
			elm.setAttribute(key, val);
		}
	}

	return elm;
};


/**
 * List elements matching `xPath`
**/
const evalAll = (xPath: string): XPathResult => {
	return document.evaluate(xPath, document, null, 0);
};


/**
 * Get first element matching `xPath`
**/
const evalOne = (xPath: string): Node => {
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
	sel: string,
	context: HTMLElement | Document = document
): HTMLElement | null => {
	return context.querySelector(sel);
};


/**
 * Wrap `context.querySelectorAll()`
 */
const all = (
	sel: string,
	context: HTMLElement | Document = document
): HTMLElement[] => {
	return Array.from(context.querySelectorAll(sel));
}


/**
 * Wrap `dom.query` for meta
**/
const meta = (property: string): HTMLMetaElement => {
	return <HTMLMetaElement> query(`meta[property="${property}"]`);
};


export {
	create,
	evalOne as eval,
	listen,
	meta,
	query,
	all,
};
