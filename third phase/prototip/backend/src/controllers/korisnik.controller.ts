import express from 'express';
import Skola from '../models/skola';
import Korisnik from '../models/korisnik'
export class KorisnikController{
    prijava=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let lozinka=req.body.lozinka;
        let tip=req.body.tip;
        Korisnik.findOne({
            'username':username,
            'lozinka':lozinka,
            'tip':tip,
            'accepted':1
        },(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
    svi=(req:express.Request,res:express.Response)=>{
        Korisnik.find({ },(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    dohvatiRoditelje=(req:express.Request,res:express.Response)=>{
        Korisnik.find({'tip':"roditelj", "accepted":1 },(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
    dohvatiNastavnike=(req:express.Request,res:express.Response)=>{
        Korisnik.find({'tip':"nastavnik", "accepted":1 },(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    dohvatiKorPoUN=(req:express.Request,res:express.Response)=>{
        let username = req.body.username;
        Korisnik.findOne({'username':username },(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    dohvatiUcenPoOdeljenju=(req:express.Request,res:express.Response)=>{
        let odeljenje = req.body.odeljenje;
        Korisnik.find({'odeljenje':odeljenje, 'tip':'učenik','accepted':1},(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    dodeliOdeljenjeNastavniku=(req:express.Request,res:express.Response)=>{
        let username= req.body.username
        let odeljenje = req.body.odeljenje;
        Korisnik.collection.updateOne({'username':username },{$set:{ 'razredni':odeljenje}},(err,user)=>{
            if(err)  res.json({'message':err});
            else res.json({'message':'OK'});
        })
    }
    
    dodajPredmetNastavniku=(req:express.Request,res:express.Response)=>{
        let username= req.body.username
        let predmet = req.body.predmet;
        Korisnik.collection.updateOne({'username':username },{$push:{'predmeti':predmet}},(err,user)=>{
            if(err)  res.json({'message':err});
            else res.json({'message':'OK'});
        })
    }

    upisiOcenu=(req:express.Request,res:express.Response)=>{
        let username= req.body.username
        let predmet = req.body.predmet
        let ocena = req.body.ocena;
       
        Korisnik.collection.updateOne({'username':username, 'spisak_ocena.naziv': predmet},{$push:{'spisak_ocena.$.ocene':ocena}},(err,user)=>{
            if(err)  console.log(err);
            else res.json({'message':'OK'});
        })
    }

    zakljuciOcenu=(req:express.Request,res:express.Response)=>{
        let username= req.body.username
        let predmet = req.body.predmet
        let zakljocena = req.body.zakljocena;
       
        Korisnik.collection.updateOne({'username':username ,'spisak_ocena.naziv': predmet},{$set:{'spisak_ocena.$.zakljucna_ocena':zakljocena}},(err,user)=>{
            if(err)  console.log(err);
            else res.json({'message':'OK'});
        })
    }
    
   

    registracija=(req:express.Request,res:express.Response)=>{
        let kor = new Korisnik(req.body)
        kor.save().then(kor=>{
            res.json({'message':'OK'});
        }).catch(err=>{
            res.json({'message':err});
        });
    }

    zahtevi=(req:express.Request,res:express.Response)=>{
        Korisnik.find({
            'accepted':0
        },(err,users)=>{
            if(err) console.log(err);
            else res.json(users);
        })
    }

    odbij=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        Korisnik.remove({'username':username},(err)=>{
            if(err) console.log(err);
            else res.json({'delete':true})
        })
    }
    prihvati=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        Korisnik.updateOne({'username':username},
        {
        $set:{ 
            'accepted':1
          }
        },(err)=>{
            if(err)console.log(err)
            else res.json({'update':true})
        })
    }
    izmeni=(req:express.Request,res:express.Response)=>{
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let username=req.body.username;
        let lozinka=req.body.lozinka;
        let email=req.body.email;
        let mesto=req.body.mesto;
        let drzava=req.body.drzava;
        let slika=req.body.slika
        Korisnik.updateOne({'username':username},
        {
        $set:{ 
            "ime" : ime,
            "prezime" : prezime,
            "username" : username,
            "lozinka" : lozinka,
            "email" : email,
            "slika" : slika,
            "mesto" : mesto,
            "drzava":drzava
          }
        },(err)=>{
            if(err)console.log(err)
            else res.json({'update':true})
        })
    }

    dohvatiKorisnikaPoUsername=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        Korisnik.findOne({
            'username':username,
            'accepted':1
        },(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
    dohvatiOdeljenje=(req:express.Request,res:express.Response)=>{
        let odeljenje=req.body.odeljenje
        let skola=req.body.skola

        Korisnik.find({
            'odeljenje':odeljenje,
            'skola':skola,
            'tip':'učenik',
            'accepted':1
        },(err,ucenici)=>{
            if(err) console.log(err);
            else res.json(ucenici);
        })
    }
}