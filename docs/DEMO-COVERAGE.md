# Cobertura de demos y arquitectura

## Demos navegables

| Producto | Pantallas o secciones | Interacciones mock |
| --- | --- | --- |
| Adastra | Resumen, reportes, detalle, edición, captura y borradores | Filtros, estados, evidencia, guardado local, offline y sincronización |
| Landing laboratorio | Hero, acreditadores, servicios, misión, certificaciones, CTA y footer | Navegación por sección, catálogo de métodos, cotización y contacto |
| Lab CMS | Resumen, páginas, composición, medios, estilos y SEO | Altas, edición, visibilidad, orden, tokens y publicación de versión |
| Hostlyc | Hero, servicios, proyectos, impacto, proceso, diagnóstico y footer | Navegación, casos de estudio, canales de contacto y formulario |

Los estados se reinician al recargar. Ninguna acción escribe en servicios, almacenamiento o APIs reales.

## Revisión técnica por proyecto

Cada proyecto expone tres vistas:

1. `C4 · Container view`: límites de confianza, contenedores, puertos y dependencias.
2. `Runtime view`: secuencia principal, ownership, ACK, timeout e idempotencia.
3. `Quality attribute view`: fallas previstas, respuesta, degradación y NFR.

También se documentan patrones, trade-offs tipo ADR, observabilidad y outcome. Los diagramas se inspiraron en la documentación local de VPC Front sobre registro de recursos, resolución dinámica, continuidad por contexto y validación de tokens one-shot; se omitieron hosts, secretos, nombres de tablas y rutas internas.
