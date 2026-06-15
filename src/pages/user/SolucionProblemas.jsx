import { useEffect, useState, useCallback } from 'react'
import { TbPhoto } from 'react-icons/tb'
import { getUserModules } from '../../services/userImagesService'
import { LoadingSkeleton, ErrorDisplay, EmptyState } from '../../components/LoadingStates'
import ImageLightbox from '../../components/ImageLightbox'

/* ──────────────────────────────────────────────
   Utilidades
   ────────────────────────────────────────────── */

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/* ──────────────────────────────────────────────
   Componente de imagen
   ────────────────────────────────────────────── */

function ProblemImage({ src, title, figura, onClick }) {
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
        className="w-full rounded-xl border border-slate-200 shadow-sm transition-shadow duration-200 group-hover:shadow-lg group-hover:border-blue-200"
      />
      <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
        <span className="text-white/0 group-hover:text-white/70 text-xs font-medium transition-colors duration-200 bg-black/0 group-hover:bg-black/40 px-3 py-1.5 rounded-lg">
          Ver completo
        </span>
      </div>
    </button>
  )
}

/* ──────────────────────────────────────────────
   Página de Solución de Problemas
   ────────────────────────────────────────────── */

export default function SolucionProblemas() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      const result = await getUserModules('solucion-problemas')
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <>
    <div className="page-enter">
      {/* Page header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Manual de Usuario
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Solución de problemas</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Diagramas y guías visuales para la resolución de problemas comunes dentro del sistema.
        </p>
      </div>

      {/* Loading */}
      {loading && <LoadingSkeleton />}

      {/* Error */}
      {!loading && error && <ErrorDisplay message={error} onRetry={loadData} />}

      {/* Vacío */}
      {!loading && !error && data && data.length === 0 && <EmptyState />}

      {/* Módulos con imágenes */}
      {!loading && !error && data && data.length > 0 && (
        <>
          {data.map((modulo, mIdx) => (
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
                    const figura = `Figura ${mIdx + 1}.${iIdx + 1}`
                    return (
                      <div key={img.id || `${mIdx}-${iIdx}`}>
                        <ProblemImage
                          src={img.url}
                          title={img.title}
                          figura={figura}
                          onClick={() => openLightbox(img.url, `${figura}${img.title ? ` — ${img.title}` : ''}`)}
                        />

                        <p className="text-xs text-slate-400 mt-2 text-center">
                          {figura}
                          {img.title ? ` — ${img.title}` : ''}
                        </p>
                      </div>
                    )
                  })}
              </div>
            </section>
          ))}
        </>
      )}
    </div>

      {/* Lightbox */}
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
