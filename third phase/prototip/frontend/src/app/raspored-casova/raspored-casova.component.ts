import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DnevniRaspored } from 'src/models/dnevniRaspored';
import { Korisnik } from 'src/models/korisnik';
import { Skola } from 'src/models/skola';
import { SkolaService } from '../skola.service';

@Component({
  selector: 'app-raspored-casova',
  templateUrl: './raspored-casova.component.html',
  styleUrls: ['./raspored-casova.component.css']
})
export class RasporedCasovaComponent implements OnInit {

  raspored:DnevniRaspored[];
  ime_skole:string;
  odeljenje:string;

  prviCasovi:string[] = [];
  drugiCasovi:string[] = [];
  treciCasovi:string[] = [];
  cetvrtiCasovi:string[] = [];
  petiCasovi:string[] = [];
  sestiCasovi:string[] = [];
  sedmiCasovi:string[] = [];


  constructor(private ruter:Router,private skolaServis:SkolaService) { }
  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika
    
    this.skolaServis.dohvatiSkole().subscribe((data:Skola[])=>{
      for(let i=0; i<data.length; i++){
        if(data[i].ime==this.ulogovaniKorisnik.skola){
          this.ime_skole = this.ulogovaniKorisnik.skola;
          for(let j=0; j<data[i].odeljenja.length; j++){
            if(data[i].odeljenja[j].naziv==this.ulogovaniKorisnik.odeljenje){
              this.odeljenje = this.ulogovaniKorisnik.odeljenje;
              this.raspored = data[i].odeljenja[j].raspored;

              let num:number=0;
              for(let k=0; k<5; k++){
                this.prviCasovi.push(this.raspored[k].casovi[num]);
              }
              num++;
              for(let k=0; k<5; k++){
                this.drugiCasovi.push(this.raspored[k].casovi[num]);
              }
              num++;
              for(let k=0; k<5; k++){
                this.treciCasovi.push(this.raspored[k].casovi[num]);
              }
              num++;
              for(let k=0; k<5; k++){
                this.cetvrtiCasovi.push(this.raspored[k].casovi[num]);
              }
              num++;
              for(let k=0; k<5; k++){
                this.petiCasovi.push(this.raspored[k].casovi[num]);
              }
              num++;
              for(let k=0; k<5; k++){
                this.sestiCasovi.push(this.raspored[k].casovi[num]);
              }
              num++;
              for(let k=0; k<5; k++){
                this.sedmiCasovi.push(this.raspored[k].casovi[num]);
              }

              break;
            }
          }
        }
      }
    })
  }


  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }
}
