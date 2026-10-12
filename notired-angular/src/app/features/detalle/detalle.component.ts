/**
 * Componente Detalle - Muestra noticia completa con botones favoritos/contacto
 * Implementa: Interpolación, Event Binding, Routing
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  noticia: Noticia | undefined;
  esFav = false;
  relacionadas: Noticia[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noticiasService.getById(id).subscribe(data => {
      this.noticia = data;
      if (this.noticia) {
        this.esFav = this.noticiasService.esFavorito(this.noticia.id);
        this.noticiasService.getRelacionadas(this.noticia.id, this.noticia.categoria).subscribe(rel => {
          this.relacionadas = rel;
        });
      }
    });
  }

  toggleFavorito(): void {
    if (this.noticia) {
      this.noticiasService.toggleFavorito(this.noticia.id);
      this.esFav = this.noticiasService.esFavorito(this.noticia.id);
      alert(this.esFav ? 'Agregado a favoritos' : 'Eliminado de favoritos');
    }
  }

  irContacto(): void {
    this.router.navigate(['/contacto']);
  }
}
