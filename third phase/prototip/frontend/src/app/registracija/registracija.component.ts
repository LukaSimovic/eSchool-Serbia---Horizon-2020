import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Predmet } from 'src/models/predmet';
import { Skola } from 'src/models/skola';
import { KorisnikService } from '../korisnik.service';
import { SkolaService } from '../skola.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  tip:string;
  ime:string;
  ime_roditelja:string;
  prezime:string;
  username:string;
  lozinka:string;
  email:string;
  mesto:string;
  drzava:string;
  skole:Skola[];
  skola:string;
  odeljenja:string[]=[];
  odeljenje:string;
  message="";
  messageSuccess="";

  sviRoditelji:Korisnik[];

  constructor(private ruter:Router,private korisnikServis:KorisnikService,
    private skolaServis:SkolaService) { }

  
  ngOnInit(): void {
    this.skolaServis.dohvatiSkole().subscribe((skole:Skola[])=>{
      this.skole=skole;

      this.korisnikServis.dohvatiRoditelje().subscribe((data:Korisnik[])=>{
        this.sviRoditelji=data;
      })
    })
  }

  pocetna():void{
    this.ruter.navigate(['']);
  }
  prijava():void{
    this.ruter.navigate(['prijava'])
  }

  unosOdeljenja():void{
    this.odeljenja=[];
    for(let i=0; i<this.skole.length;i++){
      if(this.skola==this.skole[i].ime){
        for(let j=0;j<this.skole[i].odeljenja.length;j++){
          this.odeljenja.push(this.skole[i].odeljenja[j].naziv)
        }
        break;
      }
    }
  }

  promena(){
    this.ime="";
    this.ime_roditelja="";
    this.prezime="";
    this.username="";
    this.lozinka="";
    this.message="";
    this.messageSuccess="";
    this.mesto="";
    this.drzava="";
    this.skola="";
    this.odeljenje="";
    this.email="";
  }

  registracija(){
    if(this.ime=="" || this.ime==null || this.ime==undefined){
      this.message="Unesite ime!"
    }
    else if(this.tip=="učenik" && (this.ime_roditelja=="" || this.ime_roditelja==null || this.ime_roditelja==undefined)){
      this.message="Unesite ime jednog roditelja!"
    }
    else if(this.prezime=="" || this.prezime==null || this.prezime==undefined){
      this.message="Unesite prezime!"
    }
    else if(this.username=="" || this.username==null || this.username==undefined){
      this.message="Unesite korisničko ime!"
    }
    else if(this.lozinka=="" || this.lozinka==null || this.lozinka==undefined){
      this.message="Unesite lozinku!"
    }
    else if(this.lozinka=="" || this.lozinka==null || this.lozinka==undefined){
      this.message="Unesite lozinku!"
    }
    else if(this.email=="" || this.email==null || this.email==undefined){
      this.message="Unesite email!"
    }
    else if(this.mesto=="" || this.mesto==null || this.mesto==undefined){
      this.message="Unesite mesto rođenja!"
    }
    else if(this.drzava=="" || this.drzava==null || this.drzava==undefined){
      this.message="Unesite državu u kojoj ste rođeni!"
    }
    else if(this.skola==null || this.skola==undefined || this.skola==""){
      this.message="Izaberite školu koju pohađate!"
    }else if(this.tip=="učenik" && (this.odeljenje=="" || this.odeljenje==undefined || this.odeljenje==null)){
      this.message="Odaberite odeljenje u koje idete!"
    }
    else {
      this.message="";

     
      if(this.tip=="učenik"){
        let un_rod:string;
        let find:boolean=true;
        let randbr:number;
        while(find==true){
          randbr = (Math.floor(Math.random()*10000))+1;
          un_rod = this.ime_roditelja.toLowerCase()+randbr;

          let i:number;
          for(i=0; i<this.sviRoditelji.length; i++){
            if(this.sviRoditelji[i].username==un_rod){
              find=true;
              break;
            }
          }
          if(i==this.sviRoditelji.length){
            find=false;
          }
        }

        let ocene:Predmet[] = [];
        let predmeti:string[];
        for(let i=0; i< this.skole.length; i++){
          if(this.skole[i].ime==this.skola){
            for(let j=0; j<this.skole[i].odeljenja.length; j++){
              if(this.skole[i].odeljenja[j].naziv==this.odeljenje){
                  predmeti = this.skole[i].odeljenja[j].predmeti;
              }
            }
          }
        }
        for(let i=0; i<predmeti.length; i++){
          let pr = new Predmet();
          pr.naziv = predmeti[i];
          pr.ocene = [];
          pr.zakljucna_ocena;
          ocene.push(pr);
        }

        this.korisnikServis.registracijaUcenika(this.tip,this.ime,un_rod ,this.prezime,this.username,this.lozinka,
          this.email, this.mesto,this.drzava,this.skola,this.odeljenje,ocene).subscribe(resp=>{
            if(resp['message']=='OK'){
  
                let pw:string = this.ime_roditelja+"@12345";
                let em:string = this.ime_roditelja.toLowerCase()+randbr+"@gmail.com";
                this.korisnikServis.registracijaRoditelja("roditelj", this.ime_roditelja, this.username, this.prezime, un_rod,
                pw, em, this.mesto, this.drzava, this.skola, this.odeljenje).subscribe(resp=>{
                  if(resp['message']=='OK'){
  
                    this.messageSuccess="Zahtev za registaciju uspesno poslat!"
                  }
                })
             
            }else{
              let greska: string = JSON.stringify(resp['message'].keyValue);
              if(greska.includes("username")){
                this.message='Korisnicko ime je zauzeto! Odaberite neko drugo.';
              }else{
                this.message='Korisnik sa ovom email adresom je vec registrovan! Odaberite neku drugu.';
              }
            }
          });
        
      }else{
        this.korisnikServis.registracijaNastavnika(this.tip,this.ime,this.prezime,this.username,this.lozinka,
          this.email, this.mesto,this.drzava,this.skola).subscribe(resp=>{
            if(resp['message']=='OK'){
                this.messageSuccess="Zahtev za registaciju uspesno poslat!"
            }else{
              let greska: string = JSON.stringify(resp['message'].keyValue);
              if(greska.includes("username")){
                this.message='Korisnicko ime je zauzeto! Odaberite neko drugo.';
              }else{
                this.message='Korisnik sa ovom email adresom je vec registrovan! Odaberite neku drugu.';
              }
            }
          });
      }

      
    }
  }

}
