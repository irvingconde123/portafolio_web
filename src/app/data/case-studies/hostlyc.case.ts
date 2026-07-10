import { CaseStudy } from '../portfolio.models';

export const HOSTLYC_CASE: CaseStudy = {
  slug: 'hostlyc',
  name: 'Hostlyc · experiencia comercial',
  eyebrow: 'Caso 04 · Comunicación de servicios',
  summary:
    'Landing comercial mobile-first que ordena servicios, proyectos, proceso y contacto en un recorrido directo.',
  problem:
    'Una oferta técnica amplia necesita explicarse sin saturar al visitante y conservar acciones claras en móvil, tableta y escritorio.',
  context:
    'Trabajo realizado como colaboración independiente. La demostración pública recrea la experiencia con datos sanitizados y no envía formularios a servicios reales.',
  role:
    'Planeación del recorrido, arquitectura frontend, sistema visual responsive y construcción de la demostración navegable.',
  status: 'Demostración pública sanitizada',
  solution:
    'Una estructura de contenido tipada compone secciones reutilizables; la navegación y los llamados a la acción mantienen una jerarquía consistente en cada viewport.',
  constraints: [
    'Conservar contenido principal disponible sin interacciones complejas.',
    'Priorizar lectura y controles táctiles en móvil.',
    'No publicar información privada de clientes o infraestructura.',
  ],
  technologies: ['Next.js', 'React', 'TypeScript', 'Diseño responsive', 'SEO'],
  evidence: [
    { label: 'Sitio público real usado como referencia visual y comercial', source: 'https://hostlyc.com/', verified: true },
    { label: 'Demo navegable con servicios, proyectos, proceso y contacto', source: 'src/app/demo/hostlyc-demo.component.html', verified: true },
    { label: 'Interacciones de navegación y formulario simulado', source: 'src/app/demo/hostlyc-demo.component.ts', verified: true },
  ],
  demos: [{ label: 'Abrir demo de Hostlyc', slug: 'hostlyc' }],
  nodes: [
    { id: 'visitor', label: 'Visitante', kind: 'actor', detail: 'Explora la oferta y elige un siguiente paso.' },
    { id: 'web-app', label: 'Aplicación web', kind: 'system', detail: 'Entrega rutas, metadatos y secciones.', technology: 'Next.js' },
    { id: 'content', label: 'Contenido tipado', kind: 'component', detail: 'Separa mensajes y colecciones de la presentación.' },
    { id: 'design-system', label: 'Sistema visual', kind: 'component', detail: 'Centraliza color, tipo, espacio y estados.' },
    { id: 'sections', label: 'Secciones comerciales', kind: 'component', detail: 'Compone servicios, proyectos, proceso y contacto.' },
    { id: 'deployment', label: 'Entrega web', kind: 'external', detail: 'Publica HTML y activos optimizados.' },
    { id: 'contact', label: 'Canal de contacto', kind: 'external', detail: 'Recibe una intención validada.' },
  ],
  edges: [
    { from: 'visitor', to: 'web-app', protocol: 'HTTPS', purpose: 'Consultar una ruta' },
    { from: 'content', to: 'web-app', protocol: 'Modelo tipado', purpose: 'Proveer mensajes y colecciones' },
    { from: 'design-system', to: 'sections', protocol: 'Tokens', purpose: 'Aplicar jerarquía consistente' },
    { from: 'web-app', to: 'sections', protocol: 'Composición', purpose: 'Renderizar el recorrido' },
    { from: 'deployment', to: 'web-app', protocol: 'Build', purpose: 'Servir salida optimizada' },
    { from: 'sections', to: 'contact', protocol: 'Formulario', purpose: 'Continuar una conversación' },
  ],
  qualityScenarios: [
    { attribute: 'Usabilidad', stimulus: 'El visitante abre el sitio en una pantalla estrecha', response: 'Contenido y acciones pasan a una sola columna', measure: 'Sin desplazamiento horizontal' },
    { attribute: 'Accesibilidad', stimulus: 'La navegación se usa con teclado', response: 'El foco sigue un orden visible y predecible', measure: 'Todas las acciones siguen disponibles' },
    { attribute: 'Rendimiento', stimulus: 'Un recurso visual tarda en cargar', response: 'El layout reserva espacio y conserva el contenido', measure: 'La lectura no queda bloqueada' },
  ],
  decisions: [
    { id: 'ADR-HOS-01', status: 'accepted', context: 'La mayoría del contenido es editorial y estable.', decision: 'Separar el contenido tipado de las secciones visuales.', consequences: 'Facilita consistencia; cambios estructurales requieren despliegue.' },
    { id: 'ADR-HOS-02', status: 'accepted', context: 'El recorrido debe funcionar desde móvil.', decision: 'Diseñar primero el flujo de una columna.', consequences: 'Reduce excepciones responsive; obliga a priorizar contenido.' },
  ],
};
