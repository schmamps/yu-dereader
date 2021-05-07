import { Canon } from "../canon";

export type EggLayer = (head:string, value:any, canon?: Canon) => void;
