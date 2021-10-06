import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private ruter:Router) { }

  ngOnInit(): void {
  }
  
  prijava():void{
    this.ruter.navigate(['prijava']);
  }
  registracija():void{
    this.ruter.navigate(['registracija']);
  }

}
