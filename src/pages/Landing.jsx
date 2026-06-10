import { useNavigate } from 'react-router-dom'
import { TbBooks, TbCode, TbArrowRight } from 'react-icons/tb'
import { HiSparkles } from 'react-icons/hi2'

const cards = [
  {
    id: 'usuario',
    icon: TbBooks,
    label: 'Manual de Usuario',
    desc: 'Guía paso a paso para usuarios finales: primeros pasos, interfaz, flujos y solución de problemas.',
    color: 'blue',
    path: '/usuario/primeros-pasos',
    tags: ['Primeros pasos', 'Interfaz', 'Flujos'],
  },
  {
    id: 'tecnico',
    icon: TbCode,
    label: 'Manual Técnico',
    desc: 'Documentación técnica completa: instalación, arquitectura, base de datos y endpoints de la API.',
    color: 'indigo',
    path: '/tecnico/inicio',
    tags: ['Arquitectura', 'API', 'DB'],
  },
]

const colorMap = {
  blue:   { card: 'hover:border-blue-300', icon: 'bg-blue-600', badge: 'bg-blue-50 text-blue-600', btn: 'bg-blue-600 hover:bg-blue-700' },
  indigo: { card: 'hover:border-indigo-300', icon: 'bg-indigo-600', badge: 'bg-indigo-50 text-indigo-600', btn: 'bg-indigo-600 hover:bg-indigo-700' },
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      {/* Subtle top bar */}
      <div className="border-b border-slate-200 bg-white px-8 py-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
          <HiSparkles className="text-white" size={13} />
        </div>
        <span className="text-sm font-semibold text-slate-700">TechDocs</span>
        <span className="ml-2 text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">v1.0.4</span>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center max-w-xl mb-14 page-enter">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Documentación oficial
          </div>
          <h1 className="text-5xl sm:text-6xl text-slate-900 leading-[1.1] mb-4">
            Centro de<br />Documentación
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Selecciona el tipo de documentación que necesitas.<br />
            Encuentra todo lo que buscas de forma rápida y clara.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl page-enter">
          {cards.map(({ id, icon: Icon, label, desc, color, path, tags }) => {
            const c = colorMap[color]
            return (
              <button
                key={id}
                onClick={() => navigate(path)}
                className={`
                  group text-left bg-white rounded-2xl border border-slate-200 ${c.card}
                  p-6 shadow-sm hover:shadow-md transition-all duration-200
                `}
              >
                <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">{label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map(t => (
                    <span key={t} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${c.badge}`}>{t}</span>
                  ))}
                </div>

                <div className={`flex items-center gap-1.5 text-sm font-semibold text-white ${c.btn} px-4 py-2 rounded-lg w-fit`}>
                  Abrir manual
                  <TbArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-slate-400 text-center">
          Documentación generada con TechDocs · Última actualización: Abril 2026
        </p>
      </div>
    </div>
  )
}
