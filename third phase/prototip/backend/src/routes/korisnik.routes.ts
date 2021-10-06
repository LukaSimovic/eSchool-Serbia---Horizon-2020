import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';
const korisnikRuter=express.Router();
korisnikRuter.route('/prijava').post(
    (req,res)=>new KorisnikController().prijava(req,res)
);
korisnikRuter.route('/dohvati').get(
    (req,res)=>new KorisnikController().svi(req,res)
);

korisnikRuter.route('/dohvatiRoditelje').get(
    (req,res)=>new KorisnikController().dohvatiRoditelje(req,res)
);
korisnikRuter.route('/dohvatiNastavnike').get(
    (req,res)=>new KorisnikController().dohvatiNastavnike(req,res)
);

korisnikRuter.route('/dohvatiKorPoUN').post(
    (req,res)=>new KorisnikController().dohvatiKorPoUN(req,res)
);
korisnikRuter.route('/dohvatiUcenPoOdeljenju').post(
    (req,res)=>new KorisnikController().dohvatiUcenPoOdeljenju(req,res)
);
korisnikRuter.route('/dodeliOdeljenjeNastavniku').post(
    (req,res)=>new KorisnikController().dodeliOdeljenjeNastavniku(req,res)
);

korisnikRuter.route('/upisiOcenu').post(
    (req,res)=>new KorisnikController().upisiOcenu(req,res)
);

korisnikRuter.route('/zakljuciOcenu').post(
    (req,res)=>new KorisnikController().zakljuciOcenu(req,res)
);

korisnikRuter.route('/dodajPredmetNastavniku').post(
    (req,res)=>new KorisnikController().dodajPredmetNastavniku(req,res)
);
korisnikRuter.route('/registracija').post(
    (req,res)=>new KorisnikController().registracija(req,res)
);
korisnikRuter.route('/zahtevi').get(
    (req,res)=>new KorisnikController().zahtevi(req,res)
);
korisnikRuter.route('/odbij').post(
    (req,res)=>new KorisnikController().odbij(req,res)
);
korisnikRuter.route('/prihvati').post(
    (req,res)=>new KorisnikController().prihvati(req,res)
);
korisnikRuter.route('/izmeni').post(
    (req,res)=>new KorisnikController().izmeni(req,res)
);

korisnikRuter.route('/dohvatiKorisnikaPoUsername').post(
    (req,res)=>new KorisnikController().dohvatiKorisnikaPoUsername(req,res)
);

korisnikRuter.route('/dohvatiOdeljenje').post(
    (req,res)=>new KorisnikController().dohvatiOdeljenje(req,res)
);
export default korisnikRuter;