import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-dnevnik',
  templateUrl: './dnevnik.component.html',
  styleUrls: ['./dnevnik.component.css']
})
export class DnevnikComponent implements OnInit {

  constructor(private ruter:Router,private korisnikServis:KorisnikService) { }
  ulogovaniKorisnik:Korisnik;
  slika:string;
  ucenici:Korisnik[]=[];
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika='../../assets/korisnici/'+this.ulogovaniKorisnik.slika
    this.korisnikServis.dohvatiOdeljenje(this.ulogovaniKorisnik.razredni, this.ulogovaniKorisnik.skola).subscribe((ucenici:Korisnik[])=>{
      this.ucenici=ucenici
      for(let i=0;i<ucenici.length;i++){
        this.ucenici[i].slika="../../assets/korisnici/"+ this.ucenici[i].slika
      }
      console.log(this.ucenici)
    })
  }
  osvezi(){
    window.location.reload()
  }

  odjaviSe(){
    localStorage.clear()
    this.ruter.navigate(['/prijava'])
  }
}
