const ansiColors = require('ansi-colors');
const fancyLog = require('fancy-log');


const logError = (msg, subject = false) => {
	const args = [
		(subject) ? ansiColors.bold(`${subject}:`) : false,
		msg,
	].filter((arg) => !!arg);

	fancyLog.error(...args);
};

module.exports = {
	error: logError,
};
