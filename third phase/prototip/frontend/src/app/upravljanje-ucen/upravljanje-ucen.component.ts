import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';

@Component({
  selector: 'app-upravljanje-ucen',
  templateUrl: './upravljanje-ucen.component.html',
  styleUrls: ['./upravljanje-ucen.component.css']
})
export class UpravljanjeUcenComponent implements OnInit {

  constructor(private ruter:Router) { }
  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika
  }


  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

}
