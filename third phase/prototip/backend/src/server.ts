import express from 'express';
import cors from 'cors';
import mongoose  from 'mongoose'
import bodyParser from 'body-parser';
import korisnikRuter from './routes/korisnik.routes';
import skolaRuter from './routes/skola.routes';
import multer from 'multer'; 
import konverzacijaRuter from './routes/konverzija.routes';
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../frontend/src/assets/korisnici');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})
const uploadMulter = multer({ storage: storage })
const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/projekat_usp');
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Uspesno konektovanje sa bazonm!');
});
const router=express.Router();
router.use('/korisnici',korisnikRuter)
router.use('/skole',skolaRuter)
router.use('/konverzacije',konverzacijaRuter)
app.post('/file', uploadMulter.single('file'), (req, res, next) => {
    console.log('Slika promenjena!')
})
app.use('/',router);
app.listen(4000, () => console.log(`Express server running on port 4000`));