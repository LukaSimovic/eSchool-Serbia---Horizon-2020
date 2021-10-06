import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DnevnikComponent } from './dnevnik/dnevnik.component';
import { InboxComponent } from './inbox/inbox.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PregledOcenaComponent } from './pregled-ocena/pregled-ocena.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PrikazRoditeljskihComponent } from './prikaz-roditeljskih/prikaz-roditeljskih.component';
import { ProfilComponent } from './profil/profil.component';
import { RasporedCasovaComponent } from './raspored-casova/raspored-casova.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RoditeljComponent } from './roditelj/roditelj.component';
import { UcenikComponent } from './ucenik/ucenik.component';
import { UpisiOceneComponent } from './upisi-ocene/upisi-ocene.component';
import { UpravljanjeNastComponent } from './upravljanje-nast/upravljanje-nast.component';
import { UpravljanjeUcenComponent } from './upravljanje-ucen/upravljanje-ucen.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { ZakaziRoditeljskiComponent } from './zakazi-roditeljski/zakazi-roditeljski.component';

const routes: Routes = [
  {path:'',component:PocetnaComponent},
  {path:'prijava',component:PrijavaComponent},
  {path:'registracija',component:RegistracijaComponent},
  {path:'admin',component:AdminComponent},
  {path:'nastavnik',component:NastavnikComponent},
  {path:'ucenik',component:UcenikComponent},
  {path:'roditelj',component:RoditeljComponent},
  {path:'zahtevi',component:ZahteviComponent},
  {path:'ocene/:ucenik',component:PregledOcenaComponent},
  {path:'inbox',component:InboxComponent},
  {path:'raspored',component:RasporedCasovaComponent},
  {path:'profil',component:ProfilComponent},
  {path:'upravljanjeNast', component:UpravljanjeNastComponent},
  {path:'upravljanjeUcen', component:UpravljanjeUcenComponent},
  {path:'upisiOcene', component:UpisiOceneComponent},
  {path:'zakaziRoditeljski', component:ZakaziRoditeljskiComponent},
  {path:'prikazRoditeljskih', component:PrikazRoditeljskihComponent},
  {path:'dnevnik', component:DnevnikComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
