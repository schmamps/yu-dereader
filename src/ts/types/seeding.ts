interface Canon {
	id: number,
	src: string,
	element: HTMLImageElement,
};

type Overlay = {
	title: string,
	src: string,
	param: string,
	position: string,
};

type OverlayCollection = Map<string, Overlay[]>;

export { Canon, Overlay, OverlayCollection };

