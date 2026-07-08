# Metas del portafolio de Irving Conde

## Objetivo

Publicar mediante GitHub Pages una aplicación Ionic adaptable que explique experiencia,
capacidades técnicas y arquitectura sin depender de servicios privados ni
exponer código, datos, credenciales o nombres internos de clientes.

## Alcance ejecutable

- [x] Presentar perfil profesional y experiencia a partir del CV vigente.
- [x] Mostrar competencias en Angular, Ionic, NestJS, Python, AWS y bases de datos.
- [x] Documentar proyectos mediante problemas, decisiones, responsabilidades y resultados.
- [x] Incluir cuatro demos navegables con datos completamente ficticios:
  - operación híbrida online/offline;
  - landing multi-tenant administrada por contenido;
  - panel CMS para composición de páginas.
  - landing comercial Hostlyc.
- [x] Dibujar arquitecturas sanitizadas para audiencia técnica con contenedores C4,
      secuencia runtime, resiliencia, NFR, patrones y trade-offs.
- [x] Mantener todo el contenido en una fuente local tipada para poder sustituirla
      después por un CMS público.
- [x] Configurar rutas SPA, build de producción y despliegue con GitHub Actions y Pages.
- [x] Agregar CV descargable, GitHub público, sección Sobre mí y miniaturas ligeras.
- [x] Verificar accesibilidad, navegación móvil/tablet/escritorio y build limpio.

## Límites de seguridad

- No se reutilizan endpoints, tokens, secretos, bases de datos ni identificadores reales.
- Las demos no ejecutan mutaciones y reinician su estado al recargar.
- Los diagramas describen patrones técnicos, no topologías ni proveedores de clientes.
- Los proyectos laborales se presentan por capacidades y responsabilidades públicas.

## Criterios de terminado

1. `npm run build` genera un artefacto desplegable.
2. Las rutas directas funcionan mediante el respaldo `404.html` de GitHub Pages.
3. Las cuatro demos permiten navegar, editar y cambiar estado local ficticio.
4. El contenido profesional puede modificarse desde un único archivo TypeScript.
5. No existen URLs privadas, credenciales ni datos productivos en el repositorio.
6. Cada proyecto dispone de un diagrama funcional y de secuencia sanitizado.
7. Adastra y CMS cubren sus flujos principales mediante estado simulado comprobable.
