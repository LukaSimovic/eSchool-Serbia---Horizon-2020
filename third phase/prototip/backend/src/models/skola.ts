import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Skola=new Schema({
    ime:{type:String},
    grad:{type:String},
    odeljenja:{type:Array}
});
export default mongoose.model('Skola',Skola,'skole');