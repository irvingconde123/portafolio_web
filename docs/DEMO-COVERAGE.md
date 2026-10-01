# Cobertura de demos y arquitectura

## Demos navegables

| Producto | Pantallas o secciones | Interacciones simuladas |
| --- | --- | --- |
| Adastra | Resumen, reportes, detalle, edición, captura y borradores | Filtros, estados, evidencia, guardado local, offline y sincronización |
| Landing laboratorio | Hero, acreditadores, servicios, misión, certificaciones, CTA y footer | Navegación por sección, catálogo de métodos, cotización y contacto |
| Lab CMS | Resumen, páginas, composición, medios, estilos y SEO | Altas, edición, visibilidad, orden, tokens y publicación de versión |
| Hostlyc · ejemplo local | Hero, servicios, proyectos, impacto, proceso, diagnóstico y footer | Navegación, casos de estudio, canales de contacto y formulario comercial simulado; no ejecuta el CMS |

Los estados se reinician al recargar. Ninguna acción escribe en servicios, almacenamiento o APIs reales.
Las confirmaciones aparecen como avisos no bloqueantes con una barra de tiempo y se cierran automáticamente después de tres segundos.
El marco claro permite alternar entre Escritorio, Tablet y Móvil sin insertar controles de tamaño dentro de las aplicaciones simuladas. Cada botón expone la selección con `aria-pressed`. Las ventanas conservan desplazamiento interno y menús adaptables.

## Trabajo real de Hostlyc

El inicio, el caso y la página del ejemplo local ofrecen primero [Ver sitio público](https://hostlyc.com/) y luego [Explorar producto en desarrollo](https://hostlyc-parent-web.vercel.app/). El primero presenta servicios y proyectos de la agencia publicada; el segundo permite explorar tiendas y planes en desarrollo, con contenido de prueba y funciones en evolución. Ninguno se presenta como una simulación del portafolio.

Los enlaces se abren directamente en otra pestaña. El ejemplo local continúa identificado con datos ficticios. Revisar que los sitios externos estén disponibles no equivale a comprobar su editor, sus permisos o su publicación.

## Revisión técnica por proyecto

La interfaz activa se encuentra en `/casos/:slug`. Cada caso presenta contexto, solución, componentes, contratos entre responsabilidades, escenarios de calidad, decisiones y evidencia pública. El estado «Modelo consistente» valida las referencias internas del modelo; no acredita un despliegue ni una topología productiva.

Las rutas legacy `/arquitecturas/:slug` redirigen al caso correspondiente en `#arquitectura`. Las antiguas vistas `C4 · Vista de contenedores`, `Vista de ejecución` y `Quality attribute view` permanecen en el código legacy, pero ya no son pantallas activas.

Hostlyc añade dos recorridos seleccionables: **Publicar cambios** y **Renderizar una tienda**. El primero separa borrador, autorización, persistencia e invalidación con reintentos; el segundo explica manifiesto, hidratación, tienda, versiones y composición de la familia visual. La [guía de plantillas editables y publicación](architecture/hostlyc-plantillas.md) recoge el fundamento documental y sus límites. La demo de `/demos/hostlyc` sigue siendo comercial, con estado ficticio: no publica contenido ni comprueba permisos o invalidación reales.

Los modelos conservan responsabilidades y límites sin publicar direcciones, nombres físicos ni configuración sensible. Las decisiones de Hostlyc descritas a partir de guías son síntesis documental; no se atribuyen como nuevos ADR aprobados. La [revisión local de Hostlyc](REVISION-HOSTLYC.md) registra la validación de esta extensión.

## Validación de la presentación

La suite E2E completa ejecutada localmente aprobó 34 pruebas y omitió 2: el escenario de arquitectura horizontal móvil se omite en los proyectos de tablet y escritorio. Cubre rutas, enlaces, temas claros, jerarquía compacta, controles de tamaño, menús, desplazamiento y el flujo editorial simulado. Las dimensiones son 360 × 800, 390 × 844, 768 × 1024 y 1440 × 900. El [reporte de diseño](REVISION-DISENO.md) registra el alcance y los límites de esa verificación.
