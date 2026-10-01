# Revisión de diseño del portafolio

**Fecha:** 2026-10-01. **Rama:** `feat/hostlyc-template-architecture`.

La mejora responde al exceso de espacio vacío, los títulos desproporcionados, los rótulos ornamentales y la diferencia entre el inicio claro y los marcos oscuros de demos y arquitectura. Este reporte registra la validación local del 1 de octubre de 2026, realizada antes de la publicación. El CV en PDF conserva su archivo existente.

Al subir los cambios a `main`, el workflow `.github/workflows/deploy-pages.yml` ejecuta sus comprobaciones y publica el portafolio en GitHub Pages si estas finalizan correctamente. El resultado de ese workflow determina el estado del despliegue; este reporte documenta la validación previa.

## Cambios aplicados

La entrada ahora reúne una presentación breve y experiencia actual, sin reservar una columna vacía ni forzar una altura de pantalla completa. En móvil muestra la presentación; la trayectoria continúa disponible en su sección. Los primeros proyectos aparecen antes y usan títulos, resúmenes y acciones más contenidos.

Los proyectos explican primero qué resuelven. El resumen de contenido por organización reemplaza el tecnicismo «multi-tenant» en la entrada; el detalle técnico permanece en los casos. Se eliminaron rótulos ornamentales y las grandes frases de sección, conservando las etiquetas que necesitan los campos reales de las simulaciones.

Inicio, casos, arquitectura activa y marcos de demos usan superficies claras. El panel de arquitectura ofrece tarjetas y contratos legibles; las demos tienen un marco sencillo y mantienen el desplazamiento interno. Hostlyc conserva su acento rojo y el laboratorio su amarillo. No se agregaron imágenes ni nuevos assets de producto.

Los estilos del inicio quedan limitados a `app-home`, para evitar que sus reglas de títulos, botones y pies de página alteren las aplicaciones simuladas. Los controles de tamaño y recorridos usan botones con `aria-pressed`. Los enlaces externos usan `noopener noreferrer`; los casos y la página de demo anuncian su apertura en una pestaña nueva mediante texto accesible.

Inter variable se sirve desde el propio proyecto con `@font-face`, pesos 100–900 y `font-display: swap`. Se conservaron licencia SIL OFL 1.1, origen oficial y hash en `src/assets/fonts/`. La comprobación local confirmó estado `loaded`, la pila calculada de Inter y una sola solicitud. No se usa una precarga adicional que duplique la URL resuelta por el empaquetador. Las capturas finales se volvieron a tomar con la fuente cargada.

Las reglas duraderas se registran en [DESIGN.md](../DESIGN.md) y [.impeccable/design.json](../.impeccable/design.json). [PRODUCT.md](../PRODUCT.md) registra audiencias, propósito y límites de evidencia.

## Destinos de Hostlyc

| Destino | Presentación y alcance |
| --- | --- |
| [Sitio público](https://hostlyc.com/) | Acceso principal al trabajo comercial publicado de la agencia. |
| [Producto en desarrollo](https://hostlyc-parent-web.vercel.app/) | Acceso secundario a tiendas y planes; conserva contenido de prueba y funciones en evolución. |
| `/demos/hostlyc` | Ejemplo local de la landing con datos ficticios y estado simulado. No ejecuta el CMS ni los servicios de publicación. |

Los dos sitios externos se revisaron el 1 de octubre de 2026 sin iniciar sesión. Se encontraron contenido de prueba y diferencias entre capacidades de planes en la vista de desarrollo; por eso su acceso se identifica como desarrollo. La revisión de navegación pública no valida el editor ni acredita la ejecución de los contratos del modelo documental.

## Validación local

| Comprobación | Resultado |
| --- | --- |
| Norma de tamaño | Aprobada para 85 archivos. Límites: TypeScript 300, HTML 650 y SCSS 1500 líneas. |
| Lint | Aprobado. |
| Pruebas unitarias con ChromeHeadless | 39 aprobadas. |
| Suite E2E completa | 34 aprobadas y 2 omitidas. |
| Viewports E2E | 360 × 800, 390 × 844, 768 × 1024 y 1440 × 900. |
| `build:pages` | Aprobado; 9 rutas estáticas. Bundle inicial 326.81 kB, transferencia estimada 91.69 kB. |
| Errores del navegador en la revisión local | Sin errores registrados por `agent-browser`. |
| `git diff --check` | Sin errores de espacios. |
| Revisión visual independiente | Disposición `ship`; sin regresiones materiales en diez recapturas finales con Inter cargada. |

Las dos omisiones E2E corresponden al escenario de desplazamiento horizontal de arquitectura diseñado para móvil, que no se ejecuta en tablet y escritorio. La suite conserva comprobaciones de menús, desplazamiento con rueda y tacto, cambio de tamaño, navegación y edición de contenido simulado. La ejecución E2E final se realizó después de incorporar Inter.

Las pruebas unitarias emitieron la advertencia Angular `NG0956` existente en la comprobación de reconstrucción de colecciones del CMS, sin fallos. No se ejecutó una nueva auditoría Lighthouse y estos resultados no representan una certificación integral de accesibilidad ni de rendimiento de producción.

## Límites conservados

La arquitectura de Hostlyc es una síntesis conceptual de documentación pública revisada al 29-09-2026. «Modelo consistente» valida referencias y contratos del modelo; no acredita infraestructura ni un despliegue. Los ejemplos permanecen separados de los sistemas reales y no ejecutan mutaciones en ellos.

Las capturas de revisión están en `.impeccable/review/` y son evidencia local de esta sesión. La documentación de sistema registra únicamente reglas implementadas; no convierte estilos legacy, rótulos de aplicaciones simuladas ni decoraciones existentes en patrones obligatorios para futuras superficies.
