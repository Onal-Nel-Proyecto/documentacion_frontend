import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { TbAlertCircle, TbApi } from 'react-icons/tb'
import apiRaw from '/DOC_ENDPOINTS.md?raw'
import { parseApiDoc } from '../../services/apiParser'
import ApiSearch from '../../components/ApiSearch'
import EndpointCard from '../../components/EndpointCard'

/* ─── Página principal ─────────────────────────── */

export default function Api() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMethod, setActiveMethod] = useState('Todos')
  const [activeId, setActiveId] = useState('')
  const [error, setError] = useState(null)
  const observerRef = useRef(null)

  /* ── Parsear markdown una sola vez ── */
  const modules = useMemo(() => {
    try {
      return parseApiDoc(apiRaw)
    } catch (e) {
      setError(e.message)
      return null
    }
  }, [])

  /* ── Extraer todos los métodos disponibles ── */
  const allMethods = useMemo(() => {
    if (!modules) return []
    const set = new Set()
    modules.forEach((m) => m.endpoints.forEach((e) => set.add(e.method)))
    return [...set].sort()
  }, [modules])

  /* ── Filtrar por búsqueda y método ── */
  const filteredModules = useMemo(() => {
    if (!modules) return []

    return modules
      .map((mod) => {
        let eps = mod.endpoints

        // Filtro por método
        if (activeMethod !== 'Todos') {
          eps = eps.filter((e) => e.method === activeMethod)
        }

        // Filtro por texto
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          eps = eps.filter(
            (e) =>
              e.path.toLowerCase().includes(q) ||
              e.method.toLowerCase().includes(q) ||
              e.description.toLowerCase().includes(q) ||
              mod.name.toLowerCase().includes(q),
          )
        }

        return eps.length > 0 ? { ...mod, endpoints: eps } : null
      })
      .filter(Boolean)
  }, [modules, searchQuery, activeMethod])

  /* ── Contar endpoints totales visibles ── */
  const totalEndpoints = useMemo(
    () => filteredModules.reduce((acc, m) => acc + m.endpoints.length, 0),
    [filteredModules],
  )

  /* ── Activar primer módulo por defecto ── */
  useEffect(() => {
    if (filteredModules.length > 0 && !activeId) {
      setActiveId(filteredModules[0].id)
    }
  }, [filteredModules, activeId])

  /* ── Observer para resaltar sección activa ── */
  useEffect(() => {
    if (filteredModules.length === 0) return

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

    filteredModules.forEach((m) => {
      const el = document.getElementById(`section-${m.id}`)
      if (el) observer.observe(el)
    })

    observerRef.current = observer
    return () => observer.disconnect()
  }, [filteredModules])

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
          No fue posible cargar la documentación de la API.
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
  if (modules && modules.length === 0) {
    return (
      <div className="page-enter flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
          <TbApi className="text-slate-300" size={28} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 mb-1">
          No existen endpoints documentados.
        </h2>
        <p className="text-sm text-slate-500 max-w-xs">
          El archivo de documentación no contiene información de endpoints.
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
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">API REST</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Documentación técnica de los endpoints disponibles en el sistema.
        </p>
      </div>

      {/* ── Búsqueda + Filtros ── */}
      <div className="mb-8">
        <ApiSearch
          searchQuery={searchQuery}
          methods={allMethods}
          activeMethod={activeMethod}
          onSearchChange={setSearchQuery}
          onMethodChange={setActiveMethod}
        />
        {(searchQuery || activeMethod !== 'Todos') && (
          <p className="text-xs text-slate-400 mt-2">
            {totalEndpoints}{' '}
            {totalEndpoints === 1 ? 'endpoint encontrado' : 'endpoints encontrados'}{' '}
            en {filteredModules.length}{' '}
            {filteredModules.length === 1 ? 'módulo' : 'módulos'}
          </p>
        )}
      </div>

      {/* ── Layout dos columnas ── */}
      <div className="flex gap-8">
        {/* — Columna izquierda: contenido — */}
        <div className="flex-1 min-w-0">
          {filteredModules.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                <TbApi className="text-slate-300" size={24} />
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                {activeMethod !== 'Todos'
                  ? `No se encontraron endpoints ${activeMethod}${searchQuery ? ` que coincidan con "${searchQuery}"` : ''}.`
                  : `No se encontraron endpoints que coincidan con "${searchQuery}".`}
              </p>
            </div>
          ) : (
            filteredModules.map((mod) => (
              <section
                key={mod.id}
                id={`section-${mod.id}`}
                className="mb-12 scroll-mt-24"
              >
                {/* — Encabezado del módulo — */}
                <div className="flex items-center gap-2 mb-1">
                  <TbApi className="text-indigo-500 shrink-0" size={18} />
                  <h2 className="text-2xl text-slate-800">{mod.name}</h2>
                  {mod.prefix && (
                    <code className="text-xs text-slate-400 font-mono">
                      {mod.prefix}
                    </code>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-5 ml-[26px]">
                  {mod.endpoints.length}{' '}
                  {mod.endpoints.length === 1 ? 'endpoint' : 'endpoints'}
                </p>

                {/* — Endpoints — */}
                <div className="space-y-4">
                  {mod.endpoints.map((ep, i) => (
                    <EndpointCard key={`${ep.method}-${ep.path}-${i}`} endpoint={ep} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        {/* — Columna derecha: navegación lateral — */}
        {filteredModules.length > 1 && (
          <aside className="hidden lg:block w-44 shrink-0">
            <div className="sticky top-20">
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3">
                Módulos
              </h3>
              <nav className="space-y-0.5">
                {filteredModules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => scrollTo(m.id)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-all duration-150 truncate ${
                      activeId === m.id
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* — Sidebar cuando hay 1 módulo — */}
        {filteredModules.length === 1 && (
          <aside className="hidden lg:block w-44 shrink-0">
            <div className="sticky top-20">
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3">
                Módulos
              </h3>
              <nav className="space-y-0.5">
                <span className="block text-sm px-3 py-1.5 rounded-lg text-slate-400 italic">
                  1 módulo
                </span>
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
