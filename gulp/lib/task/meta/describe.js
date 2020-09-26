module.exports = (src, ...elements) => {
	return () => [src].concat(elements).join(' > ');
};
