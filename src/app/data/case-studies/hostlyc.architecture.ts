import { ArchitectureEdge, ArchitectureNode } from '../portfolio.models';

export const HOSTLYC_NODES: ArchitectureNode[] = [
  {
    id: 'person', label: 'Visitante o equipo de tienda', kind: 'actor',
    detail: 'Consulta el escaparate o edita contenido con los permisos de su cuenta.',
  },
  {
    id: 'cms', label: 'CMS de la tienda', kind: 'container',
    detail: 'Edita borradores, secciones y opciones permitidas; solicita la publicación.',
    boundary: 'Cliente de edición',
  },
  {
    id: 'web', label: 'Web de Hostlyc', kind: 'container',
    detail: 'Consulta contenido publicado y valida tienda y versiones antes de componer la página.',
    boundary: 'Marco global de navegación', technology: 'Next.js / React',
  },
  {
    id: 'gateway', label: 'Pasarela de acceso', kind: 'system',
    detail: 'Valida rutas y acceso para las solicitudes de la web y del CMS.',
    boundary: 'Entrada a servicios de negocio',
  },
  {
    id: 'publication', label: 'Servicio de publicación', kind: 'component',
    detail: 'Aplica permisos y capacidades, separa borrador de publicación y entrega contratos versionados.',
    boundary: 'Módulo de la API de negocio',
  },
  {
    id: 'data', label: 'Acceso a datos y persistencia', kind: 'datastore',
    detail: 'Conserva contenido por tienda y su versión publicada mediante operaciones registradas.',
    boundary: 'Acceso controlado desde el negocio',
  },
  {
    id: 'renderer', label: 'Renderizador de familias', kind: 'component',
    detail: 'Combina manifiesto e hidratación con componentes desplegados; sus estilos pertenecen al paquete de renderizado.',
    boundary: 'Componente dentro de la web',
  },
  {
    id: 'invalidation', label: 'Invalidación de contenido público', kind: 'component',
    detail: 'Entrega eventos pendientes con reintentos para renovar versiones y revalidar la web.',
    boundary: 'Actualización tras persistir cambios',
  },
];

export const HOSTLYC_EDGES: ArchitectureEdge[] = [
  { from: 'person', to: 'web', protocol: 'HTTPS', purpose: 'Abrir una tienda publicada' },
  { from: 'person', to: 'cms', protocol: 'Sesión autorizada', purpose: 'Editar contenido de su tienda' },
  { from: 'cms', to: 'gateway', protocol: 'Solicitud autenticada', purpose: 'Enviar cambios y solicitar publicación' },
  { from: 'web', to: 'gateway', protocol: 'Lectura pública', purpose: 'Consultar manifiesto e hidratación' },
  { from: 'gateway', to: 'publication', protocol: 'Ruta y permisos', purpose: 'Delegar la operación permitida al negocio' },
  { from: 'publication', to: 'data', protocol: 'Operación registrada', purpose: 'Leer o persistir contenido y versiones por tienda' },
  { from: 'web', to: 'renderer', protocol: 'Contrato validado', purpose: 'Componer una familia con manifiesto e hidratación compatibles' },
  { from: 'publication', to: 'invalidation', protocol: 'Evento persistido', purpose: 'Registrar la actualización pendiente tras guardar cambios' },
  { from: 'invalidation', to: 'gateway', protocol: 'Versión por alcance', purpose: 'Renovar validadores de lecturas públicas' },
  { from: 'invalidation', to: 'web', protocol: 'Revalidación por etiqueta', purpose: 'Actualizar contenido público con entrega y reintentos' },
];
