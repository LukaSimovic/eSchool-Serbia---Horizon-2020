import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  poruka:string;
  ime:string;
  prezime:string;
  username:string;
  email:string;
  mesto:string;
  drzava:string;
  lozinka:string;
  lozinkaStara:string;
  novaLozinka:string;
  potvrdaLozinke:string;
  promeniImeBoolean=false;
  promeniPrezimeBoolean=false;
  promeniUsernameBoolean=false;
  promeniEmailBoolean=false;
  promeniMestoBoolean=false;
  promeniDrzavuBoolean=false;
  promeniLozinkuBoolean=false;
  i:number=0;
  constructor(private http:HttpClient, private korisnikServis:KorisnikService,
    private ruter:Router) { }
  ulogovaniKorisnik:Korisnik;
  ucenik:boolean=false;
  nastavnik:boolean=false;
  admin:boolean=false;
  slika:string='../../assets/korisnici/';
  images:any;
  ngOnInit(): void {
    this.ulogovaniKorisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.slika+=this.ulogovaniKorisnik.slika
    if(this.ulogovaniKorisnik.tip=='admin') this.admin=true;
    else if(this.ulogovaniKorisnik.tip=='nastavnik') this.nastavnik=true;
    else this.ucenik=true;
    this.ime=this.ulogovaniKorisnik.ime;
    this.prezime=this.ulogovaniKorisnik.prezime;
    this.username=this.ulogovaniKorisnik.username;
    this.email=this.ulogovaniKorisnik.email;
    this.mesto=this.ulogovaniKorisnik.mesto;
    this.drzava=this.ulogovaniKorisnik.drzava;
    this.lozinka=this.ulogovaniKorisnik.lozinka;
  }
  promeniLozinku(){
    this.i++;
    if(this.i%2==1)this.promeniLozinkuBoolean=true;
    else this.promeniLozinkuBoolean=false;
  }
  izmeni(){
    if(this.ime=="" || this.ime==null || this.ime==undefined){
      this.poruka='Unesite ime!'
    }else if(this.prezime=="" || this.prezime==null || this.prezime==undefined){
      this.poruka='Unesite prezime!'
    }else if(this.username=="" || this.username==null || this.username==undefined){
      this.poruka='Unesite korisničko ime!'
    }else if(this.email=="" || this.email==null || this.email==undefined){
      this.poruka='Unesite e-mail adresu!'
    }else if(this.mesto=="" || this.mesto==null || this.mesto==undefined){
      this.poruka='Unesite mesto rođenja!'
    }else if(this.drzava=="" || this.drzava==null || this.drzava==undefined){
      this.poruka='Unesite državu u kojoj ste rođeni!'
    }else if(this.i%2==1 && (this.lozinkaStara=="" || this.lozinkaStara==undefined || this.lozinkaStara==null)){
      this.poruka='Unesite staru lozinku!'
    }else if(this.i%2==1 && this.lozinkaStara!=this.lozinka){
      this.poruka='Unesite staru lozinku!'
    }else if(this.i%2==1 && (this.novaLozinka=="" || this.novaLozinka==undefined || this.novaLozinka==null)){
      this.poruka='Unesite novu lozinku!'
    }else if(this.i%2==1 && (this.potvrdaLozinke=="" || this.potvrdaLozinke==undefined || this.potvrdaLozinke==null)){
      this.poruka='Potvrdite novu lozinku!'
    }else if(this.i%2==1 && this.potvrdaLozinke!=this.novaLozinka ){
      this.poruka='Unete lozinke nisu iste!'
    }else{
      this.poruka='';
      if(this.i%2==1){
        this.lozinka=this.novaLozinka;
      }
      if(this.images==null){
        this.slika=this.ulogovaniKorisnik.slika
      }else this.slika=this.images.name;
      alert(this.slika)
      this.korisnikServis.izmeni(this.ime,this.prezime,this.username,this.email,this.mesto,this.drzava,this.slika,this.lozinka).subscribe(res=>{
        if(res['update']){
          alert('usperno izmenjeno')
          this.ulogovaniKorisnik.ime=this.ime;
          this.ulogovaniKorisnik.prezime=this.prezime;
          this.ulogovaniKorisnik.username=this.username;
          this.ulogovaniKorisnik.email=this.email;
          this.ulogovaniKorisnik.mesto=this.mesto;
          this.ulogovaniKorisnik.drzava=this.drzava;
          this.ulogovaniKorisnik.slika=this.slika;
          this.ulogovaniKorisnik.lozinka=this.lozinka;
          localStorage.setItem('ulogovan',JSON.stringify(this.ulogovaniKorisnik))
          window.location.reload();
        }
      })
      if(this.images!=null){
        const formData = new FormData();
        formData.append('file', this.images);
        this.http.post<any>('http://localhost:4000/file', formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
    }
  }
  onSelectFile(e){
    if(e.target.files){
      const file=e.target.files[0];
      this.images=file;
      const reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.slika=event.target.result;
      }
    }
  }


  odjaviSe(){
    localStorage.clear();
    this.ruter.navigate(['/prijava']);
  }
}
