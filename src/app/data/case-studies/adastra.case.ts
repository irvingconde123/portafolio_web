import { CaseStudy } from '../portfolio.models';

export const ADASTRA_CASE: CaseStudy = {
  slug: 'adastra',
  name: 'Adastra · operación híbrida de laboratorio',
  eyebrow: 'Caso 01 · Continuidad operativa',
  summary:
    'Aplicación híbrida que conserva trabajo local, permite operar sin conexión y sincroniza los cambios al recuperar una sesión válida.',
  problem:
    'La captura y revisión de reportes no puede depender de una conexión estable ni repetir operaciones cuando una sincronización se interrumpe.',
  context:
    'El producto comparte experiencia entre web, Android y escritorio. La demostración pública utiliza datos ficticios y reproduce los estados principales sin conectar infraestructura privada.',
  role: 'Diseño de la experiencia multiplataforma, separación de persistencia, operación sin conexión, reconciliación y pruebas de la demostración.',
  status: 'Demostración funcional y arquitectura sanitizada',
  solution:
    'Un puerto de persistencia deriva preferencias simples a IndexedDB y trabajo operativo a SQLite. Una bandeja de salida conserva la intención y el identificador de la operación hasta recibir confirmación del API.',
  constraints: [
    'No eliminar trabajo local antes de una confirmación completa.',
    'No sincronizar mutaciones con una sesión inválida.',
    'Mantener trazabilidad entre autor local y actor que sincroniza.',
  ],
  technologies: [
    'Ionic',
    'Angular',
    'NestJS',
    'SQLite',
    'IndexedDB',
    'Electron',
  ],
  evidence: [
    {
      label: 'Orquestador sanitizado de sincronización offline e idempotencia',
      source: 'src/app/data/code-evidence/hybrid-sync-orchestrator.ts',
      verified: true,
      verifiedAt: '2026-07-12',
    },
    {
      label:
        'Demo navegable con reportes, captura, borradores y modo sin conexión',
      source: 'src/app/demo/adastra-demo.component.html',
      verified: true,
      verifiedAt: '2026-07-11',
    },
    {
      label:
        'Pruebas de sincronización interrumpida, batchId y edición de reportes',
      source: 'src/app/demo/adastra-demo.component.spec.ts',
      verified: true,
      verifiedAt: '2026-07-11',
    },
  ],
  demos: [{ label: 'Abrir demo de Adastra', slug: 'adastra' }],
  nodes: [
    {
      id: 'operator',
      label: 'Operador',
      kind: 'actor',
      detail: 'Captura y revisa reportes.',
    },
    {
      id: 'hybrid-app',
      label: 'Aplicación híbrida',
      kind: 'system',
      detail: 'Coordina experiencia y casos de uso.',
      technology: 'Ionic + Angular',
    },
    {
      id: 'storage-router',
      label: 'Enrutador de persistencia',
      kind: 'component',
      detail: 'Selecciona el adaptador según identidad y plataforma.',
    },
    {
      id: 'indexeddb',
      label: 'Preferencias locales',
      kind: 'datastore',
      detail: 'Conserva estado simple y reemplazable.',
      technology: 'IndexedDB',
    },
    {
      id: 'sqlite',
      label: 'Operación local',
      kind: 'datastore',
      detail: 'Guarda reportes y trabajo pendiente.',
      technology: 'SQLite',
    },
    {
      id: 'sync',
      label: 'Sincronizador',
      kind: 'component',
      detail: 'Reanuda operaciones por identificador y confirmación.',
    },
    {
      id: 'api',
      label: 'API operativa',
      kind: 'container',
      detail: 'Valida sesión, procesa lotes y responde su estado.',
      technology: 'NestJS',
    },
    {
      id: 'database',
      label: 'Datos operativos',
      kind: 'datastore',
      detail: 'Fuente de verdad del servidor.',
    },
    {
      id: 'key-store',
      label: 'Almacén seguro de claves',
      kind: 'external',
      detail: 'Mantiene la clave fuera de los datos de aplicación.',
    },
  ],
  edges: [
    {
      from: 'operator',
      to: 'hybrid-app',
      protocol: 'Interfaz',
      purpose: 'Capturar o modificar un reporte',
    },
    {
      from: 'hybrid-app',
      to: 'storage-router',
      protocol: 'Puerto local',
      purpose: 'Persistir por identidad',
    },
    {
      from: 'storage-router',
      to: 'indexeddb',
      protocol: 'Adaptador',
      purpose: 'Guardar preferencias',
    },
    {
      from: 'storage-router',
      to: 'sqlite',
      protocol: 'Adaptador',
      purpose: 'Guardar operación pendiente',
    },
    {
      from: 'key-store',
      to: 'sqlite',
      protocol: 'Clave local',
      purpose: 'Proteger datos en reposo',
    },
    {
      from: 'sqlite',
      to: 'sync',
      protocol: 'Bandeja de salida',
      purpose: 'Entregar cambios pendientes',
    },
    {
      from: 'sync',
      to: 'api',
      protocol: 'HTTPS',
      purpose: 'Enviar y consultar operaciones',
    },
    {
      from: 'api',
      to: 'database',
      protocol: 'Transacción',
      purpose: 'Confirmar cambios completos',
    },
  ],
  qualityScenarios: [
    {
      attribute: 'Recuperación',
      stimulus: 'La app se cierra durante una sincronización',
      response:
        'Conserva pendientes, consulta el batchId y reenvía solo lo no confirmado',
      measure: 'Sin duplicar una operación confirmada',
    },
    {
      attribute: 'Seguridad',
      stimulus: 'La sesión expira con trabajo local',
      response: 'Detiene el envío y solicita autenticación',
      measure: 'El borrador permanece local',
    },
    {
      attribute: 'Disponibilidad',
      stimulus: 'La red deja de responder',
      response: 'Permite continuar con los datos locales disponibles',
      measure: 'La captura no depende de la red',
    },
  ],
  decisions: [
    {
      id: 'ADR-ADA-01',
      status: 'accepted',
      context: 'Las preferencias y la operación tienen riesgos distintos.',
      decision: 'Separar IndexedDB y SQLite detrás de un puerto.',
      consequences:
        'Mejora la migración y el aislamiento, pero exige dos adaptadores.',
    },
    {
      id: 'ADR-ADA-02',
      status: 'accepted',
      context: 'Un reintento puede ocurrir después de una respuesta perdida.',
      decision:
        'Identificar y consultar cada sincronización antes de repetirla.',
      consequences:
        'Reduce duplicados y requiere estado durable en cliente y servidor.',
    },
  ],
};
