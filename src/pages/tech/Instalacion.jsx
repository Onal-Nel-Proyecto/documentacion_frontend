import { HiOutlineInformationCircle } from 'react-icons/hi2'
import {
  TbDownload,
  TbDatabase,
  TbKey,
  TbPackages,
  TbPlayerPlay,
  TbWorld,
  TbAlertTriangle,
} from 'react-icons/tb'

const requisitos = [
  { name: 'Node.js',   desc: 'Entorno de ejecución para JavaScript' },
  { name: 'pnpm',      desc: 'Gestor de paquetes utilizado en el backend' },
  { name: 'npm',       desc: 'Gestor de paquetes alternativo para el frontend' },
  { name: 'MySQL',     desc: 'Sistema gestor de base de datos' },
  { name: 'XAMPP',     desc: 'Entorno local utilizado para ejecutar MySQL' },
  { name: 'Git',       desc: 'Control de versiones del proyecto' },
]

const variablesBackend = [
  { var: 'PORT',                   desc: 'Puerto donde se ejecuta el servidor backend' },
  { var: 'MYSQL_HOST',             desc: 'Dirección del servidor MySQL' },
  { var: 'MYSQL_PORT',             desc: 'Puerto de MySQL' },
  { var: 'MYSQL_USER',             desc: 'Usuario de la base de datos' },
  { var: 'MYSQL_PASS',             desc: 'Contraseña de MySQL' },
  { var: 'MYSQL_DATABASE',         desc: 'Nombre de la base de datos' },
  { var: 'ACCESS_TOKEN_KEY',       desc: 'Clave secreta para JWT de acceso' },
  { var: 'ACCESS_TOKEN_EXPIRES_IN', desc: 'Tiempo de expiración del access token' },
  { var: 'REFRESH_TOKEN_KEY',      desc: 'Clave secreta para refresh token' },
  { var: 'REFRESH_TOKEN_EXPIRES_IN', desc: 'Tiempo de expiración del refresh token' },
]

const accesos = [
  { servicio: 'Frontend', url: 'http://localhost:5173' },
  { servicio: 'Backend',  url: 'http://localhost:3000' },
]

export default function Instalacion() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Manual Técnico
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Instalación</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Guía paso a paso para clonar, configurar y ejecutar el proyecto Onal&amp;Nel en un entorno local.
        </p>
      </div>

      {/* Requisitos Previos */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbDownload className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Requisitos Previos</h2>
        </div>
        <p className="text-slate-500 text-sm mb-4">
          Antes de ejecutar el proyecto es necesario contar con las siguientes herramientas instaladas en el sistema:
        </p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Herramienta</th>
                <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requisitos.map(({ name, desc }) => (
                <tr key={name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    <code>{name}</code>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Clonar el Repositorio */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbDownload className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Clonar el Repositorio</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto">git clone &lt;URL_DEL_REPOSITORIO&gt;</pre>
        </div>
      </section>

      {/* Configuración de la Base de Datos */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbDatabase className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Configuración de la Base de Datos</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            El proyecto utiliza MySQL como sistema gestor de base de datos. Para el entorno local se recomienda utilizar XAMPP.
          </p>
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Pasos</h3>
          <ol className="space-y-2">
            {[
              'Iniciar Apache y MySQL desde XAMPP.',
              'Crear la base de datos correspondiente en MySQL.',
              'Importar el archivo <code>.sql</code> del proyecto si existe un respaldo de la base de datos.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-indigo-600">{i + 1}</span>
                </span>
                <span dangerouslySetInnerHTML={{ __html: step }} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Variables de Entorno */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbKey className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Variables de Entorno</h2>
        </div>

        {/* Backend */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3">Backend</h3>
          <p className="text-slate-500 text-sm mb-3">
            Crear un archivo <code>.env</code> en la raíz del proyecto backend con la siguiente configuración:
          </p>
          <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto mb-4">{`PORT=

# Configuración MySQL
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASS=
MYSQL_DATABASE=

# Configuración JWT
ACCESS_TOKEN_KEY=
ACCESS_TOKEN_EXPIRES_IN=

REFRESH_TOKEN_KEY=
REFRESH_TOKEN_EXPIRES_IN=`}</pre>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Variable</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {variablesBackend.map(({ var: v, desc }) => (
                  <tr key={v} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      <code>{v}</code>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Frontend */}
        <div>
          <h3 className="text-base font-semibold text-slate-800 mb-3">Frontend</h3>
          <p className="text-slate-500 text-sm mb-3">
            Crear un archivo <code>.env</code> en la raíz del proyecto frontend:
          </p>
          <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto">VITE_API_URL=http://localhost:3000/</pre>
        </div>
      </section>

      {/* Instalación de Dependencias */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbPackages className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Instalación de Dependencias</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Backend</h3>
            <p className="text-slate-500 text-xs mb-3">
              El backend utiliza <code>pnpm</code> como gestor principal.
            </p>
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-3 overflow-x-auto">pnpm install</pre>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Frontend</h3>
            <p className="text-slate-500 text-xs mb-3">
              Puede instalarse con <code>pnpm</code> o <code>npm</code>.
            </p>
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-3 overflow-x-auto mb-2">pnpm install</pre>
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-3 overflow-x-auto">npm install</pre>
          </div>
        </div>
      </section>

      {/* Ejecución del Proyecto */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbPlayerPlay className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Ejecución del Proyecto</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Backend</h3>
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-3 overflow-x-auto mb-2">pnpm dev</pre>
            <p className="text-xs text-slate-500">
              El servidor backend iniciará en el puerto configurado en la variable <code>PORT</code>.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Frontend</h3>
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-3 overflow-x-auto mb-2">pnpm dev</pre>
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-3 overflow-x-auto">npm run dev</pre>
          </div>
        </div>
      </section>

      {/* Acceso al Sistema */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbWorld className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Acceso al Sistema</h2>
        </div>
        <p className="text-slate-500 text-sm mb-3">
          Una vez iniciado el proyecto:
        </p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Servicio</th>
                <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accesos.map(({ servicio, url }) => (
                <tr key={servicio} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-800">{servicio}</td>
                  <td className="px-5 py-4">
                    <code className="text-indigo-600">{url}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Consideraciones */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <TbAlertTriangle className="text-amber-500" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Consideraciones</h2>
        </div>
        <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
          <TbAlertTriangle className="text-amber-400 mt-0.5 shrink-0" size={20} />
          <ul className="space-y-1.5">
            {[
              'Verificar que MySQL se encuentre en ejecución antes de iniciar el backend.',
              'Confirmar que las variables de entorno estén correctamente configuradas.',
              'Asegurarse de instalar todas las dependencias antes de ejecutar el proyecto.',
              'Mantener sincronizada la configuración de la URL del backend en el frontend.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                <span className="text-amber-500 font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
