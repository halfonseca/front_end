/* ============================================================================
 * NotiRed · Módulo raíz
 * ----------------------------------------------------------------------------
 * Archivo      : src/app/app.module.ts
 * Descripción  : Declara todos los componentes y configura los módulos de
 *                Angular necesarios: Browser, HttpClient (JSON), Forms
 *                (two-way binding con ngModel) y ReactiveForms (validaciones).
 * ========================================================================== */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { ListadoComponent } from './features/listado/listado.component';
import { DetalleComponent } from './features/detalle/detalle.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { AcercaComponent } from './features/acerca/acerca.component';
import { NewsCardComponent } from './shared/news-card/news-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListadoComponent,
    DetalleComponent,
    FavoritosComponent,
    ContactoComponent,
    AcercaComponent,
    NewsCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,            // [(ngModel)] — búsqueda y newsletter
    ReactiveFormsModule,    // FormGroup/FormBuilder — contacto y crear noticia
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
