import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbHierarchy2, TbPhoto } from 'react-icons/tb'
import { getUserModules } from '../../services/userImagesService'
import { LoadingSkeleton, ErrorDisplay, EmptyState } from '../../components/LoadingStates'
import Card from '../../components/Card'

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
   Página principal de Interfaz
   ────────────────────────────────────────────── */

export default function Interfaz() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await getUserModules('interfaz')
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
    <div className="page-enter">
      {/* Page header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Manual de Usuario
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Interfaz general</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Explore los diferentes módulos de la interfaz del sistema. Seleccione un módulo para ver sus diagramas y descripciones detalladas.
        </p>
      </div>

      {/* Loading */}
      {loading && <LoadingSkeleton />}

      {/* Error */}
      {!loading && error && <ErrorDisplay message={error} onRetry={loadData} />}

      {/* Vacío */}
      {!loading && !error && data && data.length === 0 && <EmptyState />}

      {/* Módulos */}
      {!loading && !error && data && data.length > 0 && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.map((modulo) => {
              const slug = slugify(modulo.module)
              const imageCount = modulo.images.length

              return (
                <Card
                  key={slug}
                  icon={TbHierarchy2}
                  title={modulo.module}
                  description={`${imageCount} ${imageCount === 1 ? 'diagrama' : 'diagramas'} disponible${imageCount === 1 ? '' : 's'}`}
                  onClick={() => navigate(`/usuario/interfaz/${slug}`)}
                />
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
