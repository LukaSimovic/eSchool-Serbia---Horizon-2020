import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
