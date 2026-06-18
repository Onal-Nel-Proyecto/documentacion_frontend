import { useNavigate } from 'react-router-dom'
import { TbBooks, TbCode, TbArrowRight, TbUsers } from 'react-icons/tb'
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
        <span className="text-sm font-semibold text-slate-700">Documentación</span>
        <span className="ml-2 text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">v1.1.0</span>
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

        {/* Developers section */}
        <div className="w-full max-w-2xl mt-16 page-enter">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <TbUsers className="text-slate-500" size={18} />
            </div>
            <h2 className="text-lg text-slate-800">Equipo de Desarrollo</h2>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Desarrollador</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Área empleada</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Rol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ['Delio Rafael Villa Cantillo', 'Desarrollador Front-end', 'Product Owner'],
                  ['Wilfrido Adarraga Lawson', 'Desarrollador Full-Stack', 'Scrum Master'],
                  ['Javier David Mercado Oquendo', 'Desarrollador Front-end', 'Equipo de desarrollo'],
                  ['Daniel Lafaurie', 'Desarrollador Back-end', 'Equipo de desarrollo'],
                ].map(([name, area, role]) => (
                  <tr key={name} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-xs text-slate-800 font-medium">{name}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{area}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-slate-400 text-center">
          Documentación · Última actualización: Junio 2026
        </p>
      </div>
    </div>
  )
}
