# Seguimiento del portafolio

Actualizado: 7 de julio de 2026.

- [x] Corregir “Explorar proyectos” en móvil. Ahora desplaza el contenedor real de `ion-content` y tiene una prueba automatizada.
- [x] Replicar con mayor fidelidad las interfaces originales. Las landings de laboratorio y Hostlyc incluyen hero, servicios, contenido institucional, evidencia, CTA, contacto y footer.
- [x] Hacer funcionales Adastra y Lab CMS. Adastra permite navegar, capturar, guardar borradores, filtrar y editar reportes, administrar evidencia, simular offline y sincronizar. El CMS permite editar páginas, bloques, medios, tokens y SEO, además de publicar versiones.
- [x] Agregar una arquitectura por proyecto. Cada ficha abre vistas de contenedores C4, secuencia runtime, fallas/NFR, patrones, trade-offs y señales operativas sin revelar topología privada.
- [x] Incorporar miniaturas. Son composiciones HTML/CSS ligeras para evitar imágenes pesadas y conservar nitidez en cualquier pantalla.
- [x] Agregar el CV descargable en `src/assets/Irving_Conde_CV.pdf`.
- [x] Revisar la referencia `portafolio-frontend-8w82.vercel.app`. Se incorporaron las ideas útiles de header, sección “Sobre mí” y descarga de CV sin copiar su paleta o identidad.
- [x] Agregar el perfil público de GitHub: `github.com/irvingconde123`.
- [x] Agregar Hostlyc y una demo basada en la rama remota más reciente `origin/feature/landing`.
- [x] Incorporar la arquitectura vigente de Hostlyc VPC Front como “Gateway dinámico multi-plataforma”. Se leyó en modo seguro porque ese repositorio conserva cambios locales sin confirmar.

## Revisión UI/UX realizada

- Paleta oscura de alto contraste con un solo acento cian y verde reservado para estados positivos.
- Escala tipográfica fluida y límites de ancho homogéneos.
- Controles táctiles de al menos 44 px, foco visible y zoom móvil habilitado.
- Grillas adaptativas para móvil, tablet y escritorio sin cambiar el orden semántico.
- Demos y arquitecturas cargadas mediante rutas lazy; no se precargan al abrir el home.
- La única fotografía se carga de forma diferida; miniaturas y diagramas no requieren recursos remotos.
- Se respeta `prefers-reduced-motion`.

## Seguridad de las demos

Todos los nombres operativos, métricas y registros son ficticios. No se incluyeron endpoints, credenciales, contratos privados ni detalles de infraestructura productiva.

La presentación técnica se basó en los ejemplos descargados de `Arquitecturas/VPC-FRONT`: resolución por recurso lógico, aislamiento de contextos, políticas fail-open/fail-closed y token one-shot. La implementación pública conserva los conceptos, pero elimina nombres físicos y configuración sensible.
