import { CaseStudy } from '../portfolio.models';

export const CONTENT_PLATFORM_CASE: CaseStudy = {
  slug: 'plataforma-contenido',
  name: 'Plataforma de contenido · CMS y landing',
  eyebrow: 'Caso 02 · Publicación multi-tenant',
  summary:
    'CMS editorial y landing dinámica unidos por un contrato de contenido estable, con resolución por organización y respaldo local.',
  problem:
    'El equipo editorial necesita publicar sin desplegar código, mientras la landing debe conservar una estructura segura cuando el CMS cambia o no responde.',
  context:
    'El caso agrupa el panel CMS y la landing porque ambos forman un solo flujo de edición, publicación y lectura. Las demos públicas usan contenido ficticio.',
  role:
    'Diseño del contrato visual, experiencia del panel, ciclo borrador/publicación, resolución de tenant y acceso con fuente remota o respaldo.',
  status: 'Dos demostraciones funcionales y arquitectura sanitizada',
  solution:
    'El CMS valida y publica versiones; una API pública entrega solo el contenido activo. La landing normaliza esa respuesta y puede usar un snapshot local mediante el mismo puerto.',
  constraints: [
    'No ejecutar HTML o estilos arbitrarios provenientes del contenido.',
    'Aplicar tenant y autorización antes de una mutación editorial.',
    'Conservar la versión activa si una publicación no es válida.',
  ],
  technologies: ['Angular', 'NestJS', 'PostgreSQL', 'REST', 'RBAC'],
  evidence: [
    { label: 'Demo de landing con navegación y contenido ficticio', source: 'src/app/demo/landing-demo.component.html', verified: true },
    { label: 'Demo CMS con edición y publicación simulada', source: 'src/app/demo/cms-demo.component.html', verified: true },
    { label: 'Prueba del cambio de versión editorial', source: 'src/app/demo/cms-demo.component.spec.ts', verified: true },
  ],
  demos: [
    { label: 'Abrir demo de landing', slug: 'landing' },
    { label: 'Abrir demo del CMS', slug: 'cms' },
  ],
  nodes: [
    { id: 'editor', label: 'Editor', kind: 'actor', detail: 'Prepara y publica contenido.' },
    { id: 'visitor', label: 'Visitante', kind: 'actor', detail: 'Consulta la experiencia pública.' },
    { id: 'cms', label: 'Panel CMS', kind: 'container', detail: 'Edita páginas, medios y navegación.', technology: 'Angular' },
    { id: 'cms-api', label: 'API editorial', kind: 'container', detail: 'Valida tenant, permisos y esquema.', technology: 'NestJS' },
    { id: 'content-store', label: 'Contenido versionado', kind: 'datastore', detail: 'Separa borrador de versión activa.', technology: 'PostgreSQL' },
    { id: 'public-api', label: 'API pública', kind: 'container', detail: 'Expone únicamente contenido publicado.' },
    { id: 'landing', label: 'Landing', kind: 'container', detail: 'Compone secciones desde un modelo normalizado.', technology: 'Angular' },
    { id: 'repository', label: 'Repositorio de contenido', kind: 'component', detail: 'Conmuta fuentes detrás de un contrato estable.' },
    { id: 'snapshot', label: 'Snapshot local', kind: 'datastore', detail: 'Respaldo acotado para lectura.' },
  ],
  edges: [
    { from: 'editor', to: 'cms', protocol: 'Interfaz', purpose: 'Editar y solicitar publicación' },
    { from: 'cms', to: 'cms-api', protocol: 'HTTPS', purpose: 'Enviar mutaciones validadas' },
    { from: 'cms-api', to: 'content-store', protocol: 'Transacción', purpose: 'Versionar contenido' },
    { from: 'content-store', to: 'public-api', protocol: 'Consulta', purpose: 'Leer versión activa' },
    { from: 'visitor', to: 'landing', protocol: 'HTTPS', purpose: 'Abrir sitio de una organización' },
    { from: 'landing', to: 'repository', protocol: 'Puerto', purpose: 'Solicitar contenido normalizado' },
    { from: 'repository', to: 'public-api', protocol: 'HTTPS', purpose: 'Consultar fuente principal' },
    { from: 'repository', to: 'snapshot', protocol: 'Adapter', purpose: 'Leer respaldo ante fallo' },
  ],
  qualityScenarios: [
    { attribute: 'Disponibilidad', stimulus: 'La API pública no responde', response: 'El repositorio entrega un snapshot identificado como respaldo', measure: 'La landing conserva contenido legible' },
    { attribute: 'Seguridad', stimulus: 'Un bloque tiene propiedades no permitidas', response: 'La validación rechaza la publicación', measure: 'La versión activa no cambia' },
    { attribute: 'Modificabilidad', stimulus: 'Se incorpora un tipo de sección permitido', response: 'Se registra un renderer compatible', measure: 'No cambia el contrato de las demás secciones' },
  ],
  decisions: [
    { id: 'ADR-CONT-01', status: 'accepted', context: 'CMS y landing evolucionan de forma independiente.', decision: 'Mantener un contrato visual versionado entre ambos.', consequences: 'Reduce acoplamiento; cada cambio incompatible requiere migración explícita.' },
    { id: 'ADR-CONT-02', status: 'accepted', context: 'La edición no debe alterar inmediatamente el sitio público.', decision: 'Separar borrador y versión activa.', consequences: 'Evita publicaciones accidentales y añade un paso editorial.' },
  ],
};
