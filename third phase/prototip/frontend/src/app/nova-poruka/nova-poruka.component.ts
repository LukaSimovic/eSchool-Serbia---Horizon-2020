import { Component, OnInit } from '@angular/core';
import { Konverzacija } from 'src/models/konverzacija';
import { Korisnik } from 'src/models/korisnik';
import { Poruka } from 'src/models/poruka';
import { KonverzacijaService } from '../konverzacija.service';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-nova-poruka',
  templateUrl: './nova-poruka.component.html',
  styleUrls: ['./nova-poruka.component.css']
})
export class NovaPorukaComponent implements OnInit {
  kome:string;
  korisnici:Korisnik[]=[];
  tekstPoruke:string;
  korisnik:Korisnik;
  idPoruke:number;
  idKonverzacije:number;
  poruke:Poruka[]=[];
  constructor(private korisnikServis:KorisnikService,private konverzacijaServis:KonverzacijaService) { }

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem('ulogovan'))
    this.korisnikServis.dohvati().subscribe((korisnici:Korisnik[])=>{
      for(let i=0;i<korisnici.length;i++){
        if(korisnici[i].tip!='admin' && korisnici[i].username!=this.korisnik.username){
          this.korisnici.push(korisnici[i])
        }
      }
      console.log(this.korisnici)
    })
  }

  cao(){
    alert(this.kome)
  }
  posalji(){
    this.konverzacijaServis.proveraPostojanaKonverzacije(this.korisnik.username,this.kome).subscribe((konverzacija:Konverzacija)=>{
      if(konverzacija!=null){
        this.idPoruke=konverzacija.poruke.length+1;
        let sada=Date.now();
        let vreme:Date=new Date(sada);
        let datum:string=vreme.getUTCDate()+"."+(vreme.getMonth()+1)+"."+vreme.getFullYear()+" "+vreme.getHours()+":"+vreme.getMinutes()+":"+vreme.getSeconds();
        const poruka={
          id:this.idPoruke,
          poslao:this.korisnik.username,
          datum:datum,
          tekst:this.tekstPoruke
        }
        this.konverzacijaServis.posaljiPoruku(poruka,this.korisnik.username,this.kome).subscribe(res=>{
          if(res['message']=='ok'){
            window.location.reload()
          }
        });
        console.log(this.idPoruke);
      }else{
        this.konverzacijaServis.dohvatiSve(this.korisnik.username).subscribe((konverzacije:Konverzacija[])=>{
          this.idKonverzacije=konverzacije.length+1;
          console.log(this.idKonverzacije)
          let sada=Date.now();
          let vreme:Date=new Date(sada);
          let datum:string=vreme.getUTCDate()+"."+(vreme.getMonth()+1)+"."+vreme.getFullYear()+" "+vreme.getHours()+":"+vreme.getMinutes()+":"+vreme.getSeconds();
          const poruka={
            idPoruke:1,
            datum:datum,
            poslao:this.korisnik.username,
            tekst:this.tekstPoruke
          }
          this.poruke.push(poruka);
          console.log(this.poruke)
          this.konverzacijaServis.napraviNovuKonverzaciju(this.korisnik.username,this.kome,this.poruke,this.idKonverzacije).subscribe(res=>{
            if(res['message']=='ok')window.location.reload();
          })
        })
      }
    })
  }
}
