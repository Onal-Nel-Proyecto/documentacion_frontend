import {
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineShieldExclamation,
} from 'react-icons/hi2'
import {
  TbDeviceDesktop,
  TbDeviceLaptop,
  TbShieldLock,
  TbListCheck,
} from 'react-icons/tb'

const knowledgeCards = [
  {
    icon: TbDeviceDesktop,
    title: 'Informática básica',
    desc: 'El usuario debe estar familiarizado con el uso general de computadores, navegadores web, formularios, menús de navegación y operaciones básicas como crear, consultar, modificar y eliminar información dentro de una aplicación.',
  },
  {
    icon: TbDeviceLaptop,
    title: 'Sistemas operativos',
    desc: 'Se recomienda tener conocimientos básicos sobre el manejo de sistemas operativos modernos, incluyendo la apertura de aplicaciones, gestión de archivos y configuración básica del navegador utilizado para acceder al sistema.',
  },
  {
    icon: TbShieldLock,
    title: 'Seguridad y acceso',
    desc: 'El usuario debe conocer las políticas de acceso establecidas por la organización, incluyendo el uso adecuado de credenciales, validación de usuarios y manejo responsable de contraseñas.',
  },
]

const securityNorms = [
  'Cada usuario debe utilizar únicamente su propia cuenta de acceso. Las credenciales son personales e intransferibles.',
  'Las contraseñas deben mantenerse en confidencialidad y no deben compartirse con terceros.',
  'Al finalizar las actividades dentro del sistema, se recomienda cerrar sesión para evitar accesos no autorizados.',
  'La información consultada o gestionada dentro de la plataforma debe utilizarse únicamente para fines autorizados por la organización.',
  'Los usuarios deben hacer un uso adecuado de las funcionalidades disponibles y evitar acciones que puedan afectar la seguridad, disponibilidad o integridad de la información.',
]

const recommendations = [
  'Utilizar contraseñas seguras.',
  'No compartir credenciales de acceso.',
  'Mantener actualizado el navegador web.',
  'Verificar siempre que se está accediendo a la plataforma oficial.',
  'Reportar cualquier comportamiento inusual o error detectado durante el uso del sistema.',
]

export default function Requerimientos() {
  return (
    <div className="page-enter">
      {/* Page header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Manual de Usuario
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Requerimientos</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Antes de utilizar la plataforma, los usuarios deben conocer ciertos conceptos básicos relacionados con el uso de sistemas informáticos y las normas de seguridad establecidas para garantizar la protección de la información y el correcto funcionamiento de la aplicación.
        </p>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl mt-4">
          El cumplimiento de estos requisitos contribuye a una experiencia más segura y eficiente dentro del sistema.
        </p>
      </div>

      {/* Requisitos de conocimiento */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-6">
          Requisitos de conocimiento para manejar el sistema
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Los usuarios que utilicen la plataforma deben contar con conocimientos básicos que les permitan navegar y operar correctamente las funcionalidades disponibles.
        </p>
        <div className="space-y-4">
          {knowledgeCards.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="flex gap-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow"
            >
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Icon size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Política de seguridad */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-4">Política de seguridad</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Todos los usuarios son responsables de proteger la información a la que tienen acceso dentro de la plataforma.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mt-3">
          Antes de utilizar el sistema, es importante leer y comprender las políticas de seguridad establecidas por la organización. El incumplimiento de estas normas puede generar riesgos para la información y afectar la integridad de los procesos gestionados dentro de la aplicación.
        </p>
      </section>

      {/* Normas de seguridad */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-4">Normas de seguridad</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <ul className="space-y-3">
            {securityNorms.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <HiOutlineCheckCircle className="text-green-500 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-4">Recomendaciones</h2>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <ul className="space-y-3">
            {recommendations.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <TbListCheck className="text-blue-500 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nota importante */}
      <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-10">
        <HiOutlineShieldExclamation className="text-amber-500 mt-0.5 shrink-0" size={20} />
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>Nota importante:</strong> El acceso y uso del sistema implica la aceptación de las políticas de seguridad establecidas por la organización. Todos los usuarios deben cumplir estas disposiciones para garantizar la protección de la información y el correcto funcionamiento de la plataforma.
        </p>
      </div>
    </div>
  )
}
