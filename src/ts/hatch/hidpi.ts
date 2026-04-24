import * as dom from "../dom";

const hatchHiDPI = async (style: HTMLStyleElement) => {
	dom.query('head')?.appendChild(style);
}

export { hatchHiDPI as hatch };
