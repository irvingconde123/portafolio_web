export interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  summary: string;
  technologies: string[];
}

export interface ProjectItem {
  slug?: string;
  name: string;
  kind: string;
  summary: string;
  impact: string;
  technologies: string[];
  architecture: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'DISH México · MVSHUB',
    period: 'Ago 2024 — Actualidad',
    role: 'Full Stack Developer',
    summary:
      'Desarrollo móvil y full stack, automatizaciones Python, integraciones, soporte productivo y validación de entregas sobre servicios AWS.',
    technologies: [
      'Python',
      'Ionic',
      'Angular',
      'Lambda',
      'S3',
      'DynamoDB',
      'CloudFront',
    ],
  },
  {
    company: 'Hostlyc',
    period: 'Oct 2025 — Actualidad',
    role: 'Full Stack Developer',
    summary:
      'Diseño de arquitecturas, APIs REST y aplicaciones multiplataforma con operación resiliente para web, Android y escritorio.',
    technologies: [
      'NestJS',
      'Ionic',
      'Angular',
      'Electron',
      'Prisma',
      'TypeORM',
      'PostgreSQL',
    ],
  },
  {
    company: 'GECOSOFT',
    period: 'Mar 2022 — May 2024',
    role: 'Backend Developer',
    summary:
      'Servicios backend, bases de datos y administración de infraestructura Linux y Windows en AWS y Azure.',
    technologies: [
      'Python',
      'Java',
      'Node.js',
      'SQL Server',
      'PostgreSQL',
      'AWS',
      'Azure',
    ],
  },
  {
    company: 'Proyectos independientes',
    period: '2022 — 2024',
    role: 'Full Stack Developer',
    summary:
      'Aplicaciones móviles y web para punto de venta, asistencia, clientes y análisis visual con modelos de IA.',
    technologies: [
      'Ionic',
      'Angular',
      'NestJS',
      'Firebase',
      'MySQL',
      'TensorFlow',
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'adastra',
    name: 'Operación híbrida de laboratorio',
    kind: 'Web · Android · Escritorio',
    summary:
      'Aplicación operativa con captura offline cifrada, caché local, sincronización idempotente y continuidad de sesión.',
    impact:
      'El flujo puede continuar sin red y reconciliar cambios sin duplicar información.',
    technologies: [
      'Ionic',
      'Angular',
      'NestJS',
      'SQLite',
      'IndexedDB',
      'Electron',
    ],
    architecture: [
      'Cliente híbrido',
      'Router de persistencia',
      'Outbox cifrado',
      'API transaccional',
      'PostgreSQL',
    ],
  },
  {
    slug: 'landing',
    name: 'Landing pública multi-tenant',
    kind: 'Frontend dinámico',
    summary:
      'Renderizador de páginas y secciones configurables con adaptadores que aíslan el contrato remoto del modelo visual.',
    impact:
      'Una misma aplicación presenta contenido diferente por organización sin recompilar.',
    technologies: ['Angular', 'TypeScript', 'Responsive UI', 'REST API'],
    architecture: [
      'API pública',
      'Source',
      'Adapter',
      'Repository',
      'Renderer registry',
    ],
  },
  {
    slug: 'cms',
    name: 'CMS de composición visual',
    kind: 'Administración de contenido',
    summary:
      'Panel para administrar navegación, páginas, componentes, medios y tokens publicados de forma segura.',
    impact:
      'Separa cambios editoriales de despliegues técnicos y conserva contratos validados.',
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'RBAC', 'Media'],
    architecture: [
      'Editor CMS',
      'Validación',
      'API protegida',
      'Contenido versionado',
      'API pública',
    ],
  },
  {
    name: 'Servicios y automatización cloud',
    kind: 'Backend · Cloud',
    summary:
      'APIs, procesos serverless, almacenamiento y entrega de activos diseñados con observabilidad y límites claros.',
    impact:
      'Automatiza procesos repetibles y desacopla cómputo, datos y distribución.',
    technologies: [
      'Python',
      'NestJS',
      'Lambda',
      'S3',
      'DynamoDB',
      'CloudFront',
    ],
    architecture: [
      'Cliente',
      'API / función',
      'Reglas de negocio',
      'Persistencia',
      'Observabilidad',
    ],
  },
];

export const SKILLS = [
  'TypeScript',
  'Python',
  'Angular',
  'Ionic',
  'NestJS',
  'Electron',
  'PostgreSQL',
  'AWS',
  'Arquitectura de sistemas',
  'Offline-first',
  'APIs REST',
  'CI/CD',
];
