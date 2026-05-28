import { HiOutlineCheckCircle, HiOutlineInformationCircle } from 'react-icons/hi2'
import { TbPlayerPlay, TbUser, TbDeviceLaptop } from 'react-icons/tb'

const steps = [
  { icon: TbUser,         title: 'Crear tu cuenta',       desc: 'Regístrate con tu correo corporativo en la página de inicio. Recibirás un correo de verificación en menos de 2 minutos.' },
  { icon: TbDeviceLaptop, title: 'Acceder a la plataforma', desc: 'Inicia sesión desde cualquier navegador moderno. No se requiere instalación adicional.' },
  { icon: TbPlayerPlay,   title: 'Iniciar tu primer flujo', desc: 'En el panel principal, haz clic en "Nuevo proyecto" para comenzar a usar todas las funcionalidades.' },
]

const reqs = [
  'Navegador Chrome, Firefox, Edge o Safari (versión reciente)',
  'Conexión a internet estable (mínimo 5 Mbps)',
  'Cuenta de correo corporativa verificada',
  'Resolución de pantalla recomendada: 1280×800 o superior',
]

export default function PrimeroPasos() {
  return (
    <div className="page-enter">
      {/* Page header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Manual de Usuario
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Primeros pasos</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Bienvenido a la plataforma. Esta guía te llevará desde el registro hasta tu primera sesión activa en tan solo unos minutos.
        </p>
      </div>

      {/* Info callout */}
      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 mb-10">
        <HiOutlineInformationCircle className="text-blue-500 mt-0.5 shrink-0" size={20} />
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Consejo:</strong> Si ya tienes una cuenta activa, puedes saltarte los pasos 1 y 2 e ir directamente a explorar el panel principal.
        </p>
      </div>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-6">Pasos iniciales</h2>
        <div className="space-y-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="text-blue-500" size={17} />
                  <h3 className="text-base font-semibold text-slate-800">{title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-4">Requisitos del sistema</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <ul className="space-y-3">
            {reqs.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <HiOutlineCheckCircle className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-slate-700">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick tip */}
      <section>
        <h2 className="text-2xl text-slate-800 mb-4">Acceso rápido</h2>
        <p className="text-slate-500 text-sm mb-3">
          Puedes acceder a la plataforma desde la siguiente URL:
        </p>
        <pre>{'https://app.tudominio.com/login'}</pre>
        <p className="text-slate-400 text-xs mt-3">
          Recuerda guardar esta URL en tus favoritos para un acceso más rápido.
        </p>
      </section>
    </div>
  )
}
