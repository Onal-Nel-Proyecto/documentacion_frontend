import { useNavigate } from 'react-router-dom'
import { TbHierarchy2, TbUsers, TbActivity, TbDatabase } from 'react-icons/tb'
import Card from '../../components/Card'
import { diagramaSlugs, descripcionPorSlug } from './diagramasData'

const icons = {
  clases:                  TbHierarchy2,
  'casos-uso':             TbUsers,
  actividades:             TbActivity,
  'modelo-entidad-relacion': TbDatabase,
}

export default function Diagramas() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Manual Técnico
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Diagramas</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Diagramas del sistema que modelan la arquitectura, el flujo de trabajo y la
          estructura de datos del sistema Onal&amp;Nel.
        </p>
      </div>

      {/* Intro */}
      <section className="mb-10">
        <p className="text-slate-600 text-sm leading-relaxed">
          A continuación se presentan los diferentes diagramas que describen la
          arquitectura y el diseño del sistema. Cada diagrama aborda un aspecto
          específico del modelado, desde la estructura estática de clases hasta el
          flujo dinámico de actividades y la organización de los datos.
        </p>
      </section>

      {/* Card grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {diagramaSlugs.map(({ slug, label }) => {
            const Icon = icons[slug]
            if (!Icon) return null

            return (
              <Card
                key={slug}
                icon={Icon}
                title={label}
                description={descripcionPorSlug[slug]}
                onClick={() => navigate(`/tecnico/diagramas/${slug}`)}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
