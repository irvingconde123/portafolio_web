# Revisión de Hostlyc

**Fecha:** 2026-10-01. **Rama:** `feat/hostlyc-template-architecture`.

La revisión amplía el caso técnico de Hostlyc con foco en plantillas editables y publicación y mejora su presentación dentro del portafolio. Este reporte registra la validación local del 1 de octubre de 2026, realizada antes de la publicación.

## Alcance entregado

El caso `/casos/hostlyc` presenta responsabilidades, contratos, límites y escenarios de calidad basados en las guías revisadas el 29-09-2026. Incluye dos recorridos seleccionables: **Publicar cambios** y **Renderizar una tienda**. La [guía de arquitectura](architecture/hostlyc-plantillas.md) explica manifiesto, hidratación, borradores, publicación autorizada y revalidación con reintentos.

El inicio, el caso y la página del ejemplo local ofrecen como acceso principal [Ver sitio público](https://hostlyc.com/), con servicios y proyectos de la agencia publicada. El acceso secundario [Explorar producto en desarrollo](https://hostlyc-parent-web.vercel.app/) lleva a tiendas y planes en evolución. Se encontraron contenido de prueba y diferencias entre capacidades de planes en esa vista; no se presenta como un producto terminado.

La demo `/demos/hostlyc` se identifica como ejemplo local de la landing, conserva su alcance comercial y sus datos ficticios. No ejecuta el CMS, servicios de publicación, permisos ni invalidación reales. Las decisiones documentadas se presentan como síntesis de las guías y propuestas identificadas; no acreditan autoría de nuevos ADR ni un despliegue productivo. Revisar los sitios públicos no valida esas funciones internas.

La interfaz técnica activa es `case-study`. Se comprobó que `/arquitecturas/hostlyc` redirige a `/casos/hostlyc#arquitectura` sin errores de navegador. Las tres vistas anteriores de arquitectura permanecen como código legacy fuera de la navegación activa.

## Continuidad visual

La mejora conserva azul y cian en la presentación principal y convierte la arquitectura y el marco de demos a superficies claras. Reduce títulos y espaciado, usa nombres legibles en los contratos y mantiene la profundidad técnica dentro del caso. El ejemplo local conserva el acento rojo de Hostlyc, con fondo blanco y títulos contenidos. Inter variable se carga desde el proyecto con su licencia SIL OFL 1.1; se verificó la fuente cargada antes de recapturar las vistas finales.

El selector de recorridos utiliza acciones con estado seleccionado accesible y foco visible. El diseño implementado se registra en [DESIGN.md](../DESIGN.md) y [.impeccable/design.json](../.impeccable/design.json); [PRODUCT.md](../PRODUCT.md) conserva propósito, audiencias y límites. La [revisión de diseño](REVISION-DISENO.md) desarrolla el cambio de todo el portafolio.

## Validación local

| Comprobación | Resultado |
| --- | --- |
| Tamaño de fuentes y lint | Aprobados; 85 archivos revisados por la norma de tamaño. Límites: TypeScript 300, HTML 650 y SCSS 1500 líneas. |
| Pruebas unitarias con ChromeHeadless | 39 aprobadas. |
| `build:pages` | Aprobado; 9 rutas estáticas. Bundle inicial 326.81 kB y transferencia estimada 91.69 kB. |
| Suite E2E completa | 34 aprobadas y 2 omitidas. La prueba específica de arquitectura horizontal móvil se omite en tablet y escritorio. |
| Viewports E2E | 360 × 800, 390 × 844, 768 × 1024 y 1440 × 900. |
| Navegador local y diff | Sin errores registrados por `agent-browser`; `git diff --check` limpio. |
| Revisión visual independiente | Disposición `ship`; sin regresiones materiales en diez recapturas finales con Inter cargada. |

La validación E2E corresponde a la suite completa del portafolio, se ejecutó después de incorporar Inter y conserva las comprobaciones funcionales de sus ejemplos. Las pruebas unitarias emitieron la advertencia Angular `NG0956` existente en la comprobación de reconstrucción de colecciones del CMS, sin fallos.

`npm audit` reportó 53 vulnerabilidades existentes: 4 bajas, 14 moderadas, 34 altas y 1 crítica. No se cambiaron dependencias. Este resultado registra el árbol instalado y no permite inferir exposición de producción.

## Fuentes y disponibilidad

Las fuentes públicas revisadas al 29-09-2026 son **Arquitectura pública de Hostlyc — README**, **03 · Plantillas reutilizables, tiendas diferentes**, **02 · Datos frescos sin multiplicar consultas**, **01 · Hostlyc: un ecosistema, varias experiencias** y **Mapa del ecosistema**. La guía enlazada desarrolla su relación con el caso sin incluir rutas absolutas ni datos sensibles.

Los enlaces de evidencia de la interfaz apuntan a archivos de la rama `main` en GitHub. Al subir los cambios a `main`, el workflow `.github/workflows/deploy-pages.yml` ejecuta sus comprobaciones y publica el portafolio en GitHub Pages si estas finalizan correctamente. El resultado de ese workflow determina el estado del despliegue; este reporte documenta la validación previa.

Los rótulos ornamentales del portafolio y las marcas redundantes se retiraron de la presentación de casos. Las etiquetas funcionales de campos y tipos de arquitectura se conservan por su significado. Los estilos legacy y las decoraciones de otras aplicaciones simuladas no se registran como patrones obligatorios del nuevo documento de diseño.
