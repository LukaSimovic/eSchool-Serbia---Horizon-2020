import express from 'express';
import Konverzija from '../models/konverzacija';
export class KonverzijaController{
    mojeKonverzacije=(req:express.Request,res:express.Response)=>{
        let username=req.body.username
        Konverzija.find({$or:[{'osoba1':username}, {'osoba2':username}]},
        (err,konverzacije)=>{
            if(err) console.log(err);
            else res.json(konverzacije);
        })
    } 
    posaljiPoruku=(req:express.Request,res:express.Response)=>{
        let poruka=req.body.poruka;
        let osoba1=req.body.osoba1;
        let osoba2=req.body.osoba2;
        Konverzija.collection.updateOne({'osoba1':osoba1, 'osoba2':osoba2},
        {$push:{'poruke':poruka}},(err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'});
        })
    }  
    dohvatiPorukeOsoba1Osoba2=(req:express.Request,res:express.Response)=>{
        let osoba1=req.body.osoba1;
        let osoba2=req.body.osoba2;
        Konverzija.findOne({$and:[{'osoba1':osoba1}, {'osoba2':osoba2}]},
        (err,konverzacije)=>{
            if(err) console.log(err);
            else res.json(konverzacije);
        })
    } 
    proveraPostojanaKonverzacije=(req:express.Request,res:express.Response)=>{
        let osoba1=req.body.osoba1;
        let osoba2=req.body.osoba2;
        Konverzija.findOne( {$or: [
        { $and: [{'osoba1':osoba1}, {'osoba2':osoba2}] },
        { $and:[{'osoba1':osoba2}, {'osoba2':osoba1}]}
        ]},
        (err,konverzacije)=>{
            if(err) console.log(err);
            else res.json(konverzacije);
        })
    } 

    napraviNovuKonverzaciju=(req:express.Request,res:express.Response)=>{
        let konv = new Konverzija(req.body);
        konv.save().then(resp=>{
            res.json({'message':'ok'})
        }).catch(err=>{
            console.log(err);
        });
    } 
}