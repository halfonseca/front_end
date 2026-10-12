/* ============================================================================
 * NotiRed · Componente Home
 * ----------------------------------------------------------------------------
 * Página de inicio: hero, destacadas (reutiliza <app-news-card> con *ngFor),
 * banda CTA con newsletter [(ngModel)] y testimonios. Demuestra interpolación,
 * property binding [routerLink] y event binding (click)/(ngSubmit).
 * ========================================================================== */

import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /** Noticias destacadas del JSON (destacada === true). */
  destacadas: Noticia[] = [];

  /** Newsletter con two-way binding: email + mensaje de confirmación. */
  newsletterEmail = '';
  newsletterMsg = '';

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getDestacadas().subscribe((data) => {
      this.destacadas = data.slice(0, 8);
    });
  }

  /** Valida el correo del newsletter y muestra confirmación (*ngIf). */
  suscribirse(): void {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newsletterEmail.trim());
    this.newsletterMsg = ok
      ? `¡Gracias! ${this.newsletterEmail.trim()} quedó suscrito.`
      : 'Ingrese un correo válido para suscribirse.';
    if (ok) this.newsletterEmail = '';
  }

  esFav(id: number): boolean {
    return this.noticiasService.esFavorito(id);
  }

  onFavorito(id: number): void {
    this.noticiasService.toggleFavorito(id);
  }
}
