import { Canon } from './canon';


export interface Seeded {
	head:string,
	val:any,
};

export type Laid = (HTMLElement | HTMLElement[]);

export interface Seeder {
	(canon?:Canon): Promise<Seeded>;
};

export interface Layer {
	(seedData:Seeded, canon?:Canon): Promise<Laid>;
};

export interface Hatcher {
	(controls:Laid, canon?:Canon): any;
};
