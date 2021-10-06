import { Predmet } from "./predmet";

export class Korisnik{
    ime:string;
    un_roditelja:string;
    un_deteta:string;
    prezime:string;
    username:string;
    lozinka:string;
    tip:string;
    email:string;
    accepted:number;
    slika:string;
    mesto:string;
    drzava:string;
    skola:string;
    odeljenje:string;
    spisak_ocena:Predmet[];
    predmeti:string[];
    razredni:string;
    svaOdeljenjaUSkoli:string[];
    sviPredmetiUSkoli:string[];
}