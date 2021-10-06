import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KonverzacijaService {
  url='http://localhost:4000';
  constructor(private http:HttpClient) { }

  dohvatiSve(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.url}/konverzacije/mojeKonverzacije`,podaci);
  }

  posaljiPoruku(poruka,osoba1,osoba2){
    const podaci={
      poruka:poruka,
      osoba1:osoba1,
      osoba2:osoba2
    }
    return this.http.post(`${this.url}/konverzacije/posaljiPoruku`,podaci);
  }

  dohvatiPorukeOsoba1Osoba2(osoba1,osoba2){
    const podaci={
      osoba1:osoba1,
      osoba2:osoba2
    }
    return this.http.post(`${this.url}/konverzacije/dohvatiPorukeOsoba1Osoba2`,podaci);
  }

  proveraPostojanaKonverzacije(osoba1, osoba2){
    const podaci={
      osoba1:osoba1,
      osoba2:osoba2
    }
    return this.http.post(`${this.url}/konverzacije/proveraPostojanaKonverzacije`,podaci);
  }

  napraviNovuKonverzaciju(osoba1,osoba2,poruke,id){
    const podaci={
      id:id,
      poruke:poruke,
      osoba1:osoba1,
      osoba2:osoba2,
      neprocitano_osoba1:1,
      neprocitano_osoba2:0
    }
    return this.http.post(`${this.url}/konverzacije/napraviNovuKonverzaciju`,podaci);
  }

}
