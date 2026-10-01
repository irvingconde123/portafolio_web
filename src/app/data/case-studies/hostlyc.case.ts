import { CaseStudy } from '../portfolio.models';
import { HOSTLYC_EDGES, HOSTLYC_NODES } from './hostlyc.architecture';
import { HOSTLYC_FLOWS } from './hostlyc.flows';

export const HOSTLYC_CASE: CaseStudy = {
  slug: 'hostlyc',
  displayName: 'Hostlyc',
  displaySummary: 'Contenido editable y publicación por tienda. Conoce el sitio comercial publicado y explora el producto en desarrollo.',
  liveLinks: [
    { label: 'Ver sitio público', url: 'https://hostlyc.com/', description: 'Servicios y proyectos de la agencia en su sitio publicado.' },
    { label: 'Explorar producto en desarrollo', url: 'https://hostlyc-parent-web.vercel.app/', description: 'Vista pública de tiendas y planes. El contenido y las funciones pueden cambiar.' },
  ],
  name: 'Hostlyc · plantillas editables y publicación',
  eyebrow: 'Caso 04 · Contenido por tienda',
  summary:
    'Familias visuales reutilizables y contenido versionado por tienda, con un recorrido de edición, publicación y renderizado que conserva la identidad global de Hostlyc.',
  problem:
    'Cada tienda necesita editar su escaparate sin mezclar contenido de otros negocios, introducir estilos arbitrarios ni duplicar las reglas de publicación en la interfaz.',
  context:
    'Colaboración independiente. La arquitectura amplía el caso comercial a partir de las guías revisadas el 29 de septiembre de 2026. La demo del portafolio recrea la landing comercial con datos ficticios; no ejecuta el CMS ni los servicios descritos.',
  role:
    'Planeación del recorrido comercial, arquitectura de interfaz y construcción de la demo navegable. El caso incorpora una síntesis documental de los límites y contratos de plantillas y publicación.',
  status: 'Arquitectura documentada · ejemplo interactivo local',
  solution:
    'El CMS administra borradores y opciones permitidas. Los servicios de negocio autorizan y versionan la publicación; la web combina un manifiesto de estructura y capacidades con una hidratación de contenido validada para la misma tienda y versión. El renderizador conserva sus familias visuales separadas del marco global.',
  constraints: [
    'Validar tienda y versiones antes de componer el escaparate.',
    'Editar campos y secciones permitidos, sin HTML ni CSS arbitrario.',
    'Separar borrador, versión publicada y capacidades del plan.',
    'Conservar la demo pública sin conexiones a servicios productivos.',
  ],
  technologies: ['Next.js', 'React', 'TypeScript', 'CMS', 'Contratos versionados'],
  evidence: [
    {
      label: 'Sitio comercial publicado de Hostlyc',
      source: 'https://hostlyc.com/',
      verified: true,
      verifiedAt: '2026-10-01',
    },
    {
      label: 'Vista pública del producto en desarrollo; funciones y contenido en evolución',
      source: 'https://hostlyc-parent-web.vercel.app/',
      verified: true,
      verifiedAt: '2026-10-01',
    },
    {
      label: 'Guía pública: contratos de plantillas, publicación y límites del modelo',
      source: 'docs/architecture/hostlyc-plantillas.md',
      verified: true,
      verifiedAt: '2026-10-01',
    },
    {
      label: 'Modelo público de responsabilidades y contratos de Hostlyc',
      source: 'src/app/data/case-studies/hostlyc.architecture.ts',
      verified: true,
      verifiedAt: '2026-10-01',
    },
    {
      label: 'Demo comercial navegable; alcance distinto del CMS documentado',
      source: 'src/app/demo/hostlyc-demo.component.html',
      verified: true,
      verifiedAt: '2026-10-01',
    },
  ],
  demos: [{ label: 'Ejemplo local de la landing', slug: 'hostlyc' }],
  architectureNote:
    'Vista conceptual basada en documentación revisada al 29/09/2026. Agrupa responsabilidades, no infraestructura productiva. El renderizador es parte de la web; la consistencia del modelo comprueba sus contratos, no acredita un despliegue.',
  nodes: HOSTLYC_NODES,
  edges: HOSTLYC_EDGES,
  flows: HOSTLYC_FLOWS,
  qualityScenarios: [
    {
      attribute: 'Aislamiento',
      stimulus: 'Manifiesto e hidratación corresponden a otra tienda o versión',
      response: 'La web valida identidad y versiones antes de renderizar',
      measure: 'Evitar combinar contratos incompatibles',
    },
    {
      attribute: 'Publicación autorizada',
      stimulus: 'Una cuenta intenta publicar sin rol o membresía permitidos',
      response: 'El negocio comprueba autorización y capacidades',
      measure: 'La interfaz no decide los permisos de publicación',
    },
    {
      attribute: 'Coherencia eventual',
      stimulus: 'Falla la entrega de una invalidación después de guardar cambios',
      response: 'Los eventos pendientes permiten reintentar la actualización pública',
      measure: 'La caché conserva su función de lectura; la persistencia sigue como fuente de verdad',
    },
    {
      attribute: 'Modificabilidad',
      stimulus: 'Una tienda necesita nuevos textos u opciones de presentación',
      response: 'El CMS cambia campos permitidos sin alterar el CSS global de Hostlyc',
      measure: 'Una familia o página nueva requiere ampliar su contrato y renderizador',
    },
  ],
  decisions: [
    {
      id: 'ADR-HOS-01', status: 'accepted',
      context: 'Una familia visual se reutiliza entre tiendas con contenido diferente.',
      decision: 'Separar manifiesto e hidratación y validar tienda y versiones.',
      consequences: 'Evita mezclar contratos; exige coordinar sus versiones y compatibilidad.',
    },
    {
      id: 'ADR-HOS-02', status: 'accepted',
      context: 'El escaparate necesita identidad propia dentro de Hostlyc.',
      decision: 'Mantener familias y estilos en el paquete de renderizado, separados del marco global.',
      consequences: 'Aclara la propiedad de estilos; no implica encapsulación absoluta del CSS.',
    },
    {
      id: 'ADR-HOS-03', status: 'accepted',
      context: 'Editar contenido y hacerlo público son operaciones distintas.',
      decision: 'Conservar borradores y autorizar la publicación en servicios de negocio.',
      consequences: 'Centraliza permisos y capacidades; requiere contratos entre CMS, pasarela y negocio.',
    },
    {
      id: 'ADR-HOS-04', status: 'accepted',
      context: 'Una publicación puede dejar lecturas públicas anteriores en caché.',
      decision: 'Persistir eventos de invalidación y reintentar su entrega a pasarela y web.',
      consequences: 'Reduce lecturas repetidas con coherencia eventual; no promete actualización instantánea.',
    },
    {
      id: 'ADR-HOS-05', status: 'proposed',
      context: 'El contrato actual limita los tipos de página de cada familia.',
      decision: 'Añadir nuevas familias mediante contratos y componentes propios del renderizador.',
      consequences: 'Mantiene la edición por tienda; cada ampliación requiere implementación y validación.',
    },
  ],
};
