/**
 * Get HiDPI status
 * @returns Promise<boolean>
 */
const getHiDPI = async (): Promise<boolean> => {
	const hidpi = (window.devicePixelRatio > 1);

	return hidpi;
}

export { getHiDPI as get };
