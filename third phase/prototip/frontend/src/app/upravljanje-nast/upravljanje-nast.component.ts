import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Skola } from 'src/models/skola';
import { KorisnikService } from '../korisnik.service';
import { SkolaService } from '../skola.service';

@Component({
  selector: 'app-upravljanje-nast',
  templateUrl: './upravljanje-nast.component.html',
  styleUrls: ['./upravljanje-nast.component.css']
})
export class UpravljanjeNastComponent implements OnInit {

  constructor(private ruter:Router,
    private korisnServis:KorisnikService,
    private skolaServis:SkolaService) { }


  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  sviNastavnici:Korisnik[];
  sveSkole:Skola[];

  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika

    this.korisnServis.dohvatiNastavnike().subscribe((data:Korisnik[])=>{
      this.sviNastavnici=data;

      this.skolaServis.dohvatiSkole().subscribe((data2:Skola[])=>{
        this.sveSkole = data2;

        for(let n=0; n<this.sviNastavnici.length; n++){
          this.sviNastavnici[n].sviPredmetiUSkoli = [];
          this.sviNastavnici[n].sviPredmetiUSkoli.push("Izaberi predmet:");
          this.sviNastavnici[n].svaOdeljenjaUSkoli = [];
          this.sviNastavnici[n].svaOdeljenjaUSkoli.push("Izaberi odeljenje:");

          for(let i=0; i<this.sveSkole.length; i++){
            if(this.sveSkole[i].ime==this.sviNastavnici[n].skola){ //nasao skolu

              for(let j=0; j<this.sveSkole[i].odeljenja.length; j++){
                this.sviNastavnici[n].svaOdeljenjaUSkoli.push(this.sveSkole[i].odeljenja[j].naziv); //dodaj odeljenje
  
                for(let k=0; k<this.sveSkole[i].odeljenja[j].predmeti.length; k++){
                  this.sviNastavnici[n].sviPredmetiUSkoli.push(this.sveSkole[i].odeljenja[j].predmeti[k]);
                }
              }
            }
          }

        }

        
      })
    })
  }

  odeljenje:string;
  predmet:string;
  message:string;

  dodeli(un){
    this.korisnServis.dodeliOdeljenjeNastavniku(un,this.odeljenje).subscribe(resp=>{
      if(resp['message']=='OK'){
        this.message = "Odeljenje uspesno dodeljeno nastavniku"
        this.korisnServis.dohvatiNastavnike().subscribe((data:Korisnik[])=>{
          this.sviNastavnici=data;
    
          this.skolaServis.dohvatiSkole().subscribe((data2:Skola[])=>{
            this.sveSkole = data2;
    
            for(let n=0; n<this.sviNastavnici.length; n++){
              this.sviNastavnici[n].sviPredmetiUSkoli = [];
              this.sviNastavnici[n].sviPredmetiUSkoli.push("Izaberi predmet:");
              this.sviNastavnici[n].svaOdeljenjaUSkoli = [];
              this.sviNastavnici[n].svaOdeljenjaUSkoli.push("Izaberi odeljenje:");
    
              for(let i=0; i<this.sveSkole.length; i++){
                if(this.sveSkole[i].ime==this.sviNastavnici[n].skola){ //nasao skolu
    
                  for(let j=0; j<this.sveSkole[i].odeljenja.length; j++){
                    this.sviNastavnici[n].svaOdeljenjaUSkoli.push(this.sveSkole[i].odeljenja[j].naziv); //dodaj odeljenje
      
                    for(let k=0; k<this.sveSkole[i].odeljenja[j].predmeti.length; k++){
                      this.sviNastavnici[n].sviPredmetiUSkoli.push(this.sveSkole[i].odeljenja[j].predmeti[k]);
                    }
                  }
                }
              }
    
            }
    
            
          })
        })
      }else{
        this.message = "GRESKA PRI DODELJIVANJU ODELJENJA NASTAVNIKU"
      }
    })
  }

  dodajPredmet(un){
    this.korisnServis.dodajPredmetNastavniku(un,this.predmet).subscribe(resp=>{
      if(resp['message']=='OK'){
        this.message = "Predmet uspesno dodat nastavniku"
        this.korisnServis.dohvatiNastavnike().subscribe((data:Korisnik[])=>{
          this.sviNastavnici=data;
    
          this.skolaServis.dohvatiSkole().subscribe((data2:Skola[])=>{
            this.sveSkole = data2;
    
            for(let n=0; n<this.sviNastavnici.length; n++){
              this.sviNastavnici[n].sviPredmetiUSkoli = [];
              this.sviNastavnici[n].sviPredmetiUSkoli.push("Izaberi predmet:");
              this.sviNastavnici[n].svaOdeljenjaUSkoli = [];
              this.sviNastavnici[n].svaOdeljenjaUSkoli.push("Izaberi odeljenje:");
    
              for(let i=0; i<this.sveSkole.length; i++){
                if(this.sveSkole[i].ime==this.sviNastavnici[n].skola){ //nasao skolu
    
                  for(let j=0; j<this.sveSkole[i].odeljenja.length; j++){
                    this.sviNastavnici[n].svaOdeljenjaUSkoli.push(this.sveSkole[i].odeljenja[j].naziv); //dodaj odeljenje
      
                    for(let k=0; k<this.sveSkole[i].odeljenja[j].predmeti.length; k++){
                      this.sviNastavnici[n].sviPredmetiUSkoli.push(this.sveSkole[i].odeljenja[j].predmeti[k]);
                    }
                  }
                }
              }
    
            }
    
            
          })
        })
      }else{
        this.message = "GRESKA PRI DODAVANJU PREDMETA NASTAVNIKU"
      }
    })
  }


  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

}
