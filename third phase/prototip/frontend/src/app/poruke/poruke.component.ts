import { Component, OnInit } from '@angular/core';
import { Konverzacija } from 'src/models/konverzacija';
import { Korisnik } from 'src/models/korisnik';
import { Poruka } from 'src/models/poruka';
import { KonverzacijaService } from '../konverzacija.service';

@Component({
  selector: 'app-poruke',
  templateUrl: './poruke.component.html',
  styleUrls: ['./poruke.component.css']
})
export class PorukeComponent implements OnInit {
  constructor(private konverzacijaServis:KonverzacijaService) { }
  vreme:string[]=[];
  mojaPoruka:boolean[];
  poruke:any[];
  imePrezime:string;
  slika:string;
  tekstPoruke:string;
  osoba1:string;
  osoba2:string;
  idPoruke:number;
  ngOnInit(): void {
    this.osoba1=localStorage.getItem('osoba1');
    this.osoba2=localStorage.getItem('osoba2');
    this.mojaPoruka=JSON.parse(localStorage.getItem('mojaPoruka'));
    this.poruke=JSON.parse(localStorage.getItem('poruke'))
    this.imePrezime=JSON.parse(localStorage.getItem('ime_prezime'))
    this.slika=JSON.parse(localStorage.getItem('slika'))
    for(let i=0; i<this.poruke.length;i++){
      let cnt=this.poruke[i].datum.lastIndexOf(':');
      let vremePoruke='';
      for(let j=0; j<this.poruke[i].datum.length;j++){
        if(j<cnt){
          vremePoruke+=this.poruke[i].datum[j];
        }
      }
      this.vreme.push(vremePoruke);
    }  
  }

  posalji(){
    if(this.tekstPoruke!=undefined && this.tekstPoruke!=null && this.tekstPoruke!=""){
      let sada=Date.now();
      let vreme:Date=new Date(sada);
      let datum:string=vreme.getUTCDate()+"."+(vreme.getMonth()+1)+"."+vreme.getFullYear()+" "+vreme.getHours()+":"+vreme.getMinutes()+":"+vreme.getSeconds();
      this.konverzacijaServis.dohvatiPorukeOsoba1Osoba2(this.osoba1,this.osoba2).subscribe((konverzacija:Konverzacija)=>{
        this.idPoruke=konverzacija.poruke.length+1;
        console.log(this.idPoruke);
        let korisnik:Korisnik=JSON.parse(localStorage.getItem('ulogovan'))
        let tekst=this.tekstPoruke;
        const poruka={
          id:this.idPoruke,
          poslao:korisnik.username,
          datum:datum,
          tekst:tekst
        }
        console.log(poruka)
        localStorage.setItem('poruke',JSON.stringify(this.poruke))
        this.konverzacijaServis.posaljiPoruku(poruka,this.osoba1,this.osoba2).subscribe(res=>{
            if(res['message']=='ok'){
              this.tekstPoruke="";
                let cnt=poruka.datum.lastIndexOf(':');
                let vremePoruke='';
                for(let j=0; j<poruka.datum.length;j++){
                  if(j<cnt){
                    vremePoruke+=poruka.datum[j];
                  }
                }
              this.vreme.push(vremePoruke);
              this.poruke.push(poruka)
              this.mojaPoruka.push(true)
              localStorage.setItem('mojaPoruka',JSON.stringify(this.mojaPoruka));
              localStorage.setItem('poruke', JSON.stringify(this.poruke));
            }
          });
      })
    }
  }

}
