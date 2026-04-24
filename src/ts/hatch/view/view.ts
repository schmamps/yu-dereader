// import { Canon } from '../../canon';
// import * as overlays from './overlays';
// import * as rendering from './rendering';


// /**
//  * Make view controls interactive
// **/
// const hatchView = (
// 	[overCtl, renderCtl]:[HTMLSelectElement, HTMLInputElement],
// 	canon:Canon
// ) => {
// 	overlays.hatch(canon, overCtl);
// 	rendering.hatch(renderCtl, canon.element);
// };

// export {
// 	hatchView as hatch,
// };

// const pixelated = (window.devicePixelRatio > 1);
const style = 'tr > td:nth-child(2) > img { image-rendering: pixelated }';
