export interface SeoRouteConfig {
  readonly title: string;
  readonly description: string;
  readonly type: 'profile' | 'website';
}

export const SEO_ROUTES: Readonly<Record<string, SeoRouteConfig>> = {
  '/': {
    title: 'Irving Conde · Full Stack Engineer',
    description:
      'Portafolio de Irving Conde: aplicaciones offline-first, Angular, Ionic y APIs NestJS.',
    type: 'profile',
  },
  '/casos/adastra': {
    title: 'Adastra · Caso de estudio',
    description:
      'Aplicación operativa offline-first con persistencia cifrada y sincronización idempotente.',
    type: 'website',
  },
  '/casos/plataforma-contenido': {
    title: 'CMS y landing · Caso de estudio',
    description:
      'Plataforma de contenido multi-tenant con CMS, landing dinámica y respaldo local tipado.',
    type: 'website',
  },
  '/casos/gateway-datos': {
    title: 'Gateway y datos · Caso de estudio',
    description:
      'Gateway resiliente y acceso dinámico a datos con aislamiento por contexto.',
    type: 'website',
  },
  '/casos/hostlyc': {
    title: 'Hostlyc · Caso de estudio',
    description:
      'Experiencia web responsive para presentar servicios de infraestructura y alojamiento.',
    type: 'website',
  },
  '/demos/adastra': {
    title: 'Demo Adastra · Datos ficticios',
    description:
      'Demostración navegable del flujo operativo Adastra con datos ficticios.',
    type: 'website',
  },
  '/demos/landing': {
    title: 'Demo landing de laboratorio · Datos ficticios',
    description:
      'Demostración de una landing de laboratorio alimentada por contenido estructurado.',
    type: 'website',
  },
  '/demos/cms': {
    title: 'Demo CMS · Datos ficticios',
    description:
      'Demostración navegable de administración editorial con datos ficticios.',
    type: 'website',
  },
  '/demos/hostlyc': {
    title: 'Demo Hostlyc · Datos ficticios',
    description:
      'Demostración responsive de la experiencia pública Hostlyc con datos ficticios.',
    type: 'website',
  },
};

export const CASE_STUDY_PATHS = [
  '/casos/adastra',
  '/casos/plataforma-contenido',
  '/casos/gateway-datos',
  '/casos/hostlyc',
] as const;
