import { NOT_FOUND } from '../consts';
import * as dom from '../dom';

/**
 * Get HREF of contact link
 * @returns Promise<string>
 */
const getSubjectHref = async (): Promise<string> => {
	const href = (
		dom.query('.topnav a[href^=mailto]')?.getAttribute('href')
	) ?? '';

	return href;
}

/**
 * Get subject in contact link
 * @returns Promise<string>
 */
const getContactSubject = async (): Promise<string> => {
	const subject = getSubjectHref().
		then((href) => new URL(href).searchParams.get('subject') ?? NOT_FOUND).
		catch(() => NOT_FOUND);

	return subject;
}

export { getContactSubject as get };

