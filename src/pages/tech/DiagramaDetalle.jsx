import { useEffect, useRef, useState, useCallback, Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TbArrowLeft, TbPhoto } from 'react-icons/tb'
import { diagramaSlugs, introducciones } from './diagramasData'
import { getDiagramas } from '../../services/diagramasService'
import { LoadingSkeleton, ErrorDisplay, EmptyState } from '../../components/LoadingStates'
import ImageLightbox from '../../components/ImageLightbox'

/* ──────────────────────────────────────────────
   Utilidades
   ────────────────────────────────────────────── */

/** Convierte texto a un id seguro para usar en el DOM */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/** Genera el texto de figura según la posición del módulo y la imagen */
function generarFigura(moduleIndex, imageIndex) {
  return `Figura ${moduleIndex + 1}.${imageIndex + 1}`
}

/* ──────────────────────────────────────────────
   Parseo de descripción (bold, listas, saltos de línea)
   ────────────────────────────────────────────── */

/**
 * Renderiza inline bold con **texto**.
 */
function parseInline(text) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

/**
 * Renderiza la descripción con soporte para:
 * - \n como salto de línea
 * - **texto** como negrita
 * - -- al inicio de línea como lista no ordenada
 * - --1 al inicio de línea como lista ordenada
 */
function DiagramDescription({ text }) {
  if (!text) return null
  const lines = text.split('\n')

  const blocks = []
  let ulBuffer = []
  let olBuffer = []

  function flush() {
    if (ulBuffer.length) {
      blocks.push(<ul key={blocks.length} className="list-disc list-inside space-y-1">{ulBuffer}</ul>)
      ulBuffer = []
    }
    if (olBuffer.length) {
      blocks.push(<ol key={blocks.length} className="list-decimal list-inside space-y-1">{olBuffer}</ol>)
      olBuffer = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (/^--1[\s]/.test(line)) {
      flush()
      olBuffer.push(<li key={`ol-${i}`}>{parseInline(line.slice(4))}</li>)
    } else if (/^--[\s]/.test(line)) {
      flush()
      ulBuffer.push(<li key={`ul-${i}`}>{parseInline(line.slice(3))}</li>)
    } else {
      flush()
      blocks.push(
        <p key={blocks.length} className="text-sm text-slate-600 leading-relaxed">
          {parseInline(line)}
        </p>,
      )
    }
  }
  flush()

  return <div className="space-y-1.5">{blocks}</div>
}

/* ──────────────────────────────────────────────
   Componente de imagen
   ────────────────────────────────────────────── */

function DiagramImage({ src, title, figura, onClick }) {
  const [hasError, setHasError] = useState(false)
  const showPlaceholder = !src || hasError

  if (showPlaceholder) {
    return (
      <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center min-h-[180px]">
        <TbPhoto className="text-slate-300 mb-3" size={40} />
        <span className="text-sm font-medium text-slate-400">{figura}</span>
        {title && (
          <span className="text-xs text-slate-400 mt-1 text-center leading-relaxed">
            {title}
          </span>
        )}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left group relative"
      aria-label={`Ver ${figura}${title ? ` — ${title}` : ''} a pantalla completa`}
    >
      <img
        src={src}
        alt={`${figura}${title ? ` — ${title}` : ''}`}
        onError={() => setHasError(true)}
        loading="lazy"
        className="w-full rounded-xl border border-slate-200 shadow-sm transition-shadow duration-200 group-hover:shadow-lg group-hover:border-indigo-200"
      />
      {/* Overlay sutil al hacer hover */}
      <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
        <span className="text-white/0 group-hover:text-white/70 text-xs font-medium transition-colors duration-200 bg-black/0 group-hover:bg-black/40 px-3 py-1.5 rounded-lg">
          Ver completo
        </span>
      </div>
    </button>
  )
}

/* ──────────────────────────────────────────────
   Página de detalle
   ────────────────────────────────────────────── */

export default function DiagramaDetalle() {
  const { diagrama } = useParams()
  const navigate = useNavigate()

  const config = diagramaSlugs.find((s) => s.slug === diagrama)
  const introduccion = introducciones[diagrama] || ''

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeId, setActiveId] = useState('')
  const observerRef = useRef(null)

  /* ── Lightbox ── */
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [lightboxAlt, setLightboxAlt] = useState('')

  const openLightbox = useCallback((src, alt) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null)
    setLightboxAlt('')
  }, [])

  /* ── Carga de datos ── */
  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await getDiagramas(diagrama)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [diagrama])

  useEffect(() => {
    if (config) {
      loadData()
    } else {
      setLoading(false)
    }
  }, [config, loadData])

  /* ── Módulos ordenados alfabéticamente ── */
  const sortedData = data && [...data].sort((a, b) =>
    a.module.localeCompare(b.module, 'es', { sensitivity: 'base' }),
  )

  /* ── Items del menú lateral (solo si hay más de un módulo) ── */
  const navItems =
    sortedData && sortedData.length > 1
      ? sortedData.map((m) => ({ id: slugify(m.module), label: m.module }))
      : []

  /* ── Intersection Observer para resaltar sección activa ── */
  useEffect(() => {
    if (!sortedData || sortedData.length <= 1) return

    if (observerRef.current) observerRef.current.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('section-', '')
            setActiveId(id)
            break
          }
        }
      },
      { rootMargin: '-90px 0px -70% 0px', threshold: 0 },
    )

    sortedData.forEach((m) => {
      const el = document.getElementById(`section-${slugify(m.module)}`)
      if (el) observer.observe(el)
    })

    observerRef.current = observer
    return () => observer.disconnect()
  }, [sortedData])

  /* ── Scroll suave al hacer clic en el menú ── */
  const scrollTo = (id) => {
    const el = document.getElementById(`section-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  /* ── 404 — slug no reconocido ── */
  if (!config && !loading) {
    return (
      <div className="page-enter min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <TbPhoto className="text-red-400" size={28} />
        </div>
        <h1 className="text-2xl text-slate-800 mb-2">Diagrama no encontrado</h1>
        <p className="text-slate-500 text-sm max-w-xs mb-6">
          El diagrama <strong>{diagrama}</strong> no existe o ha sido eliminado.
        </p>
        <button
          onClick={() => navigate('/tecnico/diagramas')}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl transition-colors"
        >
          <TbArrowLeft size={16} />
          Volver a Diagramas
        </button>
      </div>
    )
  }

  return (
    <>
    <div className="page-enter">
      {/* ── Botón Regresar ── */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <TbArrowLeft size={16} />
        Regresar
      </button>

      {/* ── Título ── */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Manual Técnico
        </span>
        <h1 className="text-3xl text-slate-900 mt-3 mb-2">
          {config?.label || 'Diagramas'}
        </h1>
      </div>

      {/* ── Loading ── */}
      {loading && <LoadingSkeleton />}

      {/* ── Error ── */}
      {!loading && error && <ErrorDisplay message={error} onRetry={loadData} />}

      {/* ── Vacío ── */}
      {!loading && !error && data && data.length === 0 && <EmptyState />}

      {/* ── Datos ── */}
      {!loading && !error && data && data.length > 0 && (
        <div className="flex gap-8">
          {/* — Columna izquierda: contenido principal — */}
          <div className="flex-1 min-w-0">
            {/* Introducción (texto estático) */}
            {introduccion && (
              <section id="section-principal" className="mb-10 scroll-mt-24">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {introduccion}
                </p>
              </section>
            )}

            {/* Módulos */}
            {sortedData.map((modulo, mIdx) => (
              <section
                key={modulo.module}
                id={`section-${slugify(modulo.module)}`}
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-2xl text-slate-800 mb-5">
                  {modulo.module}
                </h2>

                <div className="space-y-8">
                  {[...modulo.images]
                    .sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity))
                    .map((img, iIdx) => {
                      const figura = generarFigura(mIdx, iIdx)
                      return (
                        <div key={img.id || `${mIdx}-${iIdx}`}>
                          <DiagramImage
                            src={img.url}
                            title={img.title}
                            figura={figura}
                            onClick={() => openLightbox(img.url, `${figura}${img.title ? ` — ${img.title}` : ''}`)}
                          />

                          {/* Texto de referencia debajo de la imagen */}
                          <p className="text-xs text-slate-400 mt-2 text-center">
                            {figura}
                            {img.title ? ` — ${img.title}` : ''}
                          </p>

                          {/* Descripción con formato (bold, listas, saltos de línea) */}
                          {img.description && (
                            <DiagramDescription text={img.description} />
                          )}
                        </div>
                      )
                    })}
                </div>
              </section>
            ))}
          </div>

          {/* — Columna derecha: menú sticky (solo si >1 módulo) — */}
          {navItems.length > 0 && (
            <aside className="hidden lg:block w-44 shrink-0">
              <div className="sticky top-20">
                <h3 className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3">
                  En esta página
                </h3>
                <nav className="space-y-1">
                  {navItems.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-all duration-150 ${
                        activeId === id
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      )}

      </div>

      {/* ── Lightbox (fuera de .page-enter para evitar que transform rompa fixed) ── */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}
