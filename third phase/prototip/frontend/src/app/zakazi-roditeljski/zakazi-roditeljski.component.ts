import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Roditeljski } from 'src/models/roditeljski';
import { Skola } from 'src/models/skola';
import { SkolaService } from '../skola.service';

@Component({
  selector: 'app-zakazi-roditeljski',
  templateUrl: './zakazi-roditeljski.component.html',
  styleUrls: ['./zakazi-roditeljski.component.css']
})
export class ZakaziRoditeljskiComponent implements OnInit {

  constructor(private ruter:Router, private skolaServis:SkolaService) { }
  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika

    this.skolaServis.dohvatiSkole().subscribe((data:Skola[])=>{
      this.sveSkole=data;
      for(let i=0; i<this.sveSkole.length; i++){
        if(this.sveSkole[i].ime==this.ulogovaniKorisnik.skola){
          for(let j=0; j<this.sveSkole[i].odeljenja.length; j++){
            if(this.sveSkole[i].odeljenja[j].naziv==this.ulogovaniKorisnik.razredni){
              if(this.sveSkole[i].odeljenja[j].roditeljski==null){
                this.postojiRoditeljski=false;
              }else{
                this.postojiRoditeljski=true;
                
              }
              break;
            }
          }
        }
      }
     
    })
  }

  sveSkole:Skola[];

  minut:number;
  sat:number;
  mesto:string;
  datum:Date;

  message:string;
  postojiRoditeljski:boolean;

  messageDone:string;

  zakazi(){
    if(this.datum==null || this.datum==undefined || this.datum.toString()==""){
      this.message='Unesite datum!'
    }else if(this.sat==null || this.sat==undefined || this.sat.toString()==""){
      this.message="Unesite vreme!"
    }else if(this.minut==undefined || this.minut==undefined || this.minut.toString()==""){
      this.message='Unesite vreme!'
    }else if(this.mesto==undefined || this.mesto==null || this.mesto==""){
      this.message='Unesite mesto!'
    }else{
      let roditeljski = new Roditeljski;
      roditeljski.datum=this.datum;
      roditeljski.vreme=this.sat+":"+this.minut;
      roditeljski.mesto = this.mesto;
  
      this.skolaServis.zakaziRoditeljski(this.ulogovaniKorisnik.skola, this.ulogovaniKorisnik.razredni, roditeljski).subscribe(resp=>{
        if(resp['message']=='OK'){
          this.messageDone="USPESNO STE ZAKAZALI RODITELJSKI SASTANAK!"
        }else{
          this.message="GRESKA PRI ZAKAZIVANJU!"
  
        }
      })
    }
  }


  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

}
