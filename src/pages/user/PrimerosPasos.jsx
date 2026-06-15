import { HiOutlineCheckCircle, HiOutlineInformationCircle } from 'react-icons/hi2'
import { TbPlayerPlay, TbUser, TbDeviceLaptop } from 'react-icons/tb'

const steps = [
  { icon: TbUser,         title: 'Acceso al sistema',       desc: 'Para utilizar la plataforma es necesario contar con una cuenta de usuario activa previamente registrada por un administrador del sistema.' },
  { icon: TbDeviceLaptop, title: 'Inicio de sesión', desc: 'Ingrese sus credenciales de acceso en la página principal para autenticarse y acceder a las funcionalidades autorizadas para su perfil.' },
  { icon: TbPlayerPlay,   title: 'Dashboard principal', desc: 'Una vez autenticado, el sistema mostrará el panel principal (Dashboard), desde donde podrá acceder a los módulos y herramientas habilitadas según su rol.' },
]

const reqs = [
  'Navegador Google Chrome, Mozilla Firefox, Microsoft Edge o Safari en versiones recientes.',
  'Conexión estable a Internet.',
  'Cuenta de usuario activa dentro del sistema.',
  'JavaScript habilitado en el navegador.',
  'Resolución recomendada de 1280 × 800 píxeles o superior.',
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
          Bienvenido al sistema de gestión. Este manual tiene como propósito orientar a los usuarios en el uso de la plataforma, proporcionando información sobre las funcionalidades disponibles, el acceso al sistema y los procesos que pueden realizarse según los permisos asignados a cada rol.
        </p>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl mt-4">
          La aplicación permite gestionar información, ejecutar operaciones del negocio y consultar datos de manera segura mediante una interfaz web accesible desde cualquier navegador compatible.
        </p>
      </div>

      {/* Sección: Alcance */}
      <section className="mb-10">
        <h2 className="text-2xl text-slate-800 mb-4">Alcance</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Este manual describe las principales funcionalidades del sistema y sirve como guía para los usuarios durante su interacción con la plataforma.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mt-3">
          A través de este documento se explican los procesos disponibles, la navegación dentro de la aplicación, el acceso a los diferentes módulos y las acciones que pueden ejecutarse según el rol asignado.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mt-3">
          Después de iniciar sesión, cada usuario visualizará opciones y funcionalidades específicas de acuerdo con sus permisos, por lo que el flujo de trabajo puede variar entre usuarios.
        </p>
      </section>

      {/* Info callout */}
      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 mb-10">
        <HiOutlineInformationCircle className="text-blue-500 mt-0.5 shrink-0" size={20} />
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Nota:</strong> Después de iniciar sesión y acceder al Dashboard, la navegación y las funcionalidades disponibles dependerán del rol y los permisos asignados al usuario dentro del sistema.
        </p>
      </div>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-6">Pasos informativos</h2>
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

      {/* Acceso al sistema */}
      <section>
        <h2 className="text-2xl text-slate-800 mb-4">Acceso al sistema</h2>
        <p className="text-slate-500 text-sm mb-3">
          Puede acceder a la plataforma desde la siguiente dirección:
        </p>
        <pre>{import.meta.env.VITE_URL_PAGINA_PRINCIPAL || 'https://app.tudominio.com/login'}</pre>
        <p className="text-slate-400 text-xs mt-3">
          Se recomienda guardar esta dirección en los favoritos del navegador para facilitar futuros accesos.
        </p>
      </section>
    </div>
  )
}
