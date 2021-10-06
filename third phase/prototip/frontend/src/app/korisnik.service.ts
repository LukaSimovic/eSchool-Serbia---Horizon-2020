import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  url='http://localhost:4000';
  constructor(private http:HttpClient) { }

  prijava(username,lozinka,tip){
    const podaci={
      username:username,
      lozinka:lozinka,
      tip:tip
    }
    return this.http.post(`${this.url}/korisnici/prijava`,podaci);
  }

  dohvatiKorPoUN(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.url}/korisnici/dohvatiKorPoUN`,podaci);
  }
  dohvatiUcenPoOdeljenju(odeljenje){
    const podaci={
      odeljenje:odeljenje
    }
    return this.http.post(`${this.url}/korisnici/dohvatiUcenPoOdeljenju`,podaci);
  }

  upisiOcenu(username, predmet, ocena){
    const podaci={
      username:username,
      predmet:predmet,
      ocena:ocena
    }
    return this.http.post(`${this.url}/korisnici/upisiOcenu`,podaci);
  }

  zakljuciOcenu(username, predmet, zakljocena){
    const podaci={
      username:username,
      predmet:predmet,
      zakljocena:zakljocena
    }
    return this.http.post(`${this.url}/korisnici/zakljuciOcenu`,podaci);
  }
  
  dohvati(){
    return this.http.get(`${this.url}/korisnici/dohvati`);
  }
  dohvatiRoditelje(){
    return this.http.get(`${this.url}/korisnici/dohvatiRoditelje`);
  }
  dohvatiNastavnike(){
    return this.http.get(`${this.url}/korisnici/dohvatiNastavnike`);
  }

  registracijaNastavnika(tip,ime,prezime,username,lozinka,email,mesto,drzava,skola){
    let accepted:number =0;
    let slika:string = "noImage.png";
    let predmeti = [];
    let razredni = "0";
    const podaci={
      tip:tip,
      ime:ime,
      prezime:prezime,
      username:username,
      lozinka:lozinka,
      email:email,
      slika:slika,
      mesto:mesto,
      drzava:drzava,
      accepted:accepted,
      skola:skola,
      predmeti:predmeti,
      razredni:razredni
    }
    return this.http.post(`${this.url}/korisnici/registracija`,podaci);
  }
  
  registracijaUcenika(tip,ime,un_roditelja,prezime,username,lozinka,email,mesto,drzava,skola,odeljenje,ocene){
    //alert(tip+" "+ime+" "+prezime+" "+username+" " + lozinka+" "+mesto+" "+ drzava+" " + skola+" "+ odeljenje)
    let accepted:number =0;
    let slika:string = "noImage.png"
    const podaci={
      tip:tip,
      ime:ime,
      un_roditelja:un_roditelja,
      prezime:prezime,
      username:username,
      lozinka:lozinka,
      email:email,
      slika:slika,
      mesto:mesto,
      drzava:drzava,
      accepted:accepted,
      skola:skola,
      odeljenje:odeljenje,
      spisak_ocena:ocene
    }
    return this.http.post(`${this.url}/korisnici/registracija`,podaci);
  }

  registracijaRoditelja(tip,ime,un_deteta,prezime,username,lozinka,email,mesto,drzava,skola,odeljenje){
    let accepted:number =0;
    let slika:string = "noImage.png"
 
    const podaci={
      tip:tip,
      ime:ime,
      un_deteta:un_deteta,
      prezime:prezime,
      username:username,
      lozinka:lozinka,
      email:email,
      slika:slika,
      mesto:mesto,
      drzava:drzava,
      accepted:accepted,
      skola:skola,
      odeljenje:odeljenje
    }
    return this.http.post(`${this.url}/korisnici/registracija`,podaci);
  }

  zahtevi(){
    return this.http.get(`${this.url}/korisnici/zahtevi`);
  }
  odbij(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.url}/korisnici/odbij`,podaci);
  }
  prihvati(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.url}/korisnici/prihvati`,podaci);
  }


  dodeliOdeljenjeNastavniku(username,odeljenje){
    const podaci={
      username:username,
      odeljenje:odeljenje
    }
    return this.http.post(`${this.url}/korisnici/dodeliOdeljenjeNastavniku`,podaci);
  }
  dodajPredmetNastavniku(username,predmet){
    const podaci={
      username:username,
      predmet:predmet
    }
    return this.http.post(`${this.url}/korisnici/dodajPredmetNastavniku`,podaci);
  }
  
  

  izmeni(ime,prezime,username,email,mesto,drzava,slika,lozinka){
    const podaci={
      ime:ime,
      prezime:prezime,
      username:username,
      email:email,
      mesto:mesto,
      drzava:drzava,
      slika:slika,
      lozinka:lozinka
    }
    return this.http.post(`${this.url}/korisnici/izmeni`,podaci);
  }

  dohvatiKorisnikaPoUsername(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.url}/korisnici/dohvatiKorisnikaPoUsername`,podaci);
  }
  
  dohvatiOdeljenje(odeljenje,skola){
    const podaci={
      odeljenje:odeljenje,
      skola:skola
    }
    return this.http.post(`${this.url}/korisnici/dohvatiOdeljenje`,podaci);
  }

}
