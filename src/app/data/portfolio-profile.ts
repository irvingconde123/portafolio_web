import { ExperienceItem, SkillGroup } from './portfolio.models';

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'DISH México · MVSHUB',
    period: 'Ago 2024 — Actualidad',
    role: 'Desarrollador full stack',
    summary:
      'Desarrollo móvil y full stack, automatizaciones con Python, integraciones, soporte productivo y validación de entregas sobre servicios AWS.',
    technologies: ['Python', 'Ionic', 'Angular', 'Lambda', 'S3', 'DynamoDB', 'CloudFront'],
  },
  {
    company: 'Hostlyc',
    period: 'Oct 2025 — Actualidad',
    role: 'Desarrollador full stack · colaboración independiente',
    summary:
      'Planeación, arquitectura y ejecución de API, aplicaciones multiplataforma y mecanismos de continuidad para web, Android y escritorio.',
    technologies: ['NestJS', 'Ionic', 'Angular', 'Electron', 'Prisma', 'TypeORM', 'PostgreSQL'],
  },
  {
    company: 'GECOSOFT',
    period: 'Mar 2022 — Mayo 2024',
    role: 'Desarrollador backend',
    summary:
      'Servicios backend, bases de datos y administración de infraestructura Linux y Windows en AWS y Azure.',
    technologies: ['Python', 'Java', 'Node.js', 'SQL Server', 'PostgreSQL', 'AWS', 'Azure'],
  },
  {
    company: 'Proyectos independientes',
    period: '2022 — 2024',
    role: 'Desarrollador full stack',
    summary:
      'Aplicaciones móviles y web para punto de venta, asistencia, clientes y análisis visual con modelos de inteligencia artificial.',
    technologies: ['Ionic', 'Angular', 'NestJS', 'Firebase', 'MySQL', 'TensorFlow'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Interfaces multiplataforma',
    description: 'Una base visual coherente para navegador, Android y escritorio.',
    skills: [
      { name: 'Angular', evidence: 'Landing dinámica y CMS', projectSlug: 'plataforma-contenido' },
      { name: 'Ionic', evidence: 'Operación híbrida', projectSlug: 'adastra' },
      { name: 'Electron', evidence: 'Distribución de escritorio', projectSlug: 'adastra' },
      { name: 'Next.js', evidence: 'Landing comercial', projectSlug: 'hostlyc' },
    ],
  },
  {
    name: 'Servicios y datos',
    description: 'Contratos, seguridad y persistencia aislados de la experiencia visual.',
    skills: [
      { name: 'NestJS', evidence: 'API, políticas y gateway', projectSlug: 'gateway-datos' },
      { name: 'PostgreSQL', evidence: 'Contenido versionado', projectSlug: 'plataforma-contenido' },
      { name: 'TypeORM', evidence: 'Resolución dinámica', projectSlug: 'gateway-datos' },
      { name: 'API REST', evidence: 'Contrato público tipado', projectSlug: 'plataforma-contenido' },
    ],
  },
  {
    name: 'Arquitectura',
    description: 'Decisiones para continuidad, evolución y límites de confianza.',
    skills: [
      { name: 'Operación sin conexión', evidence: 'Bandeja de salida cifrada', projectSlug: 'adastra' },
      { name: 'Multi-tenant', evidence: 'Tenant por dominio', projectSlug: 'plataforma-contenido' },
      { name: 'Gateway', evidence: 'Rutas y políticas', projectSlug: 'gateway-datos' },
      { name: 'Acceso dinámico a datos', evidence: 'Registro lógico', projectSlug: 'gateway-datos' },
    ],
  },
  {
    name: 'Nube y entrega',
    description: 'Automatización y operación con evidencia pública limitada por confidencialidad.',
    skills: [
      { name: 'GitHub Actions', evidence: 'CI/CD de este portafolio' },
      { name: 'AWS', evidence: 'Experiencia profesional; detalles reservados' },
      { name: 'Python', evidence: 'Automatización profesional; detalles reservados' },
    ],
  },
];
