import { TbSearch, TbX } from 'react-icons/tb'

/* ─── Mapa de colores para filtros de método ─── */

const filterColors = {
  GET: 'data-[active=true]:bg-emerald-50 data-[active=true]:text-emerald-700 data-[active=true]:border-emerald-200',
  POST:
    'data-[active=true]:bg-indigo-50 data-[active=true]:text-indigo-700 data-[active=true]:border-indigo-200',
  PUT: 'data-[active=true]:bg-amber-50 data-[active=true]:text-amber-700 data-[active=true]:border-amber-200',
  PATCH:
    'data-[active=true]:bg-amber-50 data-[active=true]:text-amber-700 data-[active=true]:border-amber-200',
  DELETE:
    'data-[active=true]:bg-red-50 data-[active=true]:text-red-700 data-[active=true]:border-red-200',
}

/**
 * Barra de búsqueda + filtro por método HTTP.
 *
 * Props:
 *   searchQuery, methods[], activeMethod, onSearchChange, onMethodChange
 */
export default function ApiSearch({
  searchQuery,
  methods,
  activeMethod,
  onSearchChange,
  onMethodChange,
}) {
  const allMethods = ['Todos', ...new Set(methods)]

  return (
    <div className="space-y-3">
      {/* ── Input de búsqueda ── */}
      <div className="relative">
        <TbSearch
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar endpoint…"
          className="w-full pl-9 pr-8 py-2.5 text-sm bg-white border border-slate-200 rounded-xl
                     shadow-sm placeholder:text-slate-400 text-slate-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300
                     transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <TbX size={16} />
          </button>
        )}
      </div>

      {/* ── Filtros por método HTTP ── */}
      <div className="flex flex-wrap gap-1.5">
        {allMethods.map((m) => {
          const isActive = activeMethod === m
          const base =
            'px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all duration-150 cursor-pointer'
          const color =
            m === 'Todos'
              ? isActive
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              : isActive
                ? `${filterColors[m] || ''}`
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'

          return (
            <button
              key={m}
              data-active={isActive}
              onClick={() => onMethodChange(m)}
              className={`${base} ${color}`}
            >
              {m}
            </button>
          )
        })}
      </div>
    </div>
  )
}
