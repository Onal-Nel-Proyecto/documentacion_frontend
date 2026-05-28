import { TbFolderOpen, TbCode, TbServer, TbBrowser, TbStack2, TbApi } from 'react-icons/tb'

const backendFolders = [
  { folder: 'config/',      desc: 'Configuración del servidor, conexión a BD y servicios globales' },
  { folder: 'controllers/', desc: 'Gestión de solicitudes HTTP y coordinación con servicios' },
  { folder: 'jobs/',        desc: 'Tareas automatizadas ejecutadas con node-cron' },
  { folder: 'middleware/',  desc: 'Middlewares para validación, autenticación y manejo de errores' },
  { folder: 'models/',      desc: 'Lógica de acceso a datos y consultas MySQL' },
  { folder: 'routes/',      desc: 'Definición de endpoints de la API REST' },
  { folder: 'services/',    desc: 'Lógica de negocio del sistema' },
  { folder: 'test/',        desc: 'Pruebas unitarias e integraciones con Jest y Supertest' },
  { folder: 'utils/',       desc: 'Utilidades reutilizables (PDF, IDs, paginación)' },
  { folder: 'validators/',  desc: 'Reglas de validación con express-validator' },
]

const frontendFolders = [
  { folder: 'api/',         desc: 'Comunicación con el backend mediante Axios' },
  { folder: 'assets/',      desc: 'Recursos estáticos (tipografías, CSS global)' },
  { folder: 'components/',  desc: 'Componentes reutilizables de interfaz (common/, ui/)' },
  { folder: 'features/',    desc: 'Funcionalidades específicas agrupadas por módulo' },
  { folder: 'hooks/',       desc: 'Hooks personalizados reutilizables' },
  { folder: 'layout/',      desc: 'Estructura visual principal (Header, Sidebar)' },
  { folder: 'page/',        desc: 'Páginas principales del sistema (Dashboard, Clientes, etc.)' },
  { folder: 'routes/',      desc: 'Navegación y protección de rutas' },
  { folder: 'utils/',       desc: 'Funciones auxiliares (sesión, roles)' },
]

export default function Estructura() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Manual Técnico
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Estructura del Proyecto</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Organización del código backend y frontend, con descripción de cada módulo y su
          responsabilidad dentro del sistema.
        </p>
      </div>

      {/* Descripción General */}
      <section className="mb-12">
        <h2 className="text-2xl text-slate-800 mb-4">Descripción General</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          El proyecto Onal&amp;Nel implementa una arquitectura cliente-servidor dividida en dos
          aplicaciones principales:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-slate-600">
            <TbServer className="text-indigo-500 shrink-0" size={18} />
            <strong>Backend:</strong> API REST desarrollada con Node.js, Express y MySQL.
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-600">
            <TbBrowser className="text-indigo-500 shrink-0" size={18} />
            <strong>Frontend:</strong> Aplicación web desarrollada con React y Vite.
          </li>
        </ul>
        <p className="text-slate-600 text-sm leading-relaxed mt-3">
          La organización del proyecto está diseñada siguiendo una arquitectura modular y escalable,
          facilitando el mantenimiento, la reutilización de código y la separación de responsabilidades.
        </p>
      </section>

      {/* Backend */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbServer className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Backend</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3">Estructura General</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto">{`src/
├── app.js
├── config/
├── controllers/
├── jobs/
├── middleware/
├── models/
├── routes/
├── services/
├── test/
├── utils/
└── validators/`}</pre>
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-800 mb-4">Carpetas</h3>
        <div className="space-y-4">
          {backendFolders.map(({ folder, desc }) => (
            <details key={folder} className="bg-white rounded-xl border border-slate-200 shadow-sm group open:shadow-md transition-shadow">
              <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none select-none">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <TbFolderOpen className="text-indigo-600" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-800">{folder}</span>
                  <span className="text-xs text-slate-500 ml-3">{desc}</span>
                </div>
                <span className="text-slate-300 group-open:rotate-90 transition-transform text-xs">▶</span>
              </summary>
              <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                {folder === 'config/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Contiene la configuración principal del servidor, conexión a base de datos y servicios globales del sistema.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">config.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Validación y carga de variables de entorno</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">db.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Configuración y conexión a MySQL</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">server.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Inicialización del servidor HTTP y Socket.IO</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">socket.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Configuración de eventos y acceso a Socket.IO</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'controllers/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Gestionan las solicitudes HTTP recibidas por las rutas y coordinan la comunicación con los servicios.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mb-3">
                      {['Gestión de autenticación', 'CRUD de clientes', 'Gestión de ventas y pedidos', 'Facturación y pagos', 'Dashboard y estadísticas', 'Gestión de usuarios'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{f}</li>
                      ))}
                    </ul>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['auth.controller.js', 'Login, refresh token y perfil'],
                            ['ventas.controller.js', 'Gestión de ventas'],
                            ['pedidos.controller.js', 'Gestión de pedidos'],
                            ['pagos.controller.js', 'Registro y control de pagos'],
                            ['dashboard.controller.js', 'KPIs y estadísticas'],
                          ].map(([file, desc]) => (
                            <tr key={file} className="hover:bg-slate-50">
                              <td className="px-4 py-2.5 font-mono text-xs text-slate-800">{file}</td>
                              <td className="px-4 py-2.5 text-xs text-slate-500">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'jobs/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Contiene tareas automatizadas ejecutadas mediante <code>node-cron</code>.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">alertas.job.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Verificación automática de pagos vencidos y alertas</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'middleware/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Incluye middlewares personalizados para validación, autenticación y manejo global de errores.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['auth.middleware.js', 'Validación JWT y control de roles'],
                            ['err.middleware.js', 'Captura global de errores'],
                            ['validator.middleware.js', 'Manejo de validaciones con express-validator'],
                          ].map(([file, desc]) => (
                            <tr key={file} className="hover:bg-slate-50">
                              <td className="px-4 py-2.5 font-mono text-xs text-slate-800">{file}</td>
                              <td className="px-4 py-2.5 text-xs text-slate-500">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'models/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Encapsulan la lógica de acceso a datos y las consultas a la base de datos MySQL.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mb-3">
                      {['Consultas CRUD', 'Ejecución de procedimientos almacenados', 'Gestión de filtros y paginación', 'Control de inventario y pagos'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{f}</li>
                      ))}
                    </ul>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['cliente.models.js', 'CRUD de clientes'],
                            ['ventas.models.js', 'Gestión de ventas y pagos'],
                            ['pedido.models.js', 'Gestión de pedidos'],
                            ['dashboard.models.js', 'Consultas estadísticas'],
                            ['factura.models.js', 'Facturación y PDF'],
                          ].map(([file, desc]) => (
                            <tr key={file} className="hover:bg-slate-50">
                              <td className="px-4 py-2.5 font-mono text-xs text-slate-800">{file}</td>
                              <td className="px-4 py-2.5 text-xs text-slate-500">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'routes/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Definen los endpoints disponibles en la API REST y enlazan las rutas con sus respectivos controladores.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['cliente.route.js', 'Endpoints de clientes'],
                            ['ventas.route.js', 'Endpoints de ventas'],
                            ['pagos.route.js', 'Endpoints de pagos'],
                            ['dashboard.route.js', 'Endpoints del dashboard'],
                          ].map(([file, desc]) => (
                            <tr key={file} className="hover:bg-slate-50">
                              <td className="px-4 py-2.5 font-mono text-xs text-slate-800">{file}</td>
                              <td className="px-4 py-2.5 text-xs text-slate-500">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'services/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Implementan la lógica de negocio del sistema, separando las reglas funcionales de los controladores.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mb-3">
                      {['Procesamiento de ventas', 'Gestión de autenticación', 'Validaciones de negocio', 'Manejo de alertas', 'Estadísticas y reportes'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{f}</li>
                      ))}
                    </ul>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['auth.service.js', 'Lógica de autenticación'],
                            ['ventas.service.js', 'Procesamiento de ventas'],
                            ['pedidos.service.js', 'Gestión de pedidos'],
                            ['dashboard.service.js', 'Estadísticas del sistema'],
                          ].map(([file, desc]) => (
                            <tr key={file} className="hover:bg-slate-50">
                              <td className="px-4 py-2.5 font-mono text-xs text-slate-800">{file}</td>
                              <td className="px-4 py-2.5 text-xs text-slate-500">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'test/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Contiene pruebas unitarias e integraciones utilizando Jest y Supertest.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                      {['Validación de endpoints', 'Verificación de autenticación', 'Cobertura de módulos principales'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {folder === 'utils/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Incluye utilidades reutilizables utilizadas en distintos módulos del sistema.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['appError.js', 'Clase personalizada para errores'],
                            ['genId.js', 'Generación de identificadores'],
                            ['pdfGenerator.js', 'Generación de facturas PDF'],
                            ['paginacion.js', 'Helpers de paginación'],
                          ].map(([file, desc]) => (
                            <tr key={file} className="hover:bg-slate-50">
                              <td className="px-4 py-2.5 font-mono text-xs text-slate-800">{file}</td>
                              <td className="px-4 py-2.5 text-xs text-slate-500">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'validators/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Contiene reglas de validación implementadas con <code>express-validator</code>.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                      {['Validación de clientes', 'Validación de ventas', 'Validación de pedidos', 'Validación de usuarios'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Frontend */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbBrowser className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Frontend</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3">Estructura General</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto">{`src/
├── api/
├── assets/
├── components/
├── features/
├── hooks/
├── layout/
├── page/
├── routes/
├── utils/
├── App.jsx
└── main.jsx`}</pre>
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-800 mb-4">Carpetas</h3>
        <div className="space-y-4">
          {frontendFolders.map(({ folder, desc }) => (
            <details key={folder} className="bg-white rounded-xl border border-slate-200 shadow-sm group open:shadow-md transition-shadow">
              <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none select-none">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <TbFolderOpen className="text-indigo-600" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-800">{folder}</span>
                  <span className="text-xs text-slate-500 ml-3">{desc}</span>
                </div>
                <span className="text-slate-300 group-open:rotate-90 transition-transform text-xs">▶</span>
              </summary>
              <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                {folder === 'api/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Gestiona la comunicación con el backend mediante Axios.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo / Carpeta</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">axiosInstance.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Configuración global de Axios e interceptores</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">endpoints/</td><td className="px-4 py-2.5 text-xs text-slate-500">Funciones para consumo de endpoints por módulo</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'assets/' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Contiene recursos estáticos utilizados por la aplicación.</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                      {['Tipografías', 'Variables CSS', 'Estilos globales'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {folder === 'components/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Incluye componentes reutilizables y elementos de interfaz gráfica.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Carpeta</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">common/</td><td className="px-4 py-2.5 text-xs text-slate-500">Componentes reutilizables como botones e inputs</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">ui/feedback/</td><td className="px-4 py-2.5 text-xs text-slate-500">Alertas, loaders y mensajes</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">ui/Header/</td><td className="px-4 py-2.5 text-xs text-slate-500">Barra superior y navegación</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">ui/Sidebar/</td><td className="px-4 py-2.5 text-xs text-slate-500">Menú lateral dinámico según rol</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'features/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Agrupa funcionalidades específicas del sistema organizadas por módulos.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Carpeta</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">auth/</td><td className="px-4 py-2.5 text-xs text-slate-500">Login y autenticación</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">pedidos/</td><td className="px-4 py-2.5 text-xs text-slate-500">Gestión de pedidos</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'hooks/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Contiene hooks personalizados reutilizables.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">useDocumentTitle.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Actualiza dinámicamente el título de la página</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'layout/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Define la estructura visual principal de la aplicación.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Carpeta</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">MainLayout/</td><td className="px-4 py-2.5 text-xs text-slate-500">Layout principal con Header y Sidebar</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'page/' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Contiene las páginas principales del sistema.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                      {['Dashboard', 'Clientes', 'Ventas', 'Pedidos', 'Usuarios'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {folder === 'routes/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Gestiona la navegación y protección de rutas del sistema.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo / Componente</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">AppRouter</td><td className="px-4 py-2.5 text-xs text-slate-500">Configuración general de rutas</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">PrivateRoute</td><td className="px-4 py-2.5 text-xs text-slate-500">Protección de rutas autenticadas</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">AdminRoute</td><td className="px-4 py-2.5 text-xs text-slate-500">Restricción por rol administrador</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'utils/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Incluye funciones auxiliares reutilizables.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">session.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Gestión de sesión y validación de roles</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Arquitectura General */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbStack2 className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Arquitectura General</h2>
        </div>
        <p className="text-slate-500 text-sm mb-4">
          El proyecto implementa una arquitectura basada en separación de responsabilidades:
        </p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto">{`Frontend React
      ↓
API REST Express
      ↓
Controllers
      ↓
Services
      ↓
Models
      ↓
MySQL`}</pre>
          <p className="text-xs text-slate-500 mt-4">
            Esta estructura facilita la escalabilidad del sistema, el mantenimiento del código
            y la implementación de nuevas funcionalidades.
          </p>
        </div>
      </section>
    </div>
  )
}
