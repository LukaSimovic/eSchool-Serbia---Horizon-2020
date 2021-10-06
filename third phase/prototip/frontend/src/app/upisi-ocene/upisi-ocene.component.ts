import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-upisi-ocene',
  templateUrl: './upisi-ocene.component.html',
  styleUrls: ['./upisi-ocene.component.css']
})
export class UpisiOceneComponent implements OnInit {

  constructor(private ruter:Router,
    private korisServis:KorisnikService) { }
  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika

    this.mojiPredmeti.push(" ");
    for(let i=0; i<this.ulogovaniKorisnik.predmeti.length; i++){
      this.mojiPredmeti.push(this.ulogovaniKorisnik.predmeti[i]);
    }
  }
  mojiPredmeti:string[] = [];
  predmet:string;
  odeljenje:string;
  ocena:number;
  zakljocena:number;
  izabranPredmet:number
  izabranoOdeljenje:number

  ucenici:Korisnik[];

  indexPredmeta:number;

  izaberiPr(){
    this.izabranPredmet=1;
  }
  izaberiOd(){
    this.izabranoOdeljenje=1;
    this.korisServis.dohvatiUcenPoOdeljenju(this.odeljenje).subscribe((data:Korisnik[])=>{
      this.ucenici=data;

      for(let i=0; i<this.ucenici[0].spisak_ocena.length; i++){
        if(this.ucenici[0].spisak_ocena[i].naziv==this.predmet){
          this.indexPredmeta=i;
          break;
        }
      }
    })
  }

  message:string;

  upisi(un){
    this.korisServis.upisiOcenu(un,this.predmet,this.ocena).subscribe(resp=>{
      if(resp['message']=='OK'){
        this.message = "Ocena uspesno upisana!";

        this.korisServis.dohvatiUcenPoOdeljenju(this.odeljenje).subscribe((data:Korisnik[])=>{
          this.ucenici=data;
    
          for(let i=0; i<this.ucenici[0].spisak_ocena.length; i++){
            if(this.ucenici[0].spisak_ocena[i].naziv==this.predmet){
              this.indexPredmeta=i;
              break;
            }
          }
        })
      }else{
        this.message="Greska pri upisivanju ocene!";
      }
    })
  }

  zakljuci(un){
    
    this.korisServis.zakljuciOcenu(un,this.predmet,this.zakljocena).subscribe(resp=>{
      if(resp['message']=='OK'){
        this.message = "Ocena uspesno zakljucena!";

        this.korisServis.dohvatiUcenPoOdeljenju(this.odeljenje).subscribe((data:Korisnik[])=>{
          this.ucenici=data;
    
          for(let i=0; i<this.ucenici[0].spisak_ocena.length; i++){
            if(this.ucenici[0].spisak_ocena[i].naziv==this.predmet){
              this.indexPredmeta=i;
              break;
            }
          }
        })
      }else{
        this.message="Greska pri upisivanju ocene!";
      }
    })
    
  }

  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

}
