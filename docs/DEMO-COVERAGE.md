# Cobertura de demos y arquitectura

## Demos navegables

| Producto | Pantallas o secciones | Interacciones simuladas |
| --- | --- | --- |
| Adastra | Resumen, reportes, detalle, edición, captura y borradores | Filtros, estados, evidencia, guardado local, offline y sincronización |
| Landing laboratorio | Hero, acreditadores, servicios, misión, certificaciones, CTA y footer | Navegación por sección, catálogo de métodos, cotización y contacto |
| Lab CMS | Resumen, páginas, composición, medios, estilos y SEO | Altas, edición, visibilidad, orden, tokens y publicación de versión |
| Hostlyc | Hero, servicios, proyectos, impacto, proceso, diagnóstico y footer | Navegación, casos de estudio, canales de contacto y formulario |

Los estados se reinician al recargar. Ninguna acción escribe en servicios, almacenamiento o APIs reales.
Las confirmaciones aparecen como avisos no bloqueantes con una barra de tiempo y se cierran automáticamente después de tres segundos.
El shell de demos permite alternar entre previsualización web y móvil sin insertar controles de dispositivo dentro de las aplicaciones simuladas.

## Revisión técnica por proyecto

Cada proyecto expone tres vistas:

1. `C4 · Vista de contenedores`: límites de confianza, contenedores, puertos y dependencias.
2. `Vista de ejecución`: secuencia tipo UML con participantes, líneas de vida, responsabilidad, confirmación, tiempo límite e idempotencia.
3. `Quality attribute view`: fallas previstas, respuesta, degradación y NFR.

También se documentan patrones, compensaciones tipo ADR, observabilidad y resultado. Los diagramas se inspiraron en la documentación local de VPC Front sobre registro de recursos, resolución dinámica, continuidad por contexto y validación de tokens de un solo uso; se omitieron hosts, secretos, nombres de tablas y rutas internas.

El gateway profundiza en admisión con contrapresión, caché de configuración, resolución por recurso lógico y adaptación hacia destinos internos. La representación conserva responsabilidades y límites, pero no publica direcciones, nombres físicos ni configuración sensible.
