/* ============================================================================
 * NotiRed · Componente Header
 * ----------------------------------------------------------------------------
 * Encabezado con logo, menú de 5 enlaces (routerLink + routerLinkActive) y
 * badge reactivo de favoritos (suscripción al BehaviorSubject del servicio).
 * ========================================================================== */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NoticiasService } from '../../core/services/noticias.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /** Número de favoritos (interpolación en el badge). */
  favoritosCount = 0;
  private sub?: Subscription;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    // Property/event binding del menú + suscripción reactiva del contador.
    this.sub = this.noticiasService.getFavoritosCount$().subscribe((n) => {
      this.favoritosCount = n;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
