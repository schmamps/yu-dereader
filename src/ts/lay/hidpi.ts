import * as dom from '../dom';

const pixelate = (hidpi: boolean) => {
	if (!hidpi) return '';

	return `
tr > td:nth-child(2) > img {
	image-rendering: pixelated
}
	`.trim();
}

const generateStyle = async (hidpi: boolean) => {
	const style = <HTMLStyleElement>dom.create(
		'style',
		{ textContent: pixelate(hidpi) }
	);

	return style;
}

export { generateStyle as lay };

