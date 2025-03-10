import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MaterialModule } from './shared/material/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InicioComponent } from './modules/inicio/inicio.component';

import { FooterComponent } from './components/footer/footer.component';
import { ServiceComponent } from './modules/service/service.component';
import { ContactoComponent } from './modules/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InicioComponent,
    FooterComponent,
    ServiceComponent,
    ContactoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
