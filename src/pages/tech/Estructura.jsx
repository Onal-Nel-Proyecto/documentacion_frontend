import { TbFolderOpen, TbCode, TbServer, TbBrowser, TbStack2, TbApi } from 'react-icons/tb'

const backendFolders = [
  { folder: 'config/', desc: 'Configuración del servidor, conexión a BD y servicios globales' },
  { folder: 'controllers/', desc: 'Gestión de solicitudes HTTP y coordinación con servicios' },
  { folder: 'docs/', desc: 'Documentación Swagger/OpenAPI de los endpoints' },
  { folder: 'jobs/', desc: 'Tareas automatizadas ejecutadas con node-cron' },
  { folder: 'middleware/', desc: 'Middlewares para validación, autenticación y manejo de errores' },
  { folder: 'models/', desc: 'Lógica de acceso a datos y consultas MySQL' },
  { folder: 'routes/', desc: 'Definición de endpoints de la API REST' },
  { folder: 'services/', desc: 'Lógica de negocio del sistema' },
  { folder: 'test/', desc: 'Pruebas unitarias e integraciones con Jest y Supertest' },
  { folder: 'utils/', desc: 'Utilidades reutilizables (PDF, IDs, paginación)' },
  { folder: 'validators/', desc: 'Reglas de validación con express-validator' },
]

const frontendFolders = [
  { folder: 'api/', desc: 'Capa de comunicación con el backend mediante Axios' },
  { folder: 'assets/', desc: 'Recursos estáticos (fuentes, estilos globales)' },
  { folder: 'components/', desc: 'Componentes reutilizables (Cards, common, stats, Table, ui/)' },
  { folder: 'context/', desc: 'Contextos de React (autenticación, tema)' },
  { folder: 'data/', desc: 'Datos mock / estáticos para desarrollo' },
  { folder: 'features/', desc: 'Módulos feature-sliced (auth, Clientes, Inventario, pedidos, Ventas)' },
  { folder: 'hooks/', desc: 'Hooks personalizados reutilizables' },
  { folder: 'layout/', desc: 'Estructura visual principal (MainLayout)' },
  { folder: 'page/', desc: 'Páginas de nivel superior (categorías, Home, usuarios, etc.)' },
  { folder: 'routes/', desc: 'Navegación y protección de rutas' },
  { folder: 'services/', desc: 'Servicios compartidos (API de categorías, medidas, pagos, productos)' },
  { folder: 'utils/', desc: 'Funciones auxiliares (formateo, fechas, sesión)' },
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
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto">{`backend/
├── .github/
│   └── workflows/
│       └── test.yml
│
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── docs/
│   │   └── swagger/
│   ├── jobs/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── test/
│   ├── utils/
│   └── validators/
│
├── uploads/
│   └── pedidos/
│
├── .env
├── .gitignore
├── Dockerfile
├── jest.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md`}</pre>
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
                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-2.5 font-mono text-xs text-slate-800">swagger.js</td>
                            <td className="px-4 py-2.5 text-xs text-slate-500">
                              Configuración de Swagger/OpenAPI para la documentación interactiva de la API.
                            </td>
                          </tr>

                          <tr className="hover:bg-slate-50">
                            <td className="px-4 py-2.5 font-mono text-xs text-slate-800">upload.js</td>
                            <td className="px-4 py-2.5 text-xs text-slate-500">
                              Configuración de carga y almacenamiento de archivos mediante Multer.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'docs/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Documentación interactiva de la API generada con Swagger/OpenAPI mediante <code>swagger-jsdoc</code> y servida con <code>swagger-ui-express</code>.</p>
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
                            ['categorias.swagger.js', 'Documentación Swagger del módulo de categorías'],
                            ['medidas.swagger.js', 'Documentación Swagger del módulo de medidas'],
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
                {folder === 'controllers/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Gestionan las solicitudes HTTP recibidas por las rutas y coordinan la comunicación con los servicios.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mb-3">
                      {['Gestión de autenticación', 'CRUD de clientes', 'Gestión de ventas y pedidos', 'Facturación y pagos', 'Dashboard y estadísticas', 'Gestión de usuarios', 'Alertas y notificaciones', 'CRUD productos, materiales y medidas', 'Gestión de proveedores', 'Producción', 'Fotos de pedidos'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />{f}</li>
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
                            ['alertas.controller.js', 'CRUD de alertas y notificaciones'],
                            ['auth.controller.js', 'Login, refresh token y perfil'],
                            ['categorias.controller.js', 'CRUD de categorías de productos'],
                            ['cliente.controller.js', 'CRUD de clientes'],
                            ['dashboard.controller.js', 'KPIs y estadísticas del sistema'],
                            ['dt_pedido.controller.js', 'Detalles de pedidos'],
                            ['dt_venta.controller.js', 'Detalles de ventas'],
                            ['factura.controller.js', 'CRUD de facturas y generación de PDF'],
                            ['materiales.controller.js', 'CRUD de materiales e insumos'],
                            ['medidas.controller.js', 'CRUD de medidas'],
                            ['pagos.controller.js', 'Registro y control de pagos'],
                            ['pedido_foto.controller.js', 'Subida y eliminación de fotos de pedidos'],
                            ['pedidos.controller.js', 'Gestión de pedidos (entregar, cancelar)'],
                            ['produccion.controller.js', 'Gestión de producción asociada a detalles'],
                            ['productos.controller.js', 'CRUD de productos'],
                            ['proveedor.controller.js', 'CRUD de proveedores'],
                            ['user.controller.js', 'CRUD de usuarios (admin)'],
                            ['ventas.controller.js', 'Gestión de ventas y reportes'],
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
                            ['rateLimit.js', 'Limitador de peticiones dentro un rango de tiempo con express-rate-limit'],
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
                      {['Consultas CRUD', 'Ejecución de procedimientos almacenados', 'Gestión de filtros y paginación', 'Control de inventario y pagos', 'Alertas y abastecimiento', 'Producción', 'Fotos de pedidos'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />{f}</li>
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
                            ['abastecimiento.models.js', 'CRUD de abastecimiento e inventario'],
                            ['alertas.models.js', 'CRUD de alertas y notificaciones'],
                            ['categoria.models.js', 'CRUD de categorías'],
                            ['cliente.models.js', 'CRUD de clientes y teléfonos'],
                            ['dashboard.models.js', 'KPIs, estadísticas y dashboard'],
                            ['dt_pedido.models.js', 'Detalles de pedido'],
                            ['dt_venta.models.js', 'Detalles de venta'],
                            ['factura.models.js', 'CRUD de facturas'],
                            ['materiales.models.js', 'CRUD de materiales y resumen'],
                            ['medidas.models.js', 'CRUD de medidas'],
                            ['pagos.models.js', 'CRUD de pagos y resúmenes'],
                            ['pedido_foto.models.js', 'Fotos de pedidos'],
                            ['pedido.models.js', 'CRUD de pedidos, filtros y SPs'],
                            ['produccion.models.js', 'CRUD de producción'],
                            ['producto.models.js', 'CRUD de productos y resumen'],
                            ['proveedor.models.js', 'CRUD de proveedores'],
                            ['user.models.js', 'CRUD de usuarios'],
                            ['ventas.models.js', 'CRUD de ventas, SPs y reportes'],
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
                            ['alertas.route.js', 'Endpoints de alertas [GET /alertas]'],
                            ['categorias.route.js', 'CRUD de categorías [/categorias]'],
                            ['cliente.route.js', 'CRUD de clientes [/clientes]'],
                            ['dashboard.route.js', 'Endpoints del dashboard [/dashboard/*]'],
                            ['index.route.js', 'Agrupador central de todas las rutas'],
                            ['log.route.js', 'Autenticación [/auth/login, /auth/logout, etc.]'],
                            ['materiales.route.js', 'CRUD de materiales [/materiales]'],
                            ['medidas.route.js', 'CRUD de medidas [/medidas]'],
                            ['pagos.route.js', 'Endpoints de pagos [/pagos]'],
                            ['pedidos.route.js', 'Pedidos + detalles + producción [/pedidos]'],
                            ['productos.route.js', 'CRUD de productos [/productos]'],
                            ['proveedor.route.js', 'CRUD de proveedores [/proveedores]'],
                            ['user.route.js', 'CRUD de usuarios [/usuarios]'],
                            ['ventas.route.js', 'Ventas + reportes + factura [/ventas]'],
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
                      {['Procesamiento de ventas', 'Gestión de autenticación', 'Validaciones de negocio', 'Manejo de alertas', 'Estadísticas y reportes', 'CRUD clientes, productos, materiales', 'Facturación y PDF', 'Producción', 'Fotos de pedidos'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />{f}</li>
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
                            ['alertas.service.js', 'Verificación de alertas con Socket.IO'],
                            ['auth.service.js', 'Login JWT y refresh tokens'],
                            ['categorias.service.js', 'CRUD de categorías'],
                            ['clientes.service.js', 'CRUD de clientes y teléfonos'],
                            ['dashboard.service.js', 'KPIs y dashboard de pedidos'],
                            ['dt_pedido.service.js', 'CRUD de detalles de pedido'],
                            ['dt_venta.service.js', 'CRUD de detalles de venta'],
                            ['factura.service.js', 'CRUD de facturas y datos para PDF'],
                            ['materiales.service.js', 'CRUD de materiales y resumen'],
                            ['medidas.service.js', 'CRUD de medidas'],
                            ['pagos.service.js', 'Pagos, resúmenes y validaciones'],
                            ['pedido_foto.service.js', 'Gestión de fotos de pedidos'],
                            ['pedidos.service.js', 'CRUD de pedidos, filtros y entregas'],
                            ['produccion.service.js', 'Lógica de producción'],
                            ['productos.service.js', 'CRUD de productos y resumen'],
                            ['proveedores.service.js', 'CRUD de proveedores'],
                            ['user.services.js', 'CRUD de usuarios'],
                            ['ventas.service.js', 'Ventas, reportes y exportación'],
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
                    <p className="text-xs text-slate-500">Contiene pruebas unitarias e integraciones utilizando Jest y Supertest para validar los endpoints y la lógica de negocio.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mb-3">
                      {['Validación de endpoints CRUD', 'Verificación de autenticación y roles', 'Pruebas de integración con BD', 'Cobertura de todos los módulos'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />{f}</li>
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
                            ['alertas.test.js', 'Tests de alertas (~10)'],
                            ['auth.test.js', 'Tests de autenticación (~8)'],
                            ['categorias.test.js', 'Tests de categorías'],
                            ['clientes.test.js', 'Tests de clientes (~24)'],
                            ['factura.test.js', 'Tests de factura (~8)'],
                            ['materiales.test.js', 'Tests de materiales (~30)'],
                            ['medidas.test.js', 'Tests de medidas'],
                            ['pagos.test.js', 'Tests de pagos (~8)'],
                            ['pedidos.test.js', 'Tests de pedidos (~37)'],
                            ['productos.test.js', 'Tests de productos (~32)'],
                            ['proveedores.test.js', 'Tests de proveedores'],
                            ['user.test.js', 'Tests de usuarios (~8)'],
                            ['ventas.test.js', 'Tests de ventas (~65)'],
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
                            ['normalizacion_datos.js', 'Utilidades para la normalización y formateo de datos antes de su procesamiento'],
                            ['reportesExcel.js', 'Generador de reportes de venta en Excel'],
                            ['reportesPdf.js', 'Generador de reportes de venta en PDF'],
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
                    <p className="text-xs text-slate-500">Contiene reglas de validación implementadas con <code>express-validator</code>. El nombre de los archivos sigue la estructura <code>nombre.validator.js</code>.</p>
                    <p className="text-xs font-semibold text-slate-700">Funcionalidades:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 mb-3">
                      {['Validación de autenticación', 'Validación de categorías', 'Validación de clientes', 'Validación de detalle de pedido', 'Validación de factura', 'Validación de materiales', 'Validación de medidas', 'Validación de pagos', 'Validación de fotos de pedidos', 'Validación de pedidos', 'Validación de producción', 'Validación de productos', 'Validación de proveedores', 'Validación de usuarios', 'Validación de ventas'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />{f}</li>
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
                            ['auth.validator.js', 'Login: email y password'],
                            ['categorias.validator.js', 'Reglas de validación para categorías'],
                            ['cliente.validator.js', 'Cliente: nombres, documento, teléfono'],
                            ['dt_pedido.validator.js', 'Detalles de pedido'],
                            ['factura.validator.js', 'Validación de facturas'],
                            ['materiales.validator.js', 'Validación de materiales'],
                            ['medidas.validator.js', 'Validación de medidas'],
                            ['pagos.validator.js', 'Pagos: monto, método y referencia'],
                            ['pedido_foto.validator.js', 'Fotos de pedidos'],
                            ['pedido.validator.js', 'Pedido: fechas, cliente y servicios'],
                            ['produccion.validator.js', 'Producción: fecha y responsable'],
                            ['productos.validator.js', 'Validación de productos'],
                            ['proveedor.validator.js', 'Validación de proveedores'],
                            ['user.validator.js', 'Usuario: email, rol y contraseña'],
                            ['ventas.validator.js', 'Venta: descuento, detalles y pagos'],
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
            <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto">{`frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── scripts/
│   └── check-css-classes.cjs
│
├── uploads/
│   └── pedidos/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   │
│   ├── api/
│   │   ├── axiosInstance.js
│   │   ├── usuariosService.js
│   │   └── endpoints/
│   │       ├── abastecimientoEndpoints.js
│   │       ├── alertasEndpoints.js
│   │       ├── authEndpoints.js
│   │       ├── clientesEndpoints.js
│   │       ├── dashboardEndpoints.js
│   │       ├── pedidosEndpoints.js
│   │       └── ventasEndpoints.js
│   │
│   ├── assets/
│   │   ├── font/
│   │   └── styles/
│   │       ├── fonts.css
│   │       ├── global.css
│   │       ├── index.css
│   │       └── variables.css
│   │
│   ├── components/
│   │   ├── Cards/
│   │   ├── common/
│   │   ├── stats/
│   │   ├── Table/
│   │   └── ui/
│   │       ├── feedback/
│   │       ├── Header/
│   │       ├── NotificacionModal/
│   │       └── Sidebar/
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   └── productosMock.js
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── Clientes/
│   │   ├── Inventario/
│   │   ├── pedidos/
│   │   └── Ventas/
│   │
│   ├── hooks/
│   │   ├── useAlertas.js
│   │   ├── useAsyncAction.js
│   │   ├── useDocumentTitle.js
│   │   ├── useFocusTrap.js
│   │   └── useFormDraft.js
│   │
│   ├── layout/
│   │   └── MainLayout/
│   │
│   ├── page/
│   │   ├── categoria/
│   │   ├── Config/
│   │   ├── GestionPersonal/
│   │   ├── GestionUsuarios/
│   │   ├── Home/
│   │   ├── medidas/
│   │   └── NotFount/
│   │
│   ├── routes/
│   │   ├── adminRoute.jsx
│   │   ├── AppRouter.jsx
│   │   ├── privateRoute.jsx
│   │   └── publicRoute.jsx
│   │
│   ├── services/
│   │   ├── categoriaService.js
│   │   ├── medidasService.js
│   │   ├── pagosService.js
│   │   ├── productoService.js
│   │   └── socketService.js
│   │
│   └── utils/
│       ├── format.js
│       ├── serverDate.js
│       └── session.js
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── vercel.json
└── vite.config.js`}</pre>
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
                    <p className="text-xs text-slate-500">Gestiona la comunicación con el backend mediante Axios. Incluye la instancia global de Axios con interceptores y servicios específicos por módulo.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo / Carpeta</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['axiosInstance.js', 'Instancia Axios con baseURL, cookies y 401 interceptor'],
                            ['usuariosService.js', 'Servicio de usuarios (login/logout/perfil)'],
                            ['endpoints/', 'Constantes de URLs del backend organizadas por módulo'],
                          ].map(([file, desc]) => (
                            <tr key={file} className="hover:bg-slate-50">
                              <td className="px-4 py-2.5 font-mono text-xs text-slate-800">{file}</td>
                              <td className="px-4 py-2.5 text-xs text-slate-500">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-2">Endpoints disponibles:</p>
                    <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                      {['abastecimientoEndpoints.js', 'alertasEndpoints.js', 'authEndpoints.js', 'clientesEndpoints.js', 'dashboardEndpoints.js', 'pedidosEndpoints.js', 'ventasEndpoints.js'].map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {folder === 'assets/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Recursos estáticos de la aplicación: fuentes tipográficas y estilos CSS globales.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Carpeta / Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['font/', 'Fuentes tipográficas (Inter font family)'],
                            ['styles/fonts.css', 'Declaración de fuentes @font-face'],
                            ['styles/global.css', 'Estilos base / reset'],
                            ['styles/index.css', 'Entry point de estilos'],
                            ['styles/variables.css', 'Variables CSS (colores, sombras, radios, fuentes)'],
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
                {folder === 'components/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Componentes reutilizables de interfaz gráfica organizados por funcionalidad: desde elementos base (common/) hasta componentes complejos (Cards, stats, Table) y módulos de UI (Header, Sidebar, feedback).</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Carpeta</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['Cards/', 'Tarjetas de dashboard (InsightsCard, MaintenanceCard)'],
                            ['common/', 'Componentes base (Button, Card, Drawer, Input, EditCardModal)'],
                            ['stats/', 'Componentes de estadísticas (GrowthCard, StatCard)'],
                            ['Table/', 'Componentes de tabla (AvatarBadge, StatusBadge, TableFilters)'],
                            ['ui/feedback/', 'Alertas, ConnectionBanner, ErrorBoundary, InConstruction, LoadingOverlay, LoadingPages, SkeletonLoader'],
                            ['ui/Header/', 'Header principal, NavTabs, NotificationsDropdown, UserDropdown'],
                            ['ui/NotificacionModal/', 'Modal de notificaciones'],
                            ['ui/Sidebar/', 'Sidebar de navegación dinámico según rol'],
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
                {folder === 'context/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Contextos de React para estado global compartido entre componentes.</p>
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
                            ['AuthContext.jsx', 'Estado de autenticación (httpOnly cookies + /auth/perfil)'],
                            ['ThemeContext.jsx', 'Tema claro/oscuro'],
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
                {folder === 'data/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Datos mock y estáticos utilizados como fallback durante el desarrollo.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Archivo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">productosMock.js</td><td className="px-4 py-2.5 text-xs text-slate-500">Mock de productos (fallback mientras endpoint de búsqueda está incompleto)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'features/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Módulos organizados bajo arquitectura feature-sliced. Cada feature contiene sus propios componentes, hooks, páginas y servicios.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Módulo</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['auth/', 'Autenticación: login, sesión y perfil de usuario'],
                            ['Clientes/', 'Gestión de clientes: directorio, registro e historial'],
                            ['Inventario/', 'Inventario: productos, materiales y abastecimiento'],
                            ['pedidos/', 'Pedidos: formulario, entregas, producción y pagos (core del negocio)'],
                            ['Ventas/', 'Ventas: cobros, pagos, reportes mensuales y por periodo'],
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
                {folder === 'hooks/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Hooks personalizados compartidos entre módulos para lógica reutilizable.</p>
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
                            ['useAlertas.js', 'Gestión de alertas/notificaciones'],
                            ['useAsyncAction.js', 'Manejo genérico de acciones asíncronas'],
                            ['useDocumentTitle.js', 'Actualiza dinámicamente el título de la pestaña'],
                            ['useFocusTrap.js', 'Trampa de foco para modales/paneles'],
                            ['useFormDraft.js', 'Borrador de formularios con persistencia local'],
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
                {folder === 'layout/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Estructura visual principal de la aplicación: el shell que envuelve todas las páginas autenticadas.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Carpeta</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-2.5 font-mono text-xs text-slate-800">MainLayout/</td><td className="px-4 py-2.5 text-xs text-slate-500">Shell principal con Sidebar + Header + área de contenido</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {folder === 'page/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Páginas de nivel superior del sistema, organizadas por funcionalidad.</p>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Carpeta / Página</th>
                            <th className="text-left px-4 py-2 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            ['categoria/', 'CRUD de categorías de productos'],
                            ['Config/', 'Página de configuración del sistema'],
                            ['GestionPersonal/', 'Gestión de empleados/personal'],
                            ['GestionUsuarios/', 'Administración de usuarios del sistema'],
                            ['Home/', 'Dashboard principal / inicio'],
                            ['medidas/', 'CRUD de medidas (tallas)'],
                            ['NotFount/', 'Página 404'],
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
                    <p className="text-xs text-slate-500">Configuración de navegación y guards de protección de rutas según el rol del usuario.</p>
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
                            ['adminRoute.jsx', 'Guard para rutas de administrador'],
                            ['AppRouter.jsx', 'Router principal con lazy-loaded routes'],
                            ['privateRoute.jsx', 'Guard para rutas autenticadas'],
                            ['publicRoute.jsx', 'Guard para rutas públicas (login)'],
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
                    <p className="text-xs text-slate-500">Servicios compartidos que realizan llamadas API a módulos específicos del backend.</p>
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
                            ['categoriaService.js', 'API de categorías'],
                            ['medidasService.js', 'API de medidas/tallas'],
                            ['pagosService.js', 'API de pagos (compartido pedidos + ventas)'],
                            ['productoService.js', 'API de productos'],
                            ['socketService.js', 'Servicio Socket.IO (lazy-loaded)'],
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
                {folder === 'utils/' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Utilidades y helpers reutilizables en toda la aplicación.</p>
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
                            ['format.js', 'Formateo de moneda, fechas y strings'],
                            ['serverDate.js', 'Utilidades de fechas del servidor'],
                            ['session.js', 'Manejo de sesión y localStorage'],
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
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center justify-center">
          <img
            src="/arquitectura_ilustrada_v2.svg"
            alt="Arquitectura ilustrada del sistema"
            className="w-full h-auto max-w-3xl"
          />
        </div>
      </section>
    </div>
  )
}
