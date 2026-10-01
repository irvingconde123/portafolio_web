# Portafolio de Irving Conde

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Ingenieros que evalúan decisiones técnicas, equipos de recursos humanos que revisan experiencia profesional y clientes que necesitan entender qué problema resuelve cada proyecto. El resumen debe ser comprensible para las tres audiencias; los casos ofrecen profundidad técnica cuando el visitante la necesita.

## Product Purpose

Presentar el perfil profesional de Irving Conde como Full Stack Engineer, su trayectoria y proyectos, con evidencia navegable y rutas de contacto. El sitio funciona como CV web y portafolio; el CV descargable es un archivo separado.

## Operating Context

La entrada reúne presentación, proyectos seleccionados, experiencia, capacidades y contacto, en ese orden. Los visitantes pueden abrir un caso, explorar un ejemplo interactivo, consultar trabajo publicado, descargar el CV o visitar GitHub y LinkedIn.

## Capabilities and Constraints

- La base existente usa Angular 20, Ionic 8, TypeScript y SCSS. Hay navegación adaptable y ejemplos con datos ficticios y estado local.
- Los casos explican problemas, participación, soluciones, decisiones y arquitectura conceptual. Las arquitecturas no acreditan por sí mismas una implementación o un despliegue productivo.
- Hostlyc se enfoca en plantillas editables y publicación. Su enlace principal es el sitio público `https://hostlyc.com/`; el acceso al producto en desarrollo `https://hostlyc-parent-web.vercel.app/` es secundario y se identifica como tal.
- El ejemplo local de la landing de Hostlyc debe identificarse explícitamente como ejemplo con datos ficticios. No ejecuta el CMS, los permisos ni la publicación descritos en su caso.
- Este repositorio presenta y explica el trabajo; no implementa un CMS real ni consume servicios privados para ejecutar los ejemplos.

## Evidence on Hand

El perfil y la trayectoria se mantienen en `src/app/data/portfolio-profile.ts`; los casos y sus fuentes están en `src/app/data/case-studies/`. La síntesis pública de Hostlyc está en `docs/architecture/hostlyc-plantillas.md`. Los enlaces públicos de Hostlyc se revisaron el 1 de octubre de 2026; esa revisión no acredita el editor, la publicación ni todas las funciones del producto en desarrollo.

## Product Principles

- Usar el espacio para contenido útil: una presentación breve y proyectos accesibles desde el comienzo, sin regiones vacías de relleno.
- Comunicar primero el problema resuelto y la participación; reservar el vocabulario especializado para el detalle técnico y explicarlo cuando sea necesario.
- Mantener títulos breves y una estructura consistente, sin rótulos ornamentales que parezcan campos de formulario.
- Dar prioridad al trabajo real y distinguir siempre sitio publicado, producto en desarrollo y ejemplo local.
- Conservar los límites de la evidencia. No inventar clientes, resultados medidos, funciones disponibles ni afirmaciones de producción.
