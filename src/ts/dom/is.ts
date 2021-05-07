/**
 * Curry basic type checking function
 */
const isType = (typeStr:string) => (val:any) => typeof(val) === typeStr;
const isString = isType('string');
const isObject = isType('object');

/**
 * Test `val` for HTMLElement type
 */
const isElement = (val:any) => val?.tagName ?? false;

/**
 * Test `val` for HTMLElement type
 */
const isChild = (val:any) => isObject(val) && isElement(val);

/**
 * Test `val` for generic Object type
 */
const isPropList = (val:any) => isObject(val) && !isElement(val);

export {
	isString as string,
	isChild as child,
	isPropList as propList,
};
