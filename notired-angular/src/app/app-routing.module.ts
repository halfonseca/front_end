/* ============================================================================
 * NotiRed · Enrutamiento
 * ----------------------------------------------------------------------------
 * Rutas: '' y 'home' → Home · 'noticias' → Listado · 'noticias/:id' → Detalle
 * 'favoritos' → Favoritos · 'contacto' → Contacto · 'acerca' → Acerca de.
 * ========================================================================== */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ListadoComponent } from './features/listado/listado.component';
import { DetalleComponent } from './features/detalle/detalle.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { AcercaComponent } from './features/acerca/acerca.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'noticias', component: ListadoComponent },
  { path: 'noticias/:id', component: DetalleComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
