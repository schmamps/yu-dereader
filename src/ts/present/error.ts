export const error = (desc) => async function error(e) {
	console.group(desc);
	console.error(e);
	console.groupEnd();
};
