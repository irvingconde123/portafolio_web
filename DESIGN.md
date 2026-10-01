---
name: Portafolio de Irving Conde
description: Presentación profesional compacta con proyectos y evidencia navegable.
colors:
  primary: "#0f4c81"
  primary-hover: "#0b3c68"
  accent: "#0e7490"
  canvas: "#f8fafc"
  surface: "#ffffff"
  soft: "#eef4f8"
  line: "#cbd5e1"
  line-strong: "#94a3b8"
  text: "#0f172a"
  muted: "#475569"
  success: "#15803d"
  preview-selected: "#2c4e78"
  hostlyc-red: "#c90031"
  laboratory-yellow: "#ffd400"
typography:
  display-home:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(2rem, 3.2vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  display-case:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(1.9rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline-home:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(1.5rem, 2.3vw, 1.875rem)"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline-case:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)"
    fontWeight: 700
    letterSpacing: "-0.025em"
  headline-demo-hero:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(2rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title-home:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "1.15rem"
    fontWeight: 750
    lineHeight: 1.35
  body:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  navigation:
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  tag: "0.35rem"
  control: "0.65rem"
  project: "0.8rem"
  architecture-node: "0.75rem"
spacing:
  compact: "0.5rem"
  action-gap: "0.75rem"
  grid-gap: "1rem"
  card-inset: "1.25rem"
  section-inset: "2rem"
  section-block: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1rem"
  technology-tag:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.tag}"
    padding: "0.3rem 0.5rem"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.project}"
    padding: "{spacing.card-inset}"
---

# Sistema de diseño: Portafolio de Irving Conde

## Overview

**Creative North Star: "Portafolio profesional compacto"**

Este registro describe el diseño implementado: superficies claras, azul en las acciones y una jerarquía moderada que permite leer proyectos y trayectoria sin recorrer grandes zonas vacías. Conserva la identidad del portafolio y la hace consistente entre inicio, casos y marcos de demostración.

El marco recede frente al contenido. Los ejemplos conservan sus acentos de proyecto —rojo en Hostlyc y amarillo en el laboratorio— dentro de superficies claras. La densidad se obtiene con composición y espaciado; no exige reducir todos los textos al tamaño de una etiqueta.

**Key Characteristics:**

- Títulos breves con una escala contenida.
- Superficies blancas y separadores suaves.
- Acciones distinguibles, foco visible y contenido adaptable.
- Estilos del inicio limitados a su propia página.

Fuentes de este registro: `src/global.scss`, `src/styles/_home.scss`, `src/styles/_home-responsive.scss`, `src/app/case-study/case-study.page.scss` y `src/styles/demo/`. La documentación de producto está en `PRODUCT.md`.

## Colors

La paleta principal combina azul profundo y cian con neutros fríos; los colores de proyecto se mantienen dentro de sus ejemplos.

### Primary

- **Azul de acción:** enlaces principales, botones y texto que conduce a un caso o trabajo público.
- **Azul profundo al pasar el puntero:** respuesta del botón principal del inicio.
- **Cian de foco:** foco del marco y acentos de contratos de arquitectura.

### Secondary

- **Rojo Hostlyc:** acciones y énfasis del ejemplo comercial local.
- **Amarillo laboratorio:** acciones del ejemplo de laboratorio; se combina con texto oscuro.
- **Azul de selección del marco:** tamaño de previsualización activo.

### Neutral

- **Lienzo frío:** fondo general en inicio, casos y demos.
- **Superficie blanca:** tarjetas, encabezados y panel técnico.
- **Superficie suave:** tecnologías y apoyo visual discreto.
- **Línea y línea fuerte:** separación de regiones y respuesta de tarjetas al puntero.
- **Texto y texto secundario:** títulos, lectura y contexto. El verde se reserva para estados como una decisión aceptada.

**The Continuidad Rule.** El marco de una demo y la arquitectura activa usan superficies claras de la misma familia que el inicio. El color de un proyecto no sustituye el tema del portafolio.

## Typography

**Display Font:** Inter variable autoalojada, con Segoe UI, Arial y sans-serif como alternativas.
**Body Font:** la misma pila. `global.scss` carga `src/assets/fonts/InterVariable.woff2` con `@font-face`, pesos (100–900) y `font-display: swap`. La licencia SIL OFL 1.1 y el origen están en `src/assets/fonts/`. El empaquetador resuelve la URL; no hay una precarga adicional. La revisión local confirmó la fuente cargada y una sola solicitud.

### Hierarchy

- **Display de inicio:** máximo de (44 px); móvil usa `clamp(1.875rem, 6.8vw, 2.25rem)`. No aplicar esta regla globalmente a las demos.
- **Display de caso:** máximo de (40 px), con interlínea ajustada para títulos breves.
- **Headline de inicio:** máximo de (30 px); en móvil se fija en (24 px).
- **Headline de caso:** máximo de (28 px). Las subsecciones narrativas usan una escala menor.
- **Hero de ejemplo:** máximo de (40 px). Hostlyc emplea interlínea (1.08); el laboratorio, (1.1). Las secciones siguientes se limitan a (28 px).
- **Body:** lectura principal entre (14–16 px), con resúmenes de proyecto en (15 px) e interlínea (1.6). Las notas, tecnologías y controles de aplicaciones simuladas conservan escalas menores según su función.
- **Navigation:** (14 px) en el inicio; texto normal, sin convertir cada enlace en un rótulo en mayúsculas.

**The Jerarquía moderada Rule.** Un título de sección debe orientar al lector sin dominar una pantalla completa. No reintroducir rótulos ornamentales encima de los títulos del portafolio.

## Layout

El inicio usa un contenedor de (80 rem) con (2 rem) de margen interno lateral y (3 rem) entre bloques. La introducción tiene dos columnas con contenido real y un espacio de (3.5 rem): presentación y experiencia actual. No hay una altura mínima que fuerce un hero de pantalla completa. A (700 px) o menos se elimina la columna lateral de experiencia; la trayectoria completa permanece en su sección.

Los proyectos y capacidades usan dos columnas y pasan a una a (700 px) o menos. Las tarjetas tienen un espacio de (1 rem) y relleno de (1.25 rem), que baja a (1.125 rem) en móvil. La navegación del inicio cambia a menú a (980 px) o menos y mantiene el acceso al CV.

Los casos tienen un máximo de (76 rem); el texto narrativo se limita normalmente a (65 ch). A (760 px) o menos, el resumen y las decisiones se apilan, mientras responsabilidades y contratos tienen desplazamiento horizontal interno con una indicación visible.

Las demos usan un contenedor de (88 rem), un marco sencillo y desplazamiento dentro de la aplicación. El tamaño elegido cambia el ancho disponible; la previsualización móvil se limita a (350 px) y la tablet a (48 rem). Los menús y diálogos deben permanecer dentro de su ventana y seguir siendo alcanzables mediante teclado y desplazamiento.

**The Espacio útil Rule.** Una columna o región reservada debe tener contenido que ayude a evaluar el trabajo. Eliminar espacios de relleno sin comprimir la lectura ni las áreas de interacción.

## Elevation & Depth

Las tarjetas de proyecto, la arquitectura y el marco de demos distinguen regiones con fondos y bordes. No necesitan sombras ambientales para parecer separadas. La sombra del menú del inicio sirve a su condición de panel superpuesto; los menús y diálogos de las aplicaciones simuladas conservan su propia elevación.

El cambio de ancho de la demo tiene una transición breve (0.2 s, ease). El marco respeta la preferencia de movimiento reducido mediante la regla global. No se añaden animaciones de relleno a la presentación profesional.

## Shapes

Los controles y tarjetas tienen esquinas discretamente redondeadas. Las tecnologías se presentan como pequeñas etiquetas suaves, sin apariencia de campo editable. Los nodos técnicos usan tarjetas con borde; las tablas mantienen separadores legibles. Los campos reales de los ejemplos conservan sus etiquetas asociadas y su forma de entrada.

## Components

### Buttons

Las acciones del inicio tienen una altura mínima de (2.75 rem), texto de (0.875 rem) y peso (750). El botón principal usa azul con texto blanco; el secundario usa blanco y borde azul. Al pasar el puntero cambian el fondo. El foco global usa un contorno de (3 px), separado (3 px) del elemento.

### Chips

Las tecnologías del inicio son texto informativo, no controles: fondo suave, tamaño de (0.75 rem) y relleno contenido. Los selectores de recorridos y tamaño son botones reales; exponen el estado mediante `aria-pressed` además del color.

### Cards / Containers

La tarjeta de proyecto reúne nombre, problema resuelto, tecnologías y acciones. Los enlaces de trabajo público tienen mayor peso que el ejemplo local. El borde se refuerza al pasar el puntero; el contenido no depende de esa respuesta para ser legible.

Los nodos de arquitectura usan un fondo ligeramente distinto de la superficie. Sus tipos —actor, contenedor, componente o datos— son información técnica; no son rótulos decorativos del portafolio.

### Inputs / Fields

Los campos pertenecen a las aplicaciones simuladas. Mantienen etiquetas, bordes y foco visible. No trasladar su lenguaje de formulario al resumen profesional. El campo comercial local de Hostlyc usa blanco, texto oscuro y foco rojo; no envía información a servicios reales.

### Navigation

El encabezado del inicio es fijo al desplazarse y tiene una altura mínima de (4.25 rem), reducida a (4 rem) en móvil. La navegación del inicio está limitada a `app-home`; sus reglas de títulos, pies de página y botones no deben afectar los componentes de las demos. Los enlaces externos usan `noopener noreferrer`; en los casos y la página de demo, el texto accesible anuncia la apertura en pestaña nueva.

### Marco de previsualización

Un encabezado compacto explica el ejemplo y ofrece Escritorio, Tablet y Móvil. Un borde claro enmarca el contenido; las piezas decorativas de dispositivos permanecen ocultas. Hostlyc presenta primero los accesos al sitio público y al producto en desarrollo, y luego el ejemplo local identificado con datos ficticios.

## Do's and Don'ts

### Do:

- **Do** usar la paleta y escala de cada superficie sin introducir reglas globales que se filtren a las demos.
- **Do** mantener foco visible, controles reales y estados seleccionados accesibles.
- **Do** comprobar lectura y navegación en escritorio, tablet y móvil después de cambiar densidad o tamaños.
- **Do** mantener la distinción visual y textual entre trabajo público, producto en desarrollo y ejemplo local.

### Don't:

- **Don't** restaurar grandes zonas vacías del hero ni aumentar títulos para compensar falta de contenido.
- **Don't** añadir rótulos ornamentales en mayúsculas a cada sección del portafolio.
- **Don't** usar un marco negro o una carcasa decorativa pesada para presentar las demos claras.
- **Don't** eliminar etiquetas de campos reales al simplificar la presentación profesional.
- **Don't** documentar una fuente cargada, un despliegue o una función como comprobados a partir de una declaración CSS o un modelo conceptual.
