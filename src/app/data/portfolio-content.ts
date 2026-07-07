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

export interface QualityAttribute {
  name: string;
  mechanism: string;
}

export interface FailureMode {
  trigger: string;
  response: string;
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
  architectureType: string;
  architectureScope: string;
  patterns: string[];
  qualityAttributes: QualityAttribute[];
  failureModes: FailureMode[];
  tradeoffs: string[];
  observability: string[];
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
    architectureType: 'Offline-first · Hexagonal · Eventual consistency',
    architectureScope: 'C4 nivel contenedores · flujo de escritura offline y reconciliación',
    patterns: ['Ports & adapters', 'Outbox local', 'Idempotency key', 'Repository', 'Strategy de persistencia'],
    qualityAttributes: [
      { name: 'Disponibilidad', mechanism: 'Captura local aunque API o red no estén disponibles.' },
      { name: 'Integridad', mechanism: 'Lotes idempotentes, confirmación explícita y rollback del servidor.' },
      { name: 'Confidencialidad', mechanism: 'SQLite cifrado y llaves fuera del almacenamiento de aplicación.' },
      { name: 'Portabilidad', mechanism: 'Puertos de persistencia para SQLite e IndexedDB.' },
    ],
    failureModes: [
      { trigger: 'Pérdida de red o cierre del proceso', response: 'El outbox conserva la intención y reanuda por correlationId.' },
      { trigger: 'Token expira durante un lote', response: 'Se detiene el envío, conserva checkpoints y solicita reautenticación.' },
      { trigger: 'Fallo parcial del backend', response: 'La transacción revierte; el cliente consulta estado antes de reintentar.' },
    ],
    tradeoffs: ['Consistencia eventual a cambio de continuidad offline.', 'Mayor complejidad local para evitar pérdida o duplicidad.', 'La caché es acotada y no sustituye la fuente de verdad.'],
    observability: ['correlationId por operación', 'Estado del outbox', 'Métrica de reintentos', 'Auditoría de creador y sincronizador'],
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
    architectureType: 'Frontend composable · Clean data access · Multi-tenant',
    architectureScope: 'C4 nivel componentes · resolución de contenido, estilos y media',
    patterns: ['Adapter', 'Repository', 'Facade', 'Renderer registry', 'Fallback source'],
    qualityAttributes: [
      { name: 'Modificabilidad', mechanism: 'Nuevos bloques mediante registro sin alterar el shell.' },
      { name: 'Disponibilidad', mechanism: 'Fuente local tipada cuando el CMS público no responde.' },
      { name: 'Rendimiento', mechanism: 'Activos responsivos, secciones lazy y modelo ya normalizado.' },
      { name: 'Aislamiento', mechanism: 'Contexto de tenant aplicado antes de consultar contenido.' },
    ],
    failureModes: [
      { trigger: 'CMS público no disponible', response: 'Repositorio selecciona snapshot local y marca contenido degradado.' },
      { trigger: 'Bloque desconocido', response: 'Renderer seguro lo omite sin romper el resto de la página.' },
      { trigger: 'Media inválida', response: 'Resolver sustituye por placeholder y registra diagnóstico.' },
    ],
    tradeoffs: ['Contrato visual estable limita propiedades arbitrarias.', 'Fallback mejora disponibilidad pero puede mostrar una versión anterior.', 'Composición dinámica exige validación estricta en CMS.'],
    observability: ['Tenant resuelto', 'Fuente API/fallback', 'Bloques descartados', 'Core Web Vitals'],
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
    architectureType: 'Modular frontend · RBAC · Content lifecycle',
    architectureScope: 'C4 nivel contenedores · edición, versionado y publicación',
    patterns: ['Feature modules', 'Schema validation', 'Draft/publish', 'RBAC guard', 'Tenant context'],
    qualityAttributes: [
      { name: 'Seguridad', mechanism: 'Guardas por sesión, permiso, tenant y módulo habilitado.' },
      { name: 'Auditabilidad', mechanism: 'Versiones editoriales y actor asociado a cada mutación.' },
      { name: 'Usabilidad', mechanism: 'Formularios amigables con configuración avanzada progresiva.' },
      { name: 'Consistencia', mechanism: 'Validación de esquema antes de activar una versión.' },
    ],
    failureModes: [
      { trigger: 'Publicación inválida', response: 'La versión activa permanece intacta y se devuelve error por campo.' },
      { trigger: 'Pérdida de autorización', response: 'Interceptor limpia sesión y bloquea nuevas mutaciones.' },
      { trigger: 'Carga de media incompleta', response: 'Recurso no se asocia hasta recibir confirmación del almacenamiento.' },
    ],
    tradeoffs: ['Publicación explícita agrega un paso pero evita cambios accidentales.', 'RBAC granular aumenta configuración operativa.', 'JSON avanzado se conserva para extensibilidad técnica.'],
    observability: ['Versión activa/borrador', 'Eventos de auditoría', 'Errores por schema', 'Latencia de publicación'],
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
    architectureType: 'SSR/SSG · Component-driven · SEO-first',
    architectureScope: 'C4 nivel componentes · render, activos y conversión',
    patterns: ['App Router', 'Server components', 'Typed content', 'Design tokens', 'Progressive enhancement'],
    qualityAttributes: [
      { name: 'Rendimiento', mechanism: 'Generación estática, imágenes optimizadas y mínimo JavaScript cliente.' },
      { name: 'SEO', mechanism: 'Metadatos, semántica y sitemap construidos junto al contenido.' },
      { name: 'Accesibilidad', mechanism: 'Jerarquía semántica, foco y controles táctiles consistentes.' },
      { name: 'Conversión', mechanism: 'CTA trazables y formularios con validación progresiva.' },
    ],
    failureModes: [
      { trigger: 'JavaScript bloqueado', response: 'Contenido principal y enlaces continúan disponibles desde HTML.' },
      { trigger: 'Activo no disponible', response: 'Dimensiones reservadas y fallback visual evitan saltos de layout.' },
      { trigger: 'Formulario externo falla', response: 'Conserva datos en pantalla y ofrece canales alternativos.' },
    ],
    tradeoffs: ['Contenido tipado requiere despliegue para cambios estructurales.', 'Animación se limita para proteger rendimiento.', 'Medición de conversión respeta consentimiento y privacidad.'],
    observability: ['Core Web Vitals', 'Errores de formulario', 'CTA por sección', 'Estado del despliegue'],
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
    architectureType: 'API Gateway · Resource registry · Policy pipeline',
    architectureScope: 'C4 nivel contenedores · resolución dinámica y token one-shot',
    patterns: ['Gateway', 'Registry', 'Strategy', 'Circuit breaker', 'Cache-aside', 'Fail-safe'],
    qualityAttributes: [
      { name: 'Desacoplamiento', mechanism: 'Negocio solicita recursos lógicos, no entidades ni conexiones físicas.' },
      { name: 'Disponibilidad', mechanism: 'Cada contexto de datos falla de forma aislada con cooldown.' },
      { name: 'Seguridad', mechanism: 'Firma, claims, plataforma, scopes y policy antes del upstream.' },
      { name: 'Escalabilidad', mechanism: 'Instancias stateless detrás de balanceador y configuración cacheada.' },
    ],
    failureModes: [
      { trigger: 'Contexto SQL no disponible', response: 'Invalida DataSource, aplica cooldown y mantiene los otros contextos.' },
      { trigger: 'Blacklist one-shot inaccesible', response: 'Política explícita fail-closed para operaciones sensibles.' },
      { trigger: 'Upstream excede timeout', response: 'Corta la solicitud, registra dependencia y evita saturar workers.' },
    ],
    tradeoffs: ['Registro dinámico reduce despliegues pero exige gobierno de configuración.', 'Fail-closed protege seguridad sacrificando disponibilidad parcial.', 'Compatibilidad multi-driver se restringe a capacidades comunes.'],
    observability: ['x-request-id extremo a extremo', 'Salud por contexto SQL', 'Latencia por upstream', 'Rechazos por policy'],
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
    architectureType: 'Event-driven · Serverless · Asynchronous processing',
    architectureScope: 'C4 nivel contenedores · comando, evento, worker y consulta de estado',
    patterns: ['Queue-based load leveling', 'Idempotent consumer', 'Dead-letter queue', 'Object storage', 'CQRS ligero'],
    qualityAttributes: [
      { name: 'Elasticidad', mechanism: 'Workers escalan con la profundidad de la cola.' },
      { name: 'Resiliencia', mechanism: 'Reintentos acotados y DLQ para mensajes no recuperables.' },
      { name: 'Costo', mechanism: 'Cómputo bajo demanda y políticas de ciclo de vida para activos.' },
      { name: 'Trazabilidad', mechanism: 'CorrelationId preservado entre API, evento, worker y resultado.' },
    ],
    failureModes: [
      { trigger: 'Worker interrumpido', response: 'Visibilidad del mensaje expira y otro worker reanuda con idempotencia.' },
      { trigger: 'Payload inválido', response: 'Se rechaza antes de publicar o termina en DLQ con causa estructurada.' },
      { trigger: 'Dependencia externa lenta', response: 'Timeout, backoff con jitter y circuito abierto temporal.' },
    ],
    tradeoffs: ['Procesamiento asíncrono requiere consultar estado.', 'Entrega al menos una vez exige consumidor idempotente.', 'Serverless reduce operación pero introduce límites de plataforma.'],
    observability: ['Profundidad y edad de cola', 'Tasa de DLQ', 'Duración de workers', 'Costo por operación'],
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
