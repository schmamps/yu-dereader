import * as dom from '../dom';


/**
 * Initialize RSS content anchor
**/
const createPostAnchor = (name:string) => {
	const header = dom.query('#blogpostheader');
	const anchor = <HTMLAnchorElement>dom.create('a', {name});

	header.appendChild(anchor);
};

/**
 * Pad container height
**/
const padContainer = () => {
	const cont = dom.query('div#container');
	const footHt = cont.nextElementSibling.getBoundingClientRect().height;
	const fullHt = dom.query('html').getBoundingClientRect().height;
	const mHt = Math.max(cont.getBoundingClientRect().height, fullHt - footHt);

	cont.style.minHeight = `${mHt}px`;
};

/**
 * Get blogpost anchor element
**/
const getBlogAnchor = (hash:string) => {
	const name = hash.substr(1);

	return <HTMLAnchorElement>dom.query(`a[name=${name}]`);
};

/**
 * Get top of blogpost header
**/
const getBlogTop = (hash:string):number => {
	const anchor = getBlogAnchor(hash);

	return anchor.getBoundingClientRect().top;
};

/**
 * Handle RSS link click
**/
const onClick = (e:MouseEvent) => {
	e.preventDefault();

	const fudge = window.scrollY -6;
	const top = fudge + getBlogTop((<HTMLAnchorElement>e.currentTarget).hash);
	const behavior = 'smooth';

	window.scroll({top, behavior});
};

/**
 * Make RSS link interactive
 */
const hatchRSS = (link:HTMLAnchorElement) => {
	const anchorName = 'yu-dereader';

	createPostAnchor(anchorName);
	padContainer();
	link.setAttribute('href', `#${anchorName}`);
	dom.listen(link).on('click', onClick);
};

export {
	hatchRSS as hatch,
};
