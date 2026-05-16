import * as ansiColors from 'ansi-colors';
import * as fancyLog from 'fancy-log';


const logError = (msg, subject = false) => {
	const args = [
		(subject) ? ansiColors.bold(`${subject}:`) : false,
		msg,
	].filter((arg) => !!arg);

	fancyLog.error(...args);
};

export { logError as error };
