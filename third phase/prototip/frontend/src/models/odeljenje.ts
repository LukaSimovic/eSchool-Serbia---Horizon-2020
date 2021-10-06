import { DnevniRaspored } from "./dnevniRaspored";
import { Roditeljski } from "./roditeljski";

export class Odeljenje{
    naziv:string;
    predmeti:string[];
    raspored:DnevniRaspored[];
    roditeljski:Roditeljski;
}