# Metas del portafolio de Irving Conde

## Objetivo

Publicar en Vercel una aplicación Ionic responsive que explique experiencia,
capacidades técnicas y arquitectura sin depender de servicios privados ni
exponer código, datos, credenciales o nombres internos de clientes.

## Alcance ejecutable

- [x] Presentar perfil profesional y experiencia a partir del CV vigente.
- [x] Mostrar competencias en Angular, Ionic, NestJS, Python, AWS y bases de datos.
- [x] Documentar proyectos mediante problemas, decisiones, responsabilidades y resultados.
- [x] Incluir tres demos navegables con datos completamente ficticios:
  - operación híbrida online/offline;
  - landing multi-tenant administrada por contenido;
  - panel CMS para composición de páginas.
- [x] Dibujar arquitecturas sanitizadas que expliquen cliente, API, persistencia,
      sincronización y despliegue sin revelar infraestructura real.
- [x] Mantener todo el contenido en una fuente local tipada para poder sustituirla
      después por un CMS público.
- [x] Configurar rutas SPA, build de producción y despliegue en Vercel.
- [x] Verificar accesibilidad básica, navegación móvil/escritorio y build limpio.

## Límites de seguridad

- No se reutilizan endpoints, tokens, secretos, bases de datos ni identificadores reales.
- Las demos no ejecutan mutaciones y reinician su estado al recargar.
- Los diagramas describen patrones técnicos, no topologías ni proveedores de clientes.
- Los proyectos laborales se presentan por capacidades y responsabilidades públicas.

## Criterios de terminado

1. `npm run build` genera un artefacto desplegable.
2. Las rutas directas funcionan con el rewrite de Vercel.
3. Las tres demos permiten navegar y cambiar estado local ficticio.
4. El contenido profesional puede modificarse desde un único archivo TypeScript.
5. No existen URLs privadas, credenciales ni datos productivos en el repositorio.
