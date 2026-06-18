import { NavLink, useNavigate } from 'react-router-dom'
import { HiX, HiArrowRight, HiHome } from 'react-icons/hi'
import { TbBooks, TbCode } from 'react-icons/tb'
import { userNav, techNav } from '../routes/navConfig'

export default function Sidebar({ type, isOpen, onClose }) {
  const navigate = useNavigate()
  const nav = type === 'usuario' ? userNav : techNav
  const isUser = type === 'usuario'

  const switchTarget = isUser ? '/tecnico/inicio' : '/usuario/primeros-pasos'
  const switchLabel  = isUser ? 'Ir a Manual Técnico' : 'Ir a Manual de Usuario'
  const SwitchIcon   = isUser ? TbCode : TbBooks

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-white border-r border-slate-200
          w-[260px] shadow-sm
          transform transition-transform duration-250 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                {isUser
                  ? <TbBooks className="text-white" size={15} />
                  : <TbCode  className="text-white" size={15} />
                }
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                {isUser ? 'Manual de Usuario' : 'Manual Técnico'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 ml-9">v1.0.0</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-700 p-1 rounded-md"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 px-3 mb-2">
            Secciones
          </p>
          <ul className="space-y-0.5">
            {nav.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium group
                    ${isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}
                      />
                      <span>{label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Switch Manual Button */}
        <div className="p-4 pb-2 border-t border-slate-100">
          <button
            onClick={() => { navigate(switchTarget); onClose?.() }}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl
              bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200
              text-slate-600 hover:text-blue-700 text-sm font-medium group"
          >
            <div className="flex items-center gap-2">
              <SwitchIcon size={17} />
              <span>{switchLabel}</span>
            </div>
            <HiArrowRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Back to Home Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => { navigate('/'); onClose?.() }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
              text-slate-400 hover:text-slate-600 hover:bg-slate-50
              text-xs font-medium transition-colors"
          >
            <HiHome size={14} />
            <span>Volver al inicio</span>
          </button>
        </div>
      </aside>
    </>
  )
}
