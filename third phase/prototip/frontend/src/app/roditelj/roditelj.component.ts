import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';

@Component({
  selector: 'app-roditelj',
  templateUrl: './roditelj.component.html',
  styleUrls: ['./roditelj.component.css']
})
export class RoditeljComponent implements OnInit {

  constructor(private ruter:Router) { }



  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika
  }


  odjaviSe(){
    localStorage.removeItem('ulogovan');
    this.ruter.navigate(['']);
  }

}
