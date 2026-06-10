import { TbSearch } from 'react-icons/tb'

/**
 * Barra de búsqueda para filtrar tablas y campos del diccionario.
 * Sigue el diseño visual del resto del manual técnico.
 */
export default function DatabaseSearch({ value, onChange }) {
  return (
    <div className="relative">
      <TbSearch
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={16}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar tabla o campo..."
        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl
                   shadow-sm placeholder:text-slate-400 text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300
                   transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-sm leading-none"
          aria-label="Limpiar búsqueda"
        >
          &times;
        </button>
      )}
    </div>
  )
}
