import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkolaService {
  url='http://localhost:4000';
  constructor(private http:HttpClient) { }

 
  dohvatiSkole(){
    return this.http.get(`${this.url}/skole/dohvatiSkole`);
  }

  zakaziRoditeljski(skola,odeljenje,roditeljski){
    const podaci = {
      skola:skola,
      odeljenje:odeljenje,
      roditeljski:roditeljski
    }
    return this.http.post(`${this.url}/skole/zakaziRoditeljski`,podaci);
  }

  
}
