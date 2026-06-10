import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { TbAlertCircle, TbDatabase, TbKey, TbArrowRight } from 'react-icons/tb'
import diccionarioRaw from '/DICCIONARIO_BASE_DATOS.md?raw'
import { parseDiccionario } from '../../services/databaseParser'
import DatabaseSearch from '../../components/DatabaseSearch'

/* ─── Icono para renderizar la columna del Campo en monoespaciado ─── */

const isCampoColumn = (header) =>
  header.toLowerCase().trim() === 'campo'

/* ─── Página principal ─────────────────────────── */

export default function BaseDeDatos() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeId, setActiveId] = useState('')
  const [error, setError] = useState(null)
  const observerRef = useRef(null)

  /* ── Parsear el markdown una sola vez ── */
  const tables = useMemo(() => {
    try {
      const result = parseDiccionario(diccionarioRaw)
      return result
    } catch (e) {
      setError(e.message)
      return null
    }
  }, [])

  /* ── Filtrar por búsqueda ── */
  const filteredTables = useMemo(() => {
    if (!tables) return []
    if (!searchQuery) return tables

    const q = searchQuery.toLowerCase()
    return tables.filter((t) => {
      // Buscar en nombre de tabla
      if (t.nombre.toLowerCase().includes(q)) return true
      // Buscar en descripción de tabla
      if (t.descripcion.toLowerCase().includes(q)) return true
      // Buscar en campos
      return t.campos.some((c) =>
        Object.values(c).some((v) => v.toLowerCase().includes(q)),
      )
    })
  }, [tables, searchQuery])

  /* ── Activar primera tabla por defecto ── */
  useEffect(() => {
    if (filteredTables.length > 0 && !activeId) {
      setActiveId(filteredTables[0].id)
    }
  }, [filteredTables, activeId])

  /* ── Observer para resaltar sección activa ── */
  useEffect(() => {
    if (filteredTables.length === 0) return

    if (observerRef.current) observerRef.current.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id.replace('section-', ''))
            break
          }
        }
      },
      { rootMargin: '-90px 0px -70% 0px', threshold: 0 },
    )

    filteredTables.forEach((t) => {
      const el = document.getElementById(`section-${t.id}`)
      if (el) observer.observe(el)
    })

    observerRef.current = observer
    return () => observer.disconnect()
  }, [filteredTables])

  /* ── Scroll suave ── */
  const scrollTo = (id) => {
    const el = document.getElementById(`section-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  /* ── Error de parseo ── */
  if (error) {
    return (
      <div className="page-enter flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <TbAlertCircle className="text-red-400" size={28} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          No fue posible cargar el diccionario de datos.
        </h2>
        <p className="text-sm text-slate-500 max-w-xs mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  /* ── Sin datos ── */
  if (tables && tables.length === 0) {
    return (
      <div className="page-enter flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
          <TbDatabase className="text-slate-300" size={28} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">
          No existen tablas documentadas.
        </h2>
        <p className="text-sm text-slate-500 max-w-xs">
          El diccionario de datos no contiene entradas de tablas.
        </p>
      </div>
    )
  }

  return (
    <div className="page-enter">
      {/* ── Encabezado ── */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Manual Técnico
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Base de Datos</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Documentación de las tablas, campos y relaciones utilizadas por el sistema.
        </p>
      </div>

      {/* ── Búsqueda ── */}
      <div className="mb-8 max-w-md">
        <DatabaseSearch value={searchQuery} onChange={setSearchQuery} />
        {searchQuery && (
          <p className="text-xs text-slate-400 mt-2">
            {filteredTables.length}{' '}
            {filteredTables.length === 1 ? 'tabla encontrada' : 'tablas encontradas'}
          </p>
        )}
      </div>

      {/* ── Layout dos columnas ── */}
      <div className="flex gap-8">
        {/* — Columna izquierda: contenido — */}
        <div className="flex-1 min-w-0">
          {filteredTables.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                <TbDatabase className="text-slate-300" size={24} />
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                No se encontraron tablas que coincidan con{' '}
                <strong>&quot;{searchQuery}&quot;</strong>.
              </p>
            </div>
          ) : (
            filteredTables.map((tabla) => (
              <section
                key={tabla.id}
                id={`section-${tabla.id}`}
                className="mb-12 scroll-mt-24"
              >
                {/* — Encabezado de la tabla — */}
                <div className="flex items-center gap-2 mb-1">
                  <TbDatabase className="text-indigo-500 shrink-0" size={18} />
                  <h2 className="text-2xl text-slate-800">{tabla.nombre}</h2>
                </div>

                {/* — Descripción — */}
                {tabla.descripcion && (
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 ml-[26px]">
                    {tabla.descripcion}
                  </p>
                )}

                {/* — Tabla de campos — */}
                {tabla.campos.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {tabla.headers.map((h) => (
                            <th
                              key={h}
                              className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400 whitespace-nowrap"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {tabla.campos.map((campo, i) => (
                          <tr
                            key={i}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            {tabla.headers.map((h) => (
                              <td
                                key={h}
                                className={`px-5 py-3 text-sm ${
                                  isCampoColumn(h)
                                    ? 'font-mono text-slate-800'
                                    : 'text-slate-500'
                                }`}
                              >
                                {campo[h] || '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* — Llave primaria — */}
                {tabla.llavePrimaria && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2.5">
                    <TbKey className="shrink-0" size={15} />
                    <span className="font-medium">Llave primaria:</span>
                    <code className="text-indigo-600 text-xs">{tabla.llavePrimaria}</code>
                  </div>
                )}

                {/* — Relaciones — */}
                {tabla.relaciones.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                      <TbArrowRight className="text-indigo-500" size={15} />
                      Relaciones
                    </h3>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-slate-400">
                              Tabla origen
                            </th>
                            <th className="text-center px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-slate-400 w-10">
                              &nbsp;
                            </th>
                            <th className="text-left px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-slate-400">
                              Tabla destino
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {tabla.relaciones.map((rel, i) => (
                            <tr
                              key={i}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="px-5 py-2.5 text-sm font-medium text-slate-700">
                                {rel.origen}
                              </td>
                              <td className="px-5 py-2.5 text-sm text-slate-300 text-center">
                                →
                              </td>
                              <td className="px-5 py-2.5 text-sm text-slate-500">
                                {rel.destino}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            ))
          )}
        </div>

        {/* — Columna derecha: navegación lateral — */}
        {filteredTables.length > 1 && (
          <aside className="hidden lg:block w-44 shrink-0">
            <div className="sticky top-20">
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3">
                Tablas
              </h3>
              <nav className="space-y-0.5">
                {filteredTables.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => scrollTo(t.id)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-all duration-150 truncate ${
                      activeId === t.id
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {t.nombre}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* — Sidebar mínimo cuando hay 1 sola tabla (siempre visible) — */}
        {filteredTables.length === 1 && (
          <aside className="hidden lg:block w-44 shrink-0">
            <div className="sticky top-20">
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3">
                Tablas
              </h3>
              <nav className="space-y-0.5">
                <span className="block text-sm px-3 py-1.5 rounded-lg text-slate-400 italic">
                  1 tabla
                </span>
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
