/* ============================================================================
 * NotiRed · Componente Favoritos
 * ----------------------------------------------------------------------------
 * Lista las noticias guardadas en localStorage. Reutiliza <app-news-card>
 * y permite quitar favoritos (event binding → servicio reactivo).
 * ========================================================================== */

import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    this.noticiasService.getFavoritos().subscribe((data) => {
      this.favoritos = data;
    });
  }

  quitarFavorito(id: number): void {
    this.noticiasService.toggleFavorito(id);
    this.cargarFavoritos();
  }
}
