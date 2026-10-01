import { ArchitectureFlow } from '../portfolio.models';

export const HOSTLYC_FLOWS: ArchitectureFlow[] = [
  {
    id: 'publication', label: 'Publicar cambios',
    title: 'Del borrador a una versión publicada',
    summary: 'El CMS edita contenido permitido. Publicar es una operación de negocio que valida acceso, capacidades y versión antes de actualizar el escaparate.',
    steps: [
      { from: 'Equipo de tienda', to: 'CMS', action: 'Edita un borrador sin modificar la versión pública.' },
      { from: 'CMS', to: 'Pasarela', action: 'Solicita publicar con la identidad y el contexto de la tienda.' },
      { from: 'Pasarela', to: 'Publicación', action: 'Admite la ruta; el negocio valida rol, membresía y contrato permitido.' },
      { from: 'Publicación', to: 'Datos', action: 'Persiste el contenido publicado y sus versiones.' },
      { from: 'Cambios persistidos', to: 'Invalidación', action: 'Registra eventos pendientes para renovar el contenido público.' },
      { from: 'Invalidación', to: 'Web y pasarela', action: 'Revalida etiquetas y versiones por alcance; reintenta entregas fallidas.' },
    ],
    note: 'La actualización es eventual. Guardar un borrador no equivale a publicar y una señal de invalidación no garantiza que todas las vistas cambien al instante.',
  },
  {
    id: 'rendering', label: 'Renderizar una tienda',
    title: 'Una familia visual, contenido propio por tienda',
    summary: 'El manifiesto define familia, secciones y capacidades. La hidratación aporta los valores publicados de la tienda; la web comprueba su compatibilidad antes de renderizar.',
    steps: [
      { from: 'Visitante', to: 'Web', action: 'Abre el escaparate de una tienda publicada.' },
      { from: 'Web', to: 'Pasarela y negocio', action: 'Consulta manifiesto e hidratación de la tienda solicitada.' },
      { from: 'Contratos recibidos', to: 'Validación web', action: 'Comprueba identidad de tienda y versiones de contenido y plantilla.' },
      { from: 'Validación web', to: 'Renderizador', action: 'Selecciona componentes desplegados para la familia y sus secciones permitidas.' },
      { from: 'Renderizador', to: 'Escaparate', action: 'Compone contenido y presentación dentro del marco global de Hostlyc.' },
    ],
    note: 'El renderizador vive dentro de la web. El CMS no entrega HTML ni CSS arbitrario; nuevas familias o tipos de página requieren contratos y componentes adicionales.',
  },
];
