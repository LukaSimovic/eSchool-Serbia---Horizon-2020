import express from 'express'
import { KonverzijaController } from '../controllers/konverzija.controller';
const konverzacijaRuter=express.Router();
konverzacijaRuter.route('/mojeKonverzacije').post(
    (req,res)=>new KonverzijaController().mojeKonverzacije(req,res)
);
konverzacijaRuter.route('/posaljiPoruku').post(
    (req,res)=>new KonverzijaController().posaljiPoruku(req,res)
);
konverzacijaRuter.route('/dohvatiPorukeOsoba1Osoba2').post(
    (req,res)=>new KonverzijaController().dohvatiPorukeOsoba1Osoba2(req,res)
);
konverzacijaRuter.route('/proveraPostojanaKonverzacije').post(
    (req,res)=>new KonverzijaController().proveraPostojanaKonverzacije(req,res)
);
konverzacijaRuter.route('/napraviNovuKonverzaciju').post(
    (req,res)=>new KonverzijaController().napraviNovuKonverzaciju(req,res)
);
export default konverzacijaRuter;