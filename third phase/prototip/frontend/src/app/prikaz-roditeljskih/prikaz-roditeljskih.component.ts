import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Roditeljski } from 'src/models/roditeljski';
import { Skola } from 'src/models/skola';
import { SkolaService } from '../skola.service';

@Component({
  selector: 'app-prikaz-roditeljskih',
  templateUrl: './prikaz-roditeljskih.component.html',
  styleUrls: ['./prikaz-roditeljskih.component.css']
})
export class PrikazRoditeljskihComponent implements OnInit {

  constructor(private ruter:Router, private skolaServis:SkolaService) { }

  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';

  sveSkole:Skola[];
  postojiRoditeljski:boolean;
  roditeljski:Roditeljski;

  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika



    this.skolaServis.dohvatiSkole().subscribe((data:Skola[])=>{
      this.sveSkole=data;
      for(let i=0; i<this.sveSkole.length; i++){
        if(this.sveSkole[i].ime==this.ulogovaniKorisnik.skola){
          for(let j=0; j<this.sveSkole[i].odeljenja.length; j++){
            if(this.sveSkole[i].odeljenja[j].naziv==this.ulogovaniKorisnik.odeljenje){
              if(this.sveSkole[i].odeljenja[j].roditeljski==null){
                this.postojiRoditeljski=false;
              }else{
                this.postojiRoditeljski=true;
                this.roditeljski = this.sveSkole[i].odeljenja[j].roditeljski;
              }
              break;
            }
          }
        }
      }

      
    })
  }


  odjaviSe(){
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

}
