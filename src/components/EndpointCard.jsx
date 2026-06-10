import { TbLink, TbListSearch } from 'react-icons/tb'

/* ─── Mapa de colores para método HTTP ─────────── */

const methodStyles = {
  GET: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    ring: 'ring-emerald-200',
  },
  POST: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    ring: 'ring-indigo-200',
  },
  PUT: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    ring: 'ring-amber-200',
  },
  PATCH: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    ring: 'ring-amber-200',
  },
  DELETE: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-200',
  },
}

const defaultStyle = {
  bg: 'bg-slate-50',
  text: 'text-slate-700',
  border: 'border-slate-200',
  ring: 'ring-slate-200',
}

function getMethodStyle(method) {
  return methodStyles[method] || defaultStyle
}

/* ─── Componente ───────────────────────────────── */

/**
 * Card individual para un endpoint de la API.
 *
 * Props:
 *   endpoint — { method, path, description, responseStatus, responseText, pathParams[], queryParams[] }
 */
export default function EndpointCard({ endpoint }) {
  const { method, path, description, responseStatus, responseText, pathParams, queryParams } =
    endpoint
  const style = getMethodStyle(method)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* ── Encabezado: método + ruta ── */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b border-slate-100">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider uppercase ${style.bg} ${style.text} ${style.border} border shrink-0`}
        >
          {method}
        </span>
        <code className="text-sm font-mono text-slate-800 break-all">{path}</code>
      </div>

      {/* ── Cuerpo ── */}
      <div className="px-5 py-4 space-y-3">
        {/* Descripción */}
        {description && (
          <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        )}

        {/* Parámetros de ruta */}
        {pathParams.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1.5 flex items-center gap-1">
              <TbLink size={13} />
              Parámetros de ruta
            </h4>
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2 text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                      Parámetro
                    </th>
                    <th className="text-left px-4 py-2 text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                      Tipo
                    </th>
                    <th className="text-left px-4 py-2 text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pathParams.map((param) => (
                    <tr key={param} className="hover:bg-slate-50">
                      <td className="px-4 py-2 font-mono text-xs text-slate-800">
                        {param}
                      </td>
                      <td className="px-4 py-2 text-xs text-slate-500">string</td>
                      <td className="px-4 py-2 text-xs text-slate-400">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Query params */}
        {queryParams.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1.5 flex items-center gap-1">
              <TbListSearch size={13} />
              Query params
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {queryParams.map((qp) => (
                <span
                  key={qp}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200"
                >
                  {qp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Respuesta */}
        {responseStatus && (
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1.5">
              Respuesta
            </h4>
            <div className="flex items-start gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${style.bg} ${style.text} shrink-0 mt-0.5`}
              >
                {responseStatus}
              </span>
              {responseText && (
                <code className="text-xs text-slate-500 font-mono leading-relaxed break-words">
                  {responseText}
                </code>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
