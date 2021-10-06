import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {
  username:string;
  tip:string;
  lozinka:string;
  message:string="";
  constructor(private ruter:Router, private korisnikServis:KorisnikService) { }

  ngOnInit(): void {
  }
  pocetna(){
    this.ruter.navigate([''])
  }
  prijava():void{
    if(this.username==undefined || this.username==null || this.username==""){
      this.message="Unesite korisničko ime!";
    }else if(this.lozinka==undefined || this.lozinka==null || this.lozinka==""){
      this.message="Unesite lozinku!"
    }else if(this.tip==undefined || this.tip==null || this.tip==""){
      this.message="Izaberite tip korisnika!"
    }else{
      /*this.korisnikServis.dohvati().subscribe((korisnici:Korisnik[])=>{
        console.log(korisnici);
      })*/
      this.korisnikServis.prijava(this.username,this.lozinka,this.tip).subscribe((korisnik:Korisnik)=>{
        console.log(korisnik)
        if(korisnik){
          localStorage.setItem('ulogovan',JSON.stringify(korisnik))
          if(korisnik.tip=='admin'){
            this.ruter.navigate(['admin']);
          }else if(korisnik.tip=='nastavnik'){
            this.ruter.navigate(['nastavnik']);
          }else if(korisnik.tip=='učenik'){
            this.ruter.navigate(['ucenik']);
          }else{
            this.ruter.navigate(['roditelj']);
          }
        }
        else {
          this.message='Greska!';
        }
      });
    }
  }
  

}
