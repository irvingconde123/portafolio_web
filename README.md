# Portafolio web · Irving Conde

[![Build and deploy GitHub Pages](https://github.com/irvingconde123/portafolio_web/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/irvingconde123/portafolio_web/actions/workflows/deploy-pages.yml)

Portafolio profesional construido con Ionic y Angular. Presenta experiencia de desarrollo de pila completa, proyectos, demos funcionales y revisiones de arquitectura sanitizadas para explicar decisiones técnicas sin exponer sistemas privados.

**Sitio:** [irvingconde123.github.io/portafolio_web](https://irvingconde123.github.io/portafolio_web/)

## Contenido

- Perfil profesional, experiencia, capacidades, GitHub y CV descargable.
- Demostraciones adaptables con estado local ficticio:
  - operación híbrida Adastra;
  - landing pública de laboratorio;
  - CMS de composición de contenido;
  - landing comercial Hostlyc.
- Arquitecturas por proyecto con vistas C4, secuencia runtime, resiliencia, NFR, patrones, trade-offs y observabilidad.
- Diseño adaptable para móvil, tablet y escritorio.

## Stack

- Angular 20
- Ionic 8
- TypeScript y SCSS
- Jasmine y Karma
- GitHub Actions y GitHub Pages

## Desarrollo local

```bash
npm ci
npm start
```

La aplicación se sirve por defecto en `http://localhost:4200`.

## Verificación

```bash
npm run quality:size
npm run lint
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```

La norma de mantenibilidad limita a 300 líneas los archivos TypeScript, HTML y SCSS bajo `src`.

## Build para GitHub Pages

```bash
npm run build:pages
```

El build usa `/portafolio_web/` como ruta base. El workflow copia `index.html` como `404.html` para que las rutas SPA directas puedan inicializar Angular dentro de GitHub Pages.

## Estructura relevante

- `src/app/data`: perfil, proyectos, evidencia y decisiones técnicas.
- `src/app/home`: presentación principal.
- `src/app/demo`: shell y componentes independientes para cada demostración.
- `src/styles/demo`: estilos desacoplados por demostración.
- `src/app/architecture`: vistas técnicas por proyecto.
- `docs/DEMO-COVERAGE.md`: cobertura funcional de las demos.

## Seguridad

Las demos no consumen APIs productivas ni ejecutan mutaciones externas. No se incluyen endpoints privados, credenciales, secretos, identificadores productivos ni topologías internas. Todos los registros y métricas son demostrativos.

## Ramas

- `main`: versión estable y fuente de GitHub Pages.
- `develop`: integración de cambios antes de publicación.
