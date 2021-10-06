import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Konverzacija } from 'src/models/konverzacija';
import { Korisnik } from 'src/models/korisnik';
import { KonverzacijaService } from '../konverzacija.service';
import { KorisnikService } from '../korisnik.service';
import { PorukeComponent } from '../poruke/poruke.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  default:boolean=true;
  razmena:boolean=false;
  novaPoruka:boolean=false;
  konverzacije:Konverzacija[];
  prikazSlika:any[]=[];
  prikazImePrezime:string[]=[];
  prikazPoslednjaPoruka:string[]=[];
  prikazVremePoslednjePoruke:string[]=[];
  ucenik:boolean=false;
  nastavnik:boolean=false;
  poruke:any[]=[];
  mojaPoruka:boolean[]=[];
  constructor(private ruter:Router,private konverzacijaServis:KonverzacijaService,private korisnikServis:KorisnikService) { }
  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  ngOnInit(): void {
    let izbor=JSON.parse(localStorage.getItem('razmena'));
    if(izbor==true){
      this.default=false;
      this.razmena=true;
      this.novaPoruka=false;
    }
    izbor=JSON.parse(localStorage.getItem('nova_poruka'));
    if(izbor==true){
      this.default=false;
      this.razmena=false;
      this.novaPoruka=true;
    }
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika
    if(this.ulogovaniKorisnik.tip=='nastavnik') this.nastavnik=true;
    else this.ucenik=true;
    this.konverzacijaServis.dohvatiSve(this.ulogovaniKorisnik.username).subscribe((konverzacija:Konverzacija[])=>{
      this.konverzacije=konverzacija;
      console.log(this.konverzacije)
      for(let i=0;i<this.konverzacije.length;i++){
        if(this.konverzacije[i].osoba1==this.ulogovaniKorisnik.username){
          this.korisnikServis.dohvatiKorisnikaPoUsername(this.konverzacije[i].osoba2).subscribe((korisnik:Korisnik)=>{
            this.prikazSlika.push('../../assets/korisnici/'+korisnik.slika)
            this.prikazImePrezime.push(korisnik.ime+" "+korisnik.prezime)
          })
        }else{
          this.korisnikServis.dohvatiKorisnikaPoUsername(this.konverzacije[i].osoba1).subscribe((korisnik:Korisnik)=>{
            this.prikazSlika.push('../../assets/korisnici/'+korisnik.slika)
            this.prikazImePrezime.push(korisnik.ime+" "+korisnik.prezime)
          })
        }
        let poruka:string="";
        poruka=this.konverzacije[i].poruke[this.konverzacije[i].poruke.length-1].tekst;
        if(poruka.length>25){
          let porukaPom="";
          for(let i=0;i<poruka.length;i++){
            if(i<25)porukaPom+=poruka[i]
          }
          poruka=porukaPom+'...';
        }
        this.prikazPoslednjaPoruka.push(poruka);
        this.prikazVremePoslednjePoruke.push(this.konverzacije[i].poruke[this.konverzacije[i].poruke.length-1].datum)
      }
      console.log(this.prikazSlika)
      console.log(this.prikazImePrezime)
      console.log(this.prikazPoslednjaPoruka)
      console.log(this.prikazVremePoslednjePoruke)
    })
    console.log(this.razmena)
    console.log(this.default)
  }

  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

  prikaziKonverzaciju(id,ime,slika){
    this.mojaPoruka=[];
    this.poruke=[];
    for(let i=0;i<this.konverzacije.length;i++){
      if(this.konverzacije[i].id==id){
        localStorage.setItem('osoba1',this.konverzacije[i].osoba1);
        localStorage.setItem('osoba2',this.konverzacije[i].osoba2);
        for(let j=0;j<this.konverzacije[i].poruke.length;j++){
          let podaci={
            id:this.konverzacije[i].poruke[j].idPoruke,
            tekst:this.konverzacije[i].poruke[j].tekst,
            datum:this.konverzacije[i].poruke[j].datum,
            poslao:this.konverzacije[i].poruke[j].poslao
          }
          if(this.konverzacije[i].poruke[j].poslao==this.ulogovaniKorisnik.username){
            this.mojaPoruka.push(true);
          }else{
            this.mojaPoruka.push(false);
          }
          this.poruke.push(podaci)
        }
      }
    }
    localStorage.setItem('slika',JSON.stringify(slika))
    localStorage.setItem('ime_prezime',JSON.stringify(ime))
    localStorage.setItem('mojaPoruka',JSON.stringify(this.mojaPoruka));
    localStorage.setItem('poruke', JSON.stringify(this.poruke));
    localStorage.setItem('razmena',JSON.stringify(true));
    localStorage.removeItem('nova_poruka')
    this.default=false;
    this.razmena=true;
    this.novaPoruka=false;
    window.location.reload();
  }
  posaljiNovuPoruku(){
    localStorage.removeItem('razmena')
    localStorage.setItem('nova_poruka',JSON.stringify(true));
    this.default=false;
    this.razmena=false;
    this.novaPoruka=true;
  }

}
