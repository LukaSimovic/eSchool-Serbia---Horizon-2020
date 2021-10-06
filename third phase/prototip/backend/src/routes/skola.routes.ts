import express from 'express'
import { SkolaController } from '../controllers/skola.controller';
const skolaRuter=express.Router();

skolaRuter.route('/dohvatiSkole').get(
    (req,res)=>new SkolaController().dohvatiSkole(req,res)
);

skolaRuter.route('/zakaziRoditeljski').post(
    (req,res)=>new SkolaController().zakaziRoditeljski(req,res)
);


export default skolaRuter;