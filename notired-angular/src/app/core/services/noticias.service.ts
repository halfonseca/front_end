/* ============================================================================
 * NotiRed · Plataforma Web de Noticias — Aplicación funcional en Angular
 * ----------------------------------------------------------------------------
 * Archivo      : src/app/core/services/noticias.service.ts
 * Descripción  : Servicio central de datos. Carga el catálogo desde el JSON
 *                local (HttpClient), expone consultas (todas, destacadas,
 *                por id, relacionadas), gestiona favoritos con localStorage
 *                de forma reactiva (BehaviorSubject) e implementa el
 *                mini-CRUD (crear / eliminar noticias de usuario).
 * Autor        : Hugo Alexis Fonseca Diaz
 * Fecha        : Octubre de 2026
 * Dependencias : HttpClientModule, rxjs
 * ========================================================================== */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Noticia } from '../models/noticia.model';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  /** Ruta del archivo JSON local con el catálogo base. */
  private readonly noticiasUrl = 'assets/data/noticias.json';
  /** Clave de localStorage para los ids favoritos. */
  private readonly favoritosKey = 'notired_favoritos';
  /** Clave de localStorage para noticias creadas por el usuario (mini-CRUD). */
  private readonly customNoticiasKey = 'notired_noticias_custom';

  /**
   * Contador reactivo de favoritos. El header se suscribe para mostrar
   * el badge actualizado sin recargar la página.
   */
  private favoritosCount$ = new BehaviorSubject<number>(this.getFavoritosIds().length);

  constructor(private http: HttpClient) {}

  /** Observable público del contador de favoritos. */
  getFavoritosCount$(): Observable<number> {
    return this.favoritosCount$.asObservable();
  }

  /** Notifica a los suscriptores que el conteo de favoritos cambió. */
  private emitirConteoFavoritos(): void {
    this.favoritosCount$.next(this.getFavoritosIds().length);
  }

  /**
   * Obtiene todas las noticias: catálogo base (JSON) + creadas por el usuario.
   * Si el HTTP falla (p. ej. apertura con file://), retorna solo las de usuario.
   */
  getAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.noticiasUrl).pipe(
      map((base) => [...(base ?? []), ...this.getCustomNoticias()]),
      catchError(() => of([...this.getCustomNoticias()]))
    );
  }

  /** Noticias marcadas como destacadas (sección "Lo más leído" del Home). */
  getDestacadas(): Observable<Noticia[]> {
    return this.getAll().pipe(map((n) => n.filter((x) => x.destacada)));
  }

  /** Busca una noticia por su id. Retorna undefined si no existe. */
  getById(id: number): Observable<Noticia | undefined> {
    return this.getAll().pipe(map((n) => n.find((x) => x.id === id)));
  }

  /** Relacionadas: misma categoría, excluyendo la actual. */
  getRelacionadas(id: number, categoria: string, limit = 3): Observable<Noticia[]> {
    return this.getAll().pipe(
      map((n) => n.filter((x) => x.id !== id && x.categoria === categoria).slice(0, limit))
    );
  }

  /** Búsqueda por texto en título + descripción (insensible a mayúsculas). */
  buscar(termino: string): Observable<Noticia[]> {
    const t = termino.trim().toLowerCase();
    if (!t) return this.getAll();
    return this.getAll().pipe(
      map((n) =>
        n.filter(
          (x) =>
            x.titulo.toLowerCase().includes(t) ||
            x.descripcion.toLowerCase().includes(t)
        )
      )
    );
  }

  /** Lee los ids favoritos desde localStorage (arreglo vacío si no hay). */
  getFavoritosIds(): number[] {
    try {
      const data = localStorage.getItem(this.favoritosKey);
      return data ? (JSON.parse(data) as number[]) : [];
    } catch {
      return [];
    }
  }

  /** Noticias completas marcadas como favoritas. */
  getFavoritos(): Observable<Noticia[]> {
    return this.getAll().pipe(
      map((n) => {
        const ids = this.getFavoritosIds();
        return n.filter((x) => ids.includes(x.id));
      })
    );
  }

  /** Agrega o quita una noticia de favoritos y emite el nuevo conteo. */
  toggleFavorito(id: number): void {
    const ids = this.getFavoritosIds();
    const idx = ids.indexOf(id);
    if (idx > -1) ids.splice(idx, 1);
    else ids.push(id);
    localStorage.setItem(this.favoritosKey, JSON.stringify(ids));
    this.emitirConteoFavoritos();
  }

  /** Indica si una noticia está en favoritos. */
  esFavorito(id: number): boolean {
    return this.getFavoritosIds().includes(id);
  }

  /** Noticias creadas por el usuario (mini-CRUD, persistidas en localStorage). */
  private getCustomNoticias(): Noticia[] {
    try {
      const data = localStorage.getItem(this.customNoticiasKey);
      return data ? (JSON.parse(data) as Noticia[]) : [];
    } catch {
      return [];
    }
  }

  /** CREATE del mini-CRUD: guarda la noticia de usuario en localStorage. */
  agregarNoticia(noticia: Noticia): void {
    const custom = this.getCustomNoticias();
    custom.push(noticia);
    localStorage.setItem(this.customNoticiasKey, JSON.stringify(custom));
  }

  /** DELETE del mini-CRUD: elimina noticia de usuario y la quita de favoritos. */
  eliminarNoticia(id: number): void {
    const filtered = this.getCustomNoticias().filter((n) => n.id !== id);
    localStorage.setItem(this.customNoticiasKey, JSON.stringify(filtered));
    const favs = this.getFavoritosIds().filter((fid) => fid !== id);
    localStorage.setItem(this.favoritosKey, JSON.stringify(favs));
    this.emitirConteoFavoritos();
  }

  /** Genera un id único basado en la hora (suficiente para uso local). */
  generarNuevoId(): number {
    return Date.now();
  }
}
