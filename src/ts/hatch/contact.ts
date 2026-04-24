import * as dom from "../dom";

/**
 * Render Contact joke
 * @param span
 * @returns
 */
const hatchContact = async (span: HTMLSpanElement) => {
	dom.deposit('Contact', span);
}

export { hatchContact as hatch };
