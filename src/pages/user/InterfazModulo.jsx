import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TbArrowLeft, TbPhoto } from 'react-icons/tb'
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

function ModuleImage({ src, title, figura, onClick }) {
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
   Página de detalle de módulo
   ────────────────────────────────────────────── */

export default function InterfazModulo() {
  const { modulo } = useParams()
  const navigate = useNavigate()

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
      const result = await getUserModules('interfaz')

      // Encontrar el módulo que coincide con el slug de la URL
      const matched = result.find((m) => slugify(m.module) === modulo)

      if (!matched) {
        throw new Error(`Módulo "${modulo}" no encontrado`)
      }

      setData(matched)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [modulo])

  useEffect(() => {
    loadData()
  }, [loadData])

  /* ── Módulo no encontrado ── */
  if (!loading && error && error.includes('no encontrado')) {
    return (
      <div className="page-enter min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <TbPhoto className="text-red-400" size={28} />
        </div>
        <h1 className="text-2xl text-slate-800 mb-2">Módulo no encontrado</h1>
        <p className="text-slate-500 text-sm max-w-xs mb-6">
          El módulo <strong>{modulo}</strong> no existe o ha sido eliminado.
        </p>
        <button
          onClick={() => navigate('/usuario/interfaz')}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-colors"
        >
          <TbArrowLeft size={16} />
          Volver a Interfaz general
        </button>
      </div>
    )
  }

  return (
    <>
    <div className="page-enter">
      {/* Botón Regresar */}
      <button
        onClick={() => navigate('/usuario/interfaz')}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <TbArrowLeft size={16} />
        Volver a Interfaz general
      </button>

      {/* Título */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Manual de Usuario
        </span>
        <h1 className="text-3xl text-slate-900 mt-3 mb-2">
          {data?.module || 'Cargando...'}
        </h1>
      </div>

      {/* Loading */}
      {loading && <LoadingSkeleton />}

      {/* Error */}
      {!loading && error && !error.includes('no encontrado') && (
        <ErrorDisplay message={error} onRetry={loadData} />
      )}

      {/* Vacío */}
      {!loading && !error && data && data.images.length === 0 && <EmptyState />}

      {/* Imágenes — galería en grid */}
      {!loading && !error && data && data.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...data.images]
            .sort((a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity))
            .map((img, iIdx) => {
              const figura = `Figura ${iIdx + 1}`
              return (
                <div key={img.id || iIdx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <ModuleImage
                    src={img.url}
                    title={img.title}
                    figura={figura}
                    onClick={() => openLightbox(img.url, `${figura}${img.title ? ` — ${img.title}` : ''}`)}
                  />

                  <div className="px-3 pb-3 pt-1.5">
                    <p className="text-xs text-slate-400 text-center">
                      {figura}
                      {img.title ? ` — ${img.title}` : ''}
                    </p>
                  </div>
                </div>
              )
            })}
        </div>
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
