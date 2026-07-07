# Portafolio Ionic de Irving Conde

Portafolio responsive construido con Angular e Ionic. Incluye experiencia,
proyectos, CV descargable, diagramas de arquitectura sanitizados y cuatro demos
locales sin conexión a sistemas privados.

## Desarrollo

```bash
npm install
npm start
```

## Producción

```bash
npm run build
```

El artefacto se genera en `www/`. `vercel.json` configura el rewrite necesario
para abrir directamente rutas como `/demos/adastra`.

## Contenido

- `src/app/data/portfolio-content.ts`: experiencia, habilidades y proyectos.
- `src/app/home`: presentación principal.
- `src/app/demo`: demos navegables con datos ficticios.
- `src/app/architecture`: diagramas funcionales y de secuencia por proyecto.
- `src/assets/Irving_Conde_CV.pdf`: CV público descargable.
- `docs/GOALS.md`: alcance, seguridad y criterios de terminado.

No deben agregarse endpoints, credenciales, métricas productivas ni nombres de
clientes que no formen parte de la experiencia profesional pública.
