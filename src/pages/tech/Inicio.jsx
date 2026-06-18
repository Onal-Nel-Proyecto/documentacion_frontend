import { HiOutlineInformationCircle, HiOutlineCheckBadge, HiOutlineRocketLaunch } from 'react-icons/hi2'
import { TbCpu, TbPlayerPlay, TbDatabase, TbGitBranch, TbStack2, TbBook2 } from 'react-icons/tb'

const techs = [
  { name: 'React',         desc: 'Desarrollo del frontend' },
  { name: 'Node.js',       desc: 'Entorno de ejecución backend' },
  { name: 'Express.js',    desc: 'Framework para API REST' },
  { name: 'MySQL',         desc: 'Sistema gestor de base de datos' },
  { name: 'pnpm',          desc: 'Gestión de dependencias' },
  { name: 'Git & GitHub',  desc: 'Control de versiones' },
]

const features = [
  'Gestión de clientes',
  'Registro de ventas',
  'Administración de pedidos',
  'Control de pagos',
  'Gestión de inventario',
  'Documentación técnica del sistema',
  'API REST modular',
  'Arquitectura escalable',
]

const quickLinks = [
  { label: 'Introducción',         path: '/tecnico/introduccion',   icon: TbBook2 },
  { label: 'Arquitectura',         path: '/tecnico/estructura',     icon: TbStack2 },
  { label: 'Diagramas',            path: '/tecnico/diagramas',      icon: TbCpu },
  { label: 'Base de Datos',        path: '/tecnico/base-de-datos',  icon: TbDatabase },
  { label: 'API REST',             path: '/tecnico/api',            icon: TbPlayerPlay },
  { label: 'Instalación',          path: '/tecnico/instalacion',    icon: TbGitBranch },
]

export default function Inicio() {
  return (
    <div className="page-enter">
      {/* Title */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Manual Técnico
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Onal&amp;Nel</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Sistema de Gestión Empresarial para Confecciones ONA &amp; NEL
        </p>
      </div>

      {/* Description */}
      <section className="mb-10">
        <p className="text-slate-600 text-sm leading-relaxed">
          Onal&amp;Nel es una plataforma web desarrollada para optimizar y centralizar la
          gestión operativa de la empresa <strong>Confecciones ONA &amp; NEL</strong>. El sistema
          permite administrar procesos relacionados con ventas, pedidos, clientes, pagos,
          inventario y producción, facilitando el control interno y reduciendo los problemas
          derivados del manejo manual de la información.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mt-3">
          La aplicación implementa una arquitectura cliente-servidor basada en tecnologías
          modernas para garantizar escalabilidad, mantenimiento y eficiencia en los procesos
          empresariales.
        </p>
      </section>

      {/* Technologies */}
      <section className="mb-10">
        <h2 className="text-2xl text-slate-800 mb-4">Tecnologías Utilizadas</h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Tecnología</th>
                <th className="text-left px-5 py-3 text-xs font-semibold tracking-widest uppercase text-slate-400">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {techs.map(({ name, desc }) => (
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

      {/* Architecture Diagram */}
      <section className="mb-10">
        <h2 className="text-2xl text-slate-800 mb-4">Arquitectura General del Sistema</h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center justify-center">
          <img
            src="/arquitectura_software_capas_v2.svg"
            alt="Arquitectura del sistema por capas"
            className="w-full h-auto max-w-3xl"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-10">
        <h2 className="text-2xl text-slate-800 mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map(({ label, path, icon: Icon }) => (
            <a
              key={path}
              href={path}
              className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow hover:border-indigo-200 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                <Icon className="text-indigo-600" size={18} />
              </div>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-2xl text-slate-800 mb-4">Características Principales</h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <HiOutlineCheckBadge className="text-green-500 shrink-0" size={16} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Objective */}
      <section>
        <h2 className="text-2xl text-slate-800 mb-4">Objetivo del Sistema</h2>
        <div className="flex gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <HiOutlineRocketLaunch className="text-indigo-500 mt-0.5 shrink-0" size={20} />
          <p className="text-sm text-indigo-900 leading-relaxed">
            Brindar una solución tecnológica que permita mejorar la administración y el control
            de los procesos internos de la empresa mediante la automatización y centralización
            de la información.
          </p>
        </div>
      </section>
    </div>
  )
}
