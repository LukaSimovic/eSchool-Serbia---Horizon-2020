import { Poruka } from "./poruka";
export class Konverzacija{
    id:number;
    osoba1:string;
    osoba2:string;
    poruke:Poruka[];
    neprocitano_osoba1:number;
    neprocitano_osoba2:number;
}