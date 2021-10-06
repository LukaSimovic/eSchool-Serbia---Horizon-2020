import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Korisnik=new Schema({
    ime:{type:String},
    un_roditelja:{type:String},
    un_deteta:{type:String},
    prezime:{type:String},
    username:{type:String, unique: true},
    lozinka:{type:String},
    email:{type:String, unique: true},
    slika:{type:String},
    mesto:{type:String},
    drzava:{type:String},
    tip:{type:String},
    accepted:{type:Number},
    skola:{type:String},
    odeljenje:{type:String},
    spisak_ocena:{type:Array},
    predmeti:{type:Array},
    razredni:{type:String}
});
export default mongoose.model('Korisnik',Korisnik,'korisnici');