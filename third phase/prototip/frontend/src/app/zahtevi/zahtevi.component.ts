import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.css']
})
export class ZahteviComponent implements OnInit {
  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  zahtevi:Korisnik[];
  ucenici:Korisnik[]=[];
  nastavnici:Korisnik[]=[];
  pokaziNZ: boolean=true;
  pokaziUZ: boolean=true;

  korZahtev: Korisnik;

  constructor(private korisnikServis:KorisnikService,private ruter:Router) { }

  ngOnInit(): void {
    
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'));
    this.slika+=this.ulogovaniKorisnik.slika;
    this.korisnikServis.zahtevi().subscribe((korisnici:Korisnik[])=>{
      this.zahtevi=korisnici;
      for(let i=0;i<this.zahtevi.length;i++){
        if(this.zahtevi[i].tip=='nastavnik') this.nastavnici.push(this.zahtevi[i])
        else if(this.zahtevi[i].tip=='učenik')this.ucenici.push(this.zahtevi[i])
      }
      if(this.nastavnici.length==0)this.pokaziNZ=false;
      if(this.ucenici.length==0) this.pokaziUZ=false;
    })

  }

  prihvati(username){

    this.korisnikServis.dohvatiKorPoUN(username).subscribe((kor:Korisnik)=>{
      this.korZahtev=kor;

      this.korisnikServis.prihvati(username).subscribe(res=>{
        if(res['update']){
          this.nastavnici.forEach((elem, index)=>{
            if(elem.username == username){
              this.nastavnici.splice(index,1);
            }
          })
          this.ucenici.forEach((elem, index)=>{
            if(elem.username == username){
              this.ucenici.splice(index,1);
            }
          })
          if(this.nastavnici.length==0)this.pokaziNZ=false
          if(this.ucenici.length==0) this.pokaziUZ=false;
  
          if(this.korZahtev.tip=="učenik"){
            //prihvati i roditelja
            this.korisnikServis.prihvati(this.korZahtev.un_roditelja).subscribe(res=>{
              if(res['update']==false){
                alert("greska!");
              }
            })
          }
        }
      });
    })

   
  }
  odbij(username){
    this.korisnikServis.odbij(username).subscribe(res=>{
      if(res['delete']){
        this.nastavnici.forEach((elem, index)=>{
          if(elem.username == username){
            this.nastavnici.splice(index,1);
          }
        })
        this.ucenici.forEach((elem, index)=>{
          if(elem.username == username){
            this.ucenici.splice(index,1);
          }
        })
        if(this.nastavnici.length==0)this.pokaziNZ=false
        if(this.ucenici.length==0) this.pokaziUZ=false;
      }
    });
  }
  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

}
