import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Predmet } from 'src/models/predmet';
import { KorisnikService } from '../korisnik.service';
import { SkolaService } from '../skola.service';

@Component({
  selector: 'app-pregled-ocena',
  templateUrl: './pregled-ocena.component.html',
  styleUrls: ['./pregled-ocena.component.css']
})
export class PregledOcenaComponent implements OnInit {

  spisak_ocena:Predmet[];

  ucenik:string;

  constructor(private skolaServis:SkolaService,
    private ruta: ActivatedRoute,
    private ruter:Router,
    private korisServis:KorisnikService) { }
  ulogovaniKorisnik:Korisnik;
  slika:string='../../assets/korisnici/';
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika

    this.ucenik = this.ruta.snapshot.paramMap.get('ucenik');

    this.korisServis.dohvatiKorPoUN(this.ucenik).subscribe((data:Korisnik)=>{
      this.spisak_ocena = data.spisak_ocena;
    })

  }


  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }

}
