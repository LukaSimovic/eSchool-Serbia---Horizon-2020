import express from 'express';
import Skola from '../models/skola';
export class SkolaController{
  
    dohvatiSkole=(req:express.Request,res:express.Response)=>{
        Skola.find({ },(err,school)=>{
            if(err) console.log(err);
            else res.json(school);
        })
    }

    zakaziRoditeljski=(req:express.Request,res:express.Response)=>{
        let skola = req.body.skola;
        let odeljenje = req.body.odeljenje;
        let roditeljski = req.body.roditeljski;

        Skola.collection.updateOne({'ime':skola, 'odeljenja.naziv':odeljenje },{$set:{'odeljenja.$.roditeljski':roditeljski}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'OK'});
        })
    }

  
}