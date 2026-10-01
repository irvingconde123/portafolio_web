# Portafolio web · Irving Conde

[![Build and deploy GitHub Pages](https://github.com/irvingconde123/portafolio_web/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/irvingconde123/portafolio_web/actions/workflows/deploy-pages.yml)

Portafolio profesional construido con Ionic y Angular. Reúne proyectos, experiencia y capacidades con un resumen accesible para ingeniería, recursos humanos y clientes. Los casos ofrecen detalle técnico y evidencia pública; los ejemplos interactivos usan datos ficticios.

**Sitio:** [irvingconde123.github.io/portafolio_web](https://irvingconde123.github.io/portafolio_web/)

## Contenido

- Perfil profesional, experiencia, capacidades, GitHub y CV descargable.
- Trabajo real de Hostlyc: [sitio público de la agencia](https://hostlyc.com/) y [producto en desarrollo](https://hostlyc-parent-web.vercel.app/), identificados por separado.
- Ejemplos adaptables con estado local ficticio:
  - operación híbrida Adastra;
  - landing pública de laboratorio;
  - CMS de composición de contenido;
  - ejemplo local de la landing comercial de Hostlyc.
- Casos técnicos en `/casos/:slug` con contexto, responsabilidades, contratos, escenarios de calidad, decisiones y evidencia pública. Hostlyc incluye recorridos seleccionables de publicación y renderizado.
- Diseño adaptable para móvil, tablet y escritorio.

La presentación usa títulos contenidos y una entrada compacta con experiencia actual en escritorio. Inicio, casos, arquitectura activa y marcos de demos comparten superficies claras. [PRODUCT.md](PRODUCT.md) conserva el propósito y los límites de evidencia; [DESIGN.md](DESIGN.md) y su [sidecar](.impeccable/design.json) registran las reglas visuales implementadas.

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
npm run qa:e2e
npm run build
```

La norma de mantenibilidad de `scripts/check-source-size.mjs` limita los archivos bajo `src` a 300 líneas para TypeScript, 650 para HTML y 1500 para SCSS.

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
- `src/app/case-study`: interfaz activa de los casos técnicos.
- `src/app/data/case-studies`: modelos de los casos y contratos de arquitectura.
- `docs/DEMO-COVERAGE.md`: cobertura funcional de las demos.

Las rutas anteriores `/arquitecturas/:slug` redirigen al caso correspondiente con el fragmento `#arquitectura`. Los archivos de `src/app/architecture` conservan las tres vistas anteriores como implementación legacy; esas pantallas ya no forman parte de la navegación activa.

El caso de Hostlyc distingue tres destinos: el sitio comercial publicado, el producto en desarrollo y el ejemplo local ficticio. La [arquitectura documentada de plantillas y publicación](docs/architecture/hostlyc-plantillas.md) es un modelo conceptual; el CMS, los permisos y la invalidación descritos no se ejecutan en ese ejemplo. El alcance y las comprobaciones locales se registran en [Revisión de Hostlyc](docs/REVISION-HOSTLYC.md) y [Revisión de diseño](docs/REVISION-DISENO.md).

## Seguridad

Las demos locales no consumen APIs productivas ni ejecutan mutaciones externas. No se incluyen endpoints privados, credenciales, secretos, identificadores productivos ni topologías internas. Los registros y métricas de esas demos son demostrativos. Los enlaces de trabajo real abren sus respectivos sitios en una pestaña nueva.

## Ramas

- `main`: versión estable y fuente de GitHub Pages.
- `develop`: integración de cambios antes de publicación.
