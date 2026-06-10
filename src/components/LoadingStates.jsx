import { TbAlertCircle, TbPhoto } from 'react-icons/tb'

/**
 * Esqueleto de carga que imita la estructura visual de los módulos de diagramas.
 * Sigue el mismo patrón de diseño del resto del manual técnico.
 */
export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Introducción skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
      </div>

      {/* Módulos skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="h-5 bg-slate-200 rounded w-1/3 mb-5" />
          <div className="h-52 bg-slate-100 rounded-xl mb-3" />
          <div className="h-3 bg-slate-200 rounded w-1/4 mx-auto" />
          <div className="h-3 bg-slate-200 rounded w-2/3 mx-auto mt-3" />
        </div>
      ))}
    </div>
  )
}

/**
 * Mensaje de error con opción de reintento.
 * Sigue el patrón visual usado en DiagramaDetalle para el 404.
 */
export function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
        <TbAlertCircle className="text-red-400" size={28} />
      </div>
      <h2 className="text-lg font-semibold text-slate-800 mb-2">
        No fue posible cargar los diagramas.
      </h2>
      <p className="text-sm text-slate-500 max-w-xs mb-6">
        {message || 'Error de conexión con el servidor.'}
      </p>
      <button
        onClick={onRetry}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl transition-colors"
      >
        Reintentar
      </button>
    </div>
  )
}

/**
 * Mensaje para cuando la API retorna un arreglo vacío.
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
        <TbPhoto className="text-slate-300" size={28} />
      </div>
      <h2 className="text-lg font-semibold text-slate-800 mb-1">
        No existen diagramas disponibles.
      </h2>
      <p className="text-sm text-slate-500 max-w-xs">
        Esta sección no contiene imágenes de diagramas por el momento.
      </p>
    </div>
  )
}
