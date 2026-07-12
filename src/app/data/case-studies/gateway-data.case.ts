import { CaseStudy } from '../portfolio.models';

export const GATEWAY_DATA_CASE: CaseStudy = {
  slug: 'gateway-datos',
  name: 'Gateway y acceso dinámico a datos',
  eyebrow: 'Caso 03 · Frontera y desacoplamiento',
  summary:
    'Arquitectura de API que aplica políticas, resuelve recursos lógicos y oculta topología, hosts y conexiones físicas.',
  problem:
    'Clientes distintos necesitan consumir servicios y datos sin acoplarse a hosts, motores o contextos internos que pueden cambiar.',
  context:
    'El front real no se publica por política de privacidad. Lo verificable es la contribución de arquitectura: admisión y seguridad en el gateway, resolución gobernada de repositorios y contratos internos sanitizados.',
  role: 'Contribución en modelado de límites, políticas de acceso, registro lógico, fábrica de conexiones, aislamiento de fallos y señales operativas.',
  status: 'Arquitectura de API sanitizada; front privado no publicable',
  solution:
    'El gateway valida la solicitud, traduce un recurso lógico y conserva el contrato público estable. La capa de datos consulta un registro permitido, selecciona contexto y driver, y aísla cada conexión detrás de un repositorio.',
  constraints: [
    'No exponer hosts, credenciales o encabezados internos.',
    'Resolver únicamente recursos y entidades registrados.',
    'Bloquear operaciones sensibles si no puede completarse una validación.',
    'Mostrar solo diagramas y fragmentos sanitizados por restricciones de privacidad.',
  ],
  technologies: [
    'NestJS',
    'NGINX',
    'JWT',
    'TypeORM',
    'PostgreSQL',
    'MySQL',
    'MariaDB',
  ],
  evidence: [
    {
      label: 'Fragmento sanitizado: resolución resiliente de repositorios por recurso lógico',
      source: 'src/app/data/code-evidence/resilient-data-access.ts',
      verified: true,
      verifiedAt: '2026-07-12',
    },
    {
      label: 'Arquitectura pública: acceso dinámico y recuperación por contexto',
      source: 'src/app/data/data-access-project.ts',
      verified: true,
      verifiedAt: '2026-07-11',
    },
    {
      label: 'Fragmento sanitizado: rutas, plataformas y scopes en gateway',
      source: 'src/app/data/code-evidence/hostlyc-gateway-routing.ts',
      verified: true,
      verifiedAt: '2026-07-12',
    },
  ],
  demos: [],
  nodes: [
    {
      id: 'clients',
      label: 'Clientes multiplataforma',
      kind: 'actor',
      detail: 'Solicitan recursos lógicos.',
    },
    {
      id: 'edge',
      label: 'Entrada pública',
      kind: 'container',
      detail: 'Termina el canal y distribuye tráfico.',
      technology: 'NGINX',
    },
    {
      id: 'gateway',
      label: 'Gateway',
      kind: 'system',
      detail: 'Aplica identidad, alcance y política.',
      technology: 'NestJS',
    },
    {
      id: 'route-registry',
      label: 'Registro de recursos',
      kind: 'component',
      detail: 'Relaciona nombres lógicos con destinos permitidos.',
    },
    {
      id: 'adapter',
      label: 'Adaptador de salida',
      kind: 'component',
      detail: 'Normaliza el contrato aprobado.',
    },
    {
      id: 'data-service',
      label: 'Servicio de datos',
      kind: 'container',
      detail: 'Resuelve contexto, entidad y operación.',
    },
    {
      id: 'connection-factory',
      label: 'Fábrica de conexiones',
      kind: 'component',
      detail: 'Reutiliza conexiones y aísla fallos por contexto.',
      technology: 'TypeORM',
    },
    {
      id: 'configuration',
      label: 'Configuración gobernada',
      kind: 'external',
      detail: 'Entrega drivers y parámetros sin exponerlos al dominio.',
    },
    {
      id: 'databases',
      label: 'Bases por contexto',
      kind: 'datastore',
      detail: 'Motores detrás del mismo puerto.',
      technology: 'PostgreSQL / MySQL / MariaDB',
    },
  ],
  edges: [
    {
      from: 'clients',
      to: 'edge',
      protocol: 'HTTPS',
      purpose: 'Solicitar recurso lógico',
    },
    {
      from: 'edge',
      to: 'gateway',
      protocol: 'HTTP interno',
      purpose: 'Distribuir a instancia sana',
    },
    {
      from: 'gateway',
      to: 'route-registry',
      protocol: 'Consulta',
      purpose: 'Resolver política y destino',
    },
    {
      from: 'route-registry',
      to: 'adapter',
      protocol: 'Contrato',
      purpose: 'Entregar transformación permitida',
    },
    {
      from: 'adapter',
      to: 'data-service',
      protocol: 'Puerto interno',
      purpose: 'Ejecutar operación normalizada',
    },
    {
      from: 'data-service',
      to: 'connection-factory',
      protocol: 'Repositorio',
      purpose: 'Solicitar contexto de datos',
    },
    {
      from: 'configuration',
      to: 'connection-factory',
      protocol: 'Configuración',
      purpose: 'Proveer driver y parámetros',
    },
    {
      from: 'connection-factory',
      to: 'databases',
      protocol: 'SQL',
      purpose: 'Ejecutar en contexto aislado',
    },
  ],
  qualityScenarios: [
    {
      attribute: 'Seguridad',
      stimulus: 'No puede validarse una credencial sensible',
      response: 'El gateway bloquea la solicitud',
      measure: 'Ningún destino interno recibe la operación',
    },
    {
      attribute: 'Disponibilidad',
      stimulus: 'Falla una conexión de un contexto',
      response: 'La fábrica la invalida y mantiene los demás contextos',
      measure: 'El fallo queda aislado',
    },
    {
      attribute: 'Modificabilidad',
      stimulus: 'Un recurso cambia de contexto',
      response: 'Se actualiza el registro gobernado',
      measure: 'El contrato del cliente permanece igual',
    },
  ],
  decisions: [
    {
      id: 'ADR-GW-01',
      status: 'accepted',
      context: 'Los clientes no deben conocer la topología interna.',
      decision: 'Exponer recursos lógicos y resolverlos en el gateway.',
      consequences:
        'Permite mover destinos; el registro se vuelve infraestructura crítica.',
    },
    {
      id: 'ADR-GW-02',
      status: 'accepted',
      context: 'Una plataforma puede operar con varios motores y contextos.',
      decision: 'Resolver repositorios mediante registro y fábrica.',
      consequences:
        'Aísla el dominio; limita el contrato a capacidades compatibles.',
    },
  ],
};
