import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { UcenikComponent } from './ucenik/ucenik.component';
import { RoditeljComponent } from './roditelj/roditelj.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { InboxComponent } from './inbox/inbox.component';
import { PregledOcenaComponent } from './pregled-ocena/pregled-ocena.component';
import { RasporedCasovaComponent } from './raspored-casova/raspored-casova.component';
import { ProfilComponent } from './profil/profil.component';
import { UpravljanjeNastComponent } from './upravljanje-nast/upravljanje-nast.component';
import { UpravljanjeUcenComponent } from './upravljanje-ucen/upravljanje-ucen.component';
import { UpisiOceneComponent } from './upisi-ocene/upisi-ocene.component';
import { ZakaziRoditeljskiComponent } from './zakazi-roditeljski/zakazi-roditeljski.component';
import { PrikazRoditeljskihComponent } from './prikaz-roditeljskih/prikaz-roditeljskih.component';
import { PorukeComponent } from './poruke/poruke.component';
import { NovaPorukaComponent } from './nova-poruka/nova-poruka.component';
import { DnevnikComponent } from './dnevnik/dnevnik.component';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    PocetnaComponent,
    AdminComponent,
    NastavnikComponent,
    UcenikComponent,
    RoditeljComponent,
    RegistracijaComponent,
    ZahteviComponent,
    InboxComponent,
    PregledOcenaComponent,
    RasporedCasovaComponent,
    ProfilComponent,
    UpravljanjeNastComponent,
    UpravljanjeUcenComponent,
    UpisiOceneComponent,
    ZakaziRoditeljskiComponent,
    PrikazRoditeljskihComponent,
    PorukeComponent,
    NovaPorukaComponent,
    DnevnikComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
