/* ============================================================================
 * NotiRed · Plataforma Web de Noticias — Aplicación funcional en Angular
 * ----------------------------------------------------------------------------
 * Archivo      : src/app/core/models/noticia.model.ts
 * Descripción  : Modelo de datos de una noticia. Define la forma del objeto
 *                que viaja entre el JSON local, el servicio NoticiasService
 *                y los componentes (listado, detalle, favoritos, home).
 * Autor        : Hugo Alexis Fonseca Diaz
 * Fecha        : Octubre de 2026
 * ========================================================================== */

/** Categorías válidas del catálogo. */
export type CategoriaNoticia = 'Educación' | 'Tecnología' | 'Turismo' | 'Comercio' | 'Deportes';

/**
 * Representa una noticia del catálogo de NotiRed.
 * @interface Noticia
 */
export interface Noticia {
  /** Identificador único (numérico; Date.now() para las creadas por el usuario). */
  id: number;
  /** Titular de la noticia. */
  titulo: string;
  /** Resumen de una o dos líneas que se muestra en las tarjetas. */
  descripcion: string;
  /** Cuerpo completo que se muestra en la vista de detalle. */
  cuerpo: string;
  /** Categoría para filtros y conteos de la barra lateral. */
  categoria: CategoriaNoticia;
  /** Nombre del autor mostrado en metadatos. */
  autor: string;
  /** Fecha de publicación en formato dd/mm/aaaa. */
  fecha: string;
  /** Tiempo estimado de lectura (p. ej. "4 min"). */
  tiempoLectura: string;
  /** Marcador de imagen (etapa sin fotografías definitivas). */
  imagen: string;
  /** Si es true aparece en "Noticias destacadas" del Home. */
  destacada?: boolean;
}
