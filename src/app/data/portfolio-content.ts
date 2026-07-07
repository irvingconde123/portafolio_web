export interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  summary: string;
  technologies: string[];
}

export interface ArchitectureStep {
  label: string;
  detail: string;
}

export interface SequenceStep {
  from: string;
  action: string;
  to: string;
}

export interface ProjectItem {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  impact: string;
  technologies: string[];
  architecture: ArchitectureStep[];
  sequence: SequenceStep[];
  decisions: string[];
  preview: 'operations' | 'laboratory' | 'cms' | 'agency' | 'gateway' | 'cloud';
  hasDemo: boolean;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'DISH México · MVSHUB',
    period: 'Ago 2024 — Actualidad',
    role: 'Full Stack Developer',
    summary:
      'Desarrollo móvil y full stack, automatizaciones Python, integraciones, soporte productivo y validación de entregas sobre servicios AWS.',
    technologies: ['Python', 'Ionic', 'Angular', 'Lambda', 'S3', 'DynamoDB', 'CloudFront'],
  },
  {
    company: 'Hostlyc',
    period: 'Oct 2025 — Actualidad',
    role: 'Full Stack Developer',
    summary:
      'Diseño de arquitecturas, APIs REST y aplicaciones multiplataforma con operación resiliente para web, Android y escritorio.',
    technologies: ['NestJS', 'Ionic', 'Angular', 'Electron', 'Prisma', 'TypeORM', 'PostgreSQL'],
  },
  {
    company: 'GECOSOFT',
    period: 'Mar 2022 — May 2024',
    role: 'Backend Developer',
    summary:
      'Servicios backend, bases de datos y administración de infraestructura Linux y Windows en AWS y Azure.',
    technologies: ['Python', 'Java', 'Node.js', 'SQL Server', 'PostgreSQL', 'AWS', 'Azure'],
  },
  {
    company: 'Proyectos independientes',
    period: '2022 — 2024',
    role: 'Full Stack Developer',
    summary:
      'Aplicaciones móviles y web para punto de venta, asistencia, clientes y análisis visual con modelos de IA.',
    technologies: ['Ionic', 'Angular', 'NestJS', 'Firebase', 'MySQL', 'TensorFlow'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'adastra',
    name: 'Operación híbrida de laboratorio',
    kind: 'Web · Android · Escritorio',
    summary:
      'Aplicación operativa con captura offline cifrada, caché local, sincronización idempotente y continuidad de sesión.',
    impact: 'El flujo puede continuar sin red y reconciliar cambios sin duplicar información.',
    technologies: ['Ionic', 'Angular', 'NestJS', 'SQLite', 'IndexedDB', 'Electron'],
    preview: 'operations',
    hasDemo: true,
    architecture: [
      { label: 'Cliente híbrido', detail: 'Una interfaz adaptable para web, Android y escritorio.' },
      { label: 'Router de persistencia', detail: 'Deriva preferencias a IndexedDB y operación compleja a SQLite.' },
      { label: 'Outbox cifrado', detail: 'Conserva cambios pendientes con identidad e idempotencia.' },
      { label: 'API transaccional', detail: 'Valida la sincronización y confirma cada lote de forma atómica.' },
      { label: 'Datos operativos', detail: 'Mantiene la fuente de verdad y el historial auditable.' },
    ],
    sequence: [
      { from: 'Operador', action: 'Edita un reporte', to: 'App híbrida' },
      { from: 'App híbrida', action: 'Cifra y encola el cambio', to: 'SQLite' },
      { from: 'Monitor de red', action: 'Detecta conectividad', to: 'Sincronizador' },
      { from: 'Sincronizador', action: 'Envía lote idempotente', to: 'API' },
      { from: 'API', action: 'Confirma o revierte el lote', to: 'App híbrida' },
    ],
    decisions: ['Offline-first real', 'Cifrado en reposo', 'Reintentos sin duplicados', 'Diseño por identidades'],
  },
  {
    slug: 'landing',
    name: 'Landing pública multi-tenant',
    kind: 'Frontend dinámico',
    summary:
      'Renderizador de páginas y secciones configurables con adaptadores que aíslan el contrato remoto del modelo visual.',
    impact: 'Una misma aplicación presenta contenido diferente por organización sin recompilar.',
    technologies: ['Angular', 'TypeScript', 'Responsive UI', 'REST API'],
    preview: 'laboratory',
    hasDemo: true,
    architecture: [
      { label: 'Contexto del sitio', detail: 'Resuelve la organización desde dominio o configuración.' },
      { label: 'Source', detail: 'Alterna entre API pública y contenido local de respaldo.' },
      { label: 'Adapter', detail: 'Traduce contratos externos a un modelo estable de presentación.' },
      { label: 'Repository', detail: 'Expone una única entrada de datos al resto de la aplicación.' },
      { label: 'Renderer registry', detail: 'Selecciona el componente adecuado para cada tipo de sección.' },
    ],
    sequence: [
      { from: 'Visitante', action: 'Abre el dominio', to: 'Landing' },
      { from: 'Landing', action: 'Resuelve el tenant', to: 'Repositorio' },
      { from: 'Repositorio', action: 'Consulta contenido público', to: 'API / fallback' },
      { from: 'Adapter', action: 'Normaliza datos y estilos', to: 'Modelo visual' },
      { from: 'Registry', action: 'Compone las secciones', to: 'Navegador' },
    ],
    decisions: ['Contrato visual estable', 'Fallback local', 'Renderers extensibles', 'SEO por tenant'],
  },
  {
    slug: 'cms',
    name: 'CMS de composición visual',
    kind: 'Administración de contenido',
    summary:
      'Panel para administrar navegación, páginas, componentes, medios y tokens publicados de forma segura.',
    impact: 'Separa cambios editoriales de despliegues técnicos y conserva contratos validados.',
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'RBAC', 'Media'],
    preview: 'cms',
    hasDemo: true,
    architecture: [
      { label: 'Editor CMS', detail: 'Organiza formularios y composición según el módulo habilitado.' },
      { label: 'Validación', detail: 'Aplica esquemas, permisos y reglas antes de enviar cambios.' },
      { label: 'API protegida', detail: 'Resuelve sesión, tenant y autorización por recurso.' },
      { label: 'Contenido versionado', detail: 'Conserva borradores, publicación y trazabilidad.' },
      { label: 'API pública', detail: 'Entrega únicamente el contenido listo para consumo.' },
    ],
    sequence: [
      { from: 'Editor', action: 'Modifica una sección', to: 'CMS' },
      { from: 'CMS', action: 'Valida esquema y permisos', to: 'API protegida' },
      { from: 'API', action: 'Guarda nueva versión', to: 'Contenido' },
      { from: 'Editor', action: 'Solicita publicación', to: 'API' },
      { from: 'API pública', action: 'Sirve versión activa', to: 'Landing' },
    ],
    decisions: ['RBAC y tenant', 'Versionado editorial', 'Medios desacoplados', 'Publicación controlada'],
  },
  {
    slug: 'hostlyc',
    name: 'Landing comercial Hostlyc',
    kind: 'Next.js · Diseño responsive',
    summary:
      'Experiencia comercial orientada a conversión con servicios, proyectos, proceso, diagnóstico y contacto.',
    impact: 'Convierte una oferta técnica amplia en una narrativa clara, rápida y accionable.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SEO'],
    preview: 'agency',
    hasDemo: true,
    architecture: [
      { label: 'App Router', detail: 'Entrega la página y metadatos desde una estructura orientada a secciones.' },
      { label: 'Contenido tipado', detail: 'Separa textos y colecciones de los componentes de presentación.' },
      { label: 'Design system', detail: 'Centraliza color, tipografía, espaciado y estados interactivos.' },
      { label: 'Secciones', detail: 'Compone hero, servicios, proyectos, proceso, diagnóstico y contacto.' },
      { label: 'Despliegue', detail: 'Publica una salida optimizada con activos responsivos.' },
    ],
    sequence: [
      { from: 'Visitante', action: 'Explora la propuesta', to: 'Landing' },
      { from: 'Landing', action: 'Presenta servicios y evidencia', to: 'Secciones' },
      { from: 'Visitante', action: 'Completa el diagnóstico', to: 'Formulario' },
      { from: 'Formulario', action: 'Valida intención y datos', to: 'Contacto' },
      { from: 'Contacto', action: 'Continúa la conversación', to: 'Equipo' },
    ],
    decisions: ['Mobile-first', 'Activos optimizados', 'Secciones reutilizables', 'CTA medible'],
  },
  {
    slug: 'edge-gateway',
    name: 'Gateway dinámico multi-plataforma',
    kind: 'Backend · Arquitectura distribuida',
    summary:
      'Fachada segura que autentica plataformas, aplica políticas y enruta contratos públicos hacia servicios internos.',
    impact: 'Permite evolucionar rutas y políticas sin acoplar a los clientes con la topología interna.',
    technologies: ['NestJS', 'NGINX', 'JWT', 'PostgreSQL', 'Docker'],
    preview: 'gateway',
    hasDemo: false,
    architecture: [
      { label: 'Balanceador', detail: 'Distribuye tráfico y mantiene health checks de las instancias.' },
      { label: 'Guard de plataforma', detail: 'Valida identidad, alcance y tipo de token.' },
      { label: 'Registro de rutas', detail: 'Resuelve políticas dinámicas con fallback local de arranque.' },
      { label: 'Pipeline', detail: 'Aplica límites, transformación y encabezados permitidos.' },
      { label: 'Servicio destino', detail: 'Recibe un contrato interno aislado del cliente.' },
    ],
    sequence: [
      { from: 'Plataforma', action: 'Solicita un recurso público', to: 'Balanceador' },
      { from: 'Balanceador', action: 'Deriva la solicitud', to: 'Gateway' },
      { from: 'Gateway', action: 'Valida identidad y alcance', to: 'Políticas' },
      { from: 'Registro', action: 'Resuelve ruta y pipeline', to: 'Proxy' },
      { from: 'Proxy', action: 'Entrega respuesta normalizada', to: 'Plataforma' },
    ],
    decisions: ['Instancias sin estado', 'Rutas dinámicas', 'Fallback de configuración', 'Observabilidad por solicitud'],
  },
  {
    slug: 'cloud-automation',
    name: 'Servicios y automatización cloud',
    kind: 'Backend · Cloud',
    summary:
      'APIs, procesos serverless, almacenamiento y entrega de activos diseñados con observabilidad y límites claros.',
    impact: 'Automatiza procesos repetibles y desacopla cómputo, datos y distribución.',
    technologies: ['Python', 'NestJS', 'Lambda', 'S3', 'DynamoDB', 'CloudFront'],
    preview: 'cloud',
    hasDemo: false,
    architecture: [
      { label: 'Cliente', detail: 'Consume un contrato pequeño y versionado.' },
      { label: 'API / evento', detail: 'Valida la entrada y desacopla el inicio del proceso.' },
      { label: 'Reglas de negocio', detail: 'Orquesta tareas idempotentes con límites definidos.' },
      { label: 'Persistencia', detail: 'Selecciona almacenamiento según acceso y ciclo de vida.' },
      { label: 'Observabilidad', detail: 'Correlaciona ejecución, métricas y errores recuperables.' },
    ],
    sequence: [
      { from: 'Cliente', action: 'Envía una operación', to: 'API' },
      { from: 'API', action: 'Valida y publica el evento', to: 'Cola' },
      { from: 'Worker', action: 'Procesa con idempotencia', to: 'Datos' },
      { from: 'Worker', action: 'Registra métricas y resultado', to: 'Observabilidad' },
      { from: 'API', action: 'Expone el estado', to: 'Cliente' },
    ],
    decisions: ['Procesamiento desacoplado', 'Idempotencia', 'Costo por demanda', 'Trazabilidad extremo a extremo'],
  },
];

export const SKILLS = [
  'TypeScript', 'Python', 'Angular', 'Ionic', 'NestJS', 'Next.js', 'Electron',
  'PostgreSQL', 'AWS', 'Arquitectura de sistemas', 'Offline-first', 'APIs REST', 'CI/CD',
];
