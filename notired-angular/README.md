# NotiRed — Plataforma Web de Noticias (Angular)

Aplicación funcional completa desarrollada en **Angular 17+** a partir de los mockups HTML/CSS.
Cumple: componentes y binding, routing, servicios, formularios con validaciones,
persistencia en `localStorage` y mini-CRUD. Código organizado y documentado.

## 1. Funcionalidades

| # | Funcionalidad | Dónde | Cómo se evidencia |
|---|---|---|---|
| 1 | Home con destacadas | `home/` | `*ngFor` + `<app-news-card>` + newsletter `[(ngModel)]` |
| 2 | Listado con filtros | `listado/` | chips por categoría `(click)` + `[class.on]` |
| 3 | Búsqueda en vivo | `listado/` | `[(ngModel)]` + `(ngModelChange)` |
| 4 | Paginación | `listado/` | `paginaActual/porPagina`, `*ngFor` páginas |
| 5 | Detalle + relacionadas | `detalle/` | `ActivatedRoute`, `getById`, `getRelacionadas` |
| 6 | Favoritos persistentes | `detalle/listado/favoritos/header` | `localStorage` + `BehaviorSubject` (badge reactivo) |
| 7 | Contacto validado | `contacto/` | `FormGroup`, `Validators.required/email/minLength`, `*ngIf` errores + confirmación |
| 8 | Mini-CRUD crear/eliminar | `listado/` | `FormGroup` crear + botón Eliminar (`@Output`) |
| 9 | Acerca de | `acerca/` | Información del proyecto |

## 2. Componentes y binding (evidencia para la rúbrica)

| Tipo de binding | Ejemplo real en el código |
|---|---|
| Interpolación `{{ }}` | `{{ noticia.titulo }}`, `{{ favoritos.length }}`, `{{ newsletterMsg }}` |
| Property binding `[ ]` | `[noticia]="noticia"`, `[routerLink]="['/noticias', id]"`, `[class.on]="..."`, `[formGroup]` |
| Event binding `( )` | `(click)="filtrar(c)"`, `(ngSubmit)="onSubmit()"`, `(favorito)="onFavorito($event)"` |
| Two-way `[( )]` | `[(ngModel)]="busqueda"`, `[(ngModel)]="newsletterEmail"` |
| `@Input / @Output` | `NewsCardComponent`: `@Input() noticia`, `@Output() eliminar/favorito` |
| Directivas | `*ngFor`, `*ngIf`, `routerLinkActive`, `formControlName` |

Componente reutilizable: `src/app/shared/news-card/` usado en Home, Listado, Detalle (relacionadas) y Favoritos.

## 3. Estructura (código organizado)

```text
notired-angular/
├── angular.json / package.json / tsconfig.json / README.md
└── src/
    ├── index.html / main.ts / styles.css / favicon.ico
    ├── assets/data/noticias.json        # 16 noticias (JSON local)
    └── app/
        ├── app.module.ts                # FormsModule + ReactiveFormsModule + HttpClient
        ├── app-routing.module.ts        # 7 rutas + comodín
        ├── core/
        │   ├── models/noticia.model.ts  # Interface Noticia + CategoriaNoticia
        │   └── services/noticias.service.ts  # HttpClient, BehaviorSubject, CRUD
        ├── shared/
        │   └── news-card/               # @Input/@Output reutilizable
        └── features/
            ├── header/ / footer/        # Comunes (badge reactivo)
            ├── home/ / listado/ / detalle/
            └── favoritos/ / contacto/ / acerca/
```

## 4. Instalación y ejecución

Requisitos: Node.js 18+ y Angular CLI 17 (`npm i -g @angular/cli`).

```bash
cd notired-angular
npm install
ng serve            # http://localhost:4200
ng build            # salida en dist/
```

Sin servidor no hay HTTP: si abre con `file://`, el servicio usa `catchError` y
trabaja con las noticias de usuario; con `ng serve` carga las 10 del JSON.

## 5. Datos y persistencia

- `assets/data/noticias.json`: 16 noticias (6 destacadas, 5 categorías).
- `localStorage.notired_favoritos`: arreglo de ids.
- `localStorage.notired_noticias_custom`: noticias creadas (mini-CRUD).

## 6. Convenciones y documentación

- Comentario de cabecera en cada archivo (propósito, autor, fecha, dependencias).
- JSDoc en modelo, servicio y componentes.
- Nombres en español para dominio (`noticia`, `favoritos`) e inglés para Angular.
- Estilos globales en `styles.css`; CSS por componente solo para ajustes locales.

## Autor

Hugo Alexis Fonseca Diaz — Módulo Front End, 2026.
