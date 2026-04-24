import { Canon } from './seed';

export const error = (category: string, canon: Canon) => {
    return (e: Error) => {
        console.group('Yu Dereader Error');
        console.log(`error in category '${category}'`);
        console.dir(e);
        console.dir(canon);
        console.groupEnd();
    }
}
