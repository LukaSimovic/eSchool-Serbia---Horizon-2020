import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Konverzacije=new Schema({
    poruke:{type:Array},
    osoba1:{type:String},
    osoba2:{type:String},
    neprocitano_osoba1:{type:Number},
    neprocitano_osoba2:{type:Number},
    id:{type:Number}
});
export default mongoose.model('Konverzacije',Konverzacije,'konverzacije');