/* ============================================================================
 * NotiRed · Componente reutilizable NewsCard
 * ----------------------------------------------------------------------------
 * Archivo      : src/app/shared/news-card/news-card.component.ts
 * Descripción  : Tarjeta de noticia reutilizada en Home, Listado y Favoritos.
 *                Demuestra @Input (recibe la noticia y opciones de vista) y
 *                @Output (emite eventos eliminar / favorito al padre).
 * Autor        : Hugo Alexis Fonseca Diaz
 * Fecha        : Octubre de 2026
 * ========================================================================== */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Noticia } from '../../core/models/noticia.model';

/**
 * Tarjeta visual de una noticia con imagen, categoría, título,
 * descripción y acciones (Ver más / Favorito / Eliminar).
 */
@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent {
  /** Noticia a mostrar (enlace padre → hijo). */
  @Input() noticia!: Noticia;
  /** Muestra el botón Eliminar (solo listado / admin). */
  @Input() mostrarEliminar = false;
  /** Muestra el botón de favorito rápido. */
  @Input() mostrarFavorito = false;
  /** Estado favorito actual (para pintar ★). */
  @Input() esFavorito = false;

  /** El padre elimina la noticia (enlace hijo → padre). */
  @Output() eliminar = new EventEmitter<number>();
  /** El padre alterna favorito. */
  @Output() favorito = new EventEmitter<number>();

  onEliminar(): void {
    this.eliminar.emit(this.noticia.id);
  }

  onFavorito(): void {
    this.favorito.emit(this.noticia.id);
  }
}
