/* ============================================================================
 * NotiRed · Componente Listado (catálogo)
 * ----------------------------------------------------------------------------
 * Demuestra: *ngFor, *ngIf, (click), [class], [(ngModel)] (búsqueda),
 * [formGroup] (mini-CRUD crear), paginación y reutilización de <app-news-card>
 * con @Input/@Output. Barra lateral con favoritos, conteo y accesos admin.
 * ========================================================================== */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  /** Catálogo completo (base + usuario). */
  noticias: Noticia[] = [];
  /** Resultado tras aplicar categoría + búsqueda. */
  noticiasFiltradas: Noticia[] = [];
  /** Favoritos recientes para la barra lateral. */
  favoritos: Noticia[] = [];

  categorias = ['Todas', 'Educación', 'Tecnología', 'Turismo', 'Comercio'];
  categoriaActiva = 'Todas';

  /** Two-way binding con el input de búsqueda [(ngModel)]. */
  busqueda = '';

  /** Paginación simple del catálogo. */
  paginaActual = 1;
  porPagina = 4;

  /** Formulario reactivo del mini-CRUD (crear noticia). */
  mostrarForm = false;
  formNoticia: FormGroup;

  /** Conteo por categoría para la barra lateral. */
  conteo: Record<string, number> = { Educación: 0, Tecnología: 0, Turismo: 0, Comercio: 0 };

  constructor(private noticiasService: NoticiasService, private fb: FormBuilder) {
    this.formNoticia = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      cuerpo: ['', Validators.required],
      categoria: ['Educación', Validators.required],
      autor: ['Redacción NotiRed', Validators.required],
      fecha: ['15/10/2026', Validators.required],
      tiempoLectura: ['3 min', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  /** Carga catálogo + favoritos y recalcula filtros y conteos. */
  cargarDatos(): void {
    this.noticiasService.getAll().subscribe((data) => {
      this.noticias = data;
      this.aplicarFiltro();
      this.calcularConteo();
    });
    this.noticiasService.getFavoritos().subscribe((data) => {
      this.favoritos = data.slice(0, 3);
    });
  }

  /** Filtro por categoría (event binding desde los chips). */
  filtrar(categoria: string): void {
    this.categoriaActiva = categoria;
    this.paginaActual = 1;
    this.aplicarFiltro();
  }

  /** Se invoca en cada tecla del buscador (two-way binding). */
  alBuscar(): void {
    this.paginaActual = 1;
    this.aplicarFiltro();
  }

  /** Combina filtro de categoría + término de búsqueda. */
  aplicarFiltro(): void {
    const t = this.busqueda.trim().toLowerCase();
    this.noticiasFiltradas = this.noticias.filter((n) => {
      const okCat = this.categoriaActiva === 'Todas' || n.categoria === this.categoriaActiva;
      const okTxt =
        !t ||
        n.titulo.toLowerCase().includes(t) ||
        n.descripcion.toLowerCase().includes(t);
      return okCat && okTxt;
    });
  }

  /** Total de páginas según el filtro actual. */
  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.noticiasFiltradas.length / this.porPagina));
  }

  /** Subconjunto visible de la página actual. */
  get noticiasPagina(): Noticia[] {
    const ini = (this.paginaActual - 1) * this.porPagina;
    return this.noticiasFiltradas.slice(ini, ini + this.porPagina);
  }

  /** Arreglo [1..totalPaginas] para pintar la paginación con *ngFor. */
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  irPagina(p: number): void {
    if (p >= 1 && p <= this.totalPaginas) this.paginaActual = p;
  }

  calcularConteo(): void {
    this.conteo = { Educación: 0, Tecnología: 0, Turismo: 0, Comercio: 0 };
    this.noticias.forEach((n) => {
      if (this.conteo[n.categoria] !== undefined) this.conteo[n.categoria]++;
    });
  }

  /** @Output favorito del <app-news-card>: alterna y refresca sidebar. */
  onFavorito(id: number): void {
    this.noticiasService.toggleFavorito(id);
    this.cargarDatos();
  }

  /** @Output eliminar del <app-news-card> (solo borra creadas por usuario). */
  eliminarNoticia(id: number): void {
    if (confirm('¿Eliminar esta noticia? (Solo aplica a noticias creadas por el usuario)')) {
      this.noticiasService.eliminarNoticia(id);
      this.cargarDatos();
    }
  }

  toggleForm(): void {
    this.mostrarForm = !this.mostrarForm;
  }

  /** CREATE del mini-CRUD con validación del formulario reactivo. */
  crearNoticia(): void {
    if (this.formNoticia.valid) {
      const nueva: Noticia = {
        id: this.noticiasService.generarNuevoId(),
        titulo: this.formNoticia.value.titulo,
        descripcion: this.formNoticia.value.descripcion,
        cuerpo: this.formNoticia.value.cuerpo,
        categoria: this.formNoticia.value.categoria,
        autor: this.formNoticia.value.autor,
        fecha: this.formNoticia.value.fecha,
        tiempoLectura: this.formNoticia.value.tiempoLectura,
        imagen: 'img-new',
        destacada: false
      };
      this.noticiasService.agregarNoticia(nueva);
      this.formNoticia.reset({
        categoria: 'Educación',
        autor: 'Redacción NotiRed',
        fecha: '15/10/2026',
        tiempoLectura: '3 min'
      });
      this.mostrarForm = false;
      this.busqueda = '';
      this.categoriaActiva = 'Todas';
      this.cargarDatos();
      alert('Noticia creada correctamente');
    } else {
      this.formNoticia.markAllAsTouched();
      alert('Complete todos los campos obligatorios');
    }
  }

  /** Helper para pintar ★ en las tarjetas hijas. */
  esFav(id: number): boolean {
    return this.noticiasService.esFavorito(id);
  }
}
