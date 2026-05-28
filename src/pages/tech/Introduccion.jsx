import { HiOutlineInformationCircle, HiOutlineCheckBadge, HiOutlineRocketLaunch } from 'react-icons/hi2'
import { TbTarget, TbBulb, TbAlertTriangle, TbBuildingStore, TbBarcode } from 'react-icons/tb'

const objetivosEspecificos = [
  'Registrar de manera eficiente los pedidos realizados por los clientes.',
  'Gestionar y almacenar la información de los clientes para futuras operaciones.',
  'Automatizar recordatorios relacionados con entregas y pagos pendientes.',
  'Mejorar el seguimiento y control de los pedidos en proceso.',
  'Generar facturas y reportes de ventas para apoyar la gestión administrativa.',
  'Optimizar la organización y productividad de los procesos internos.',
]

const alcance = [
  'Autenticación y gestión de usuarios.',
  'Gestión de clientes y proveedores.',
  'Registro y seguimiento de pedidos.',
  'Control de pagos y generación de facturas PDF.',
  'Gestión de inventario de materiales.',
  'Administración de entregas y recordatorios automáticos.',
  'Generación de reportes de ventas exportables.',
  'Gestión de pedidos con medidas y fotografías.',
]

export default function Introduccion() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          Manual Técnico
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Introducción</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Descripción del proyecto, la empresa, la problemática que resuelve y los objetivos del sistema Onal&amp;Nel.
        </p>
      </div>

      {/* Descripción del Proyecto */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbBulb className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Descripción del Proyecto</h2>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          Onal&amp;Nel es un sistema de gestión web desarrollado para optimizar y digitalizar los
          procesos administrativos y operativos de la empresa <strong>Confecciones ONA &amp; NEL</strong>.
          La plataforma permite gestionar clientes, pedidos, pagos, inventario, proveedores y
          reportes de ventas desde un entorno centralizado y accesible desde cualquier navegador.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          El sistema fue diseñado con el propósito de mejorar el control interno de la empresa,
          reducir errores derivados del manejo manual de información y facilitar el seguimiento de
          los procesos relacionados con la confección y entrega de prendas.
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          La aplicación implementa funcionalidades orientadas a pequeños y medianos talleres de
          confección, incluyendo recordatorios automáticos, generación de facturas PDF, control de
          entregas y administración de pedidos con medidas y fotografías.
        </p>
      </section>

      {/* Sobre la Empresa */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbBuildingStore className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Sobre la Empresa</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            <strong>Confecciones ONA &amp; NEL</strong> es una microempresa del sector textil ubicada
            en Santa Lucía, Atlántico, dedicada a la confección, arreglo y distribución de prendas
            de vestir. Entre sus principales productos se encuentran camisas, pantalones, vestidos y
            especialmente uniformes escolares, siendo esta última su principal especialidad.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Durante varios años la empresa ha trabajado con instituciones educativas y guarderías en
            la elaboración de uniformes escolares, además de ofrecer prendas personalizadas según los
            requerimientos de sus clientes. Adicionalmente, la empresa comercializa artículos
            complementarios como medias y calzado escolar.
          </p>
        </div>
      </section>

      {/* Problemática */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <TbAlertTriangle className="text-red-500" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Problemática</h2>
        </div>
        <div className="flex gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
          <TbAlertTriangle className="text-red-400 mt-0.5 shrink-0" size={20} />
          <div>
            <p className="text-sm text-red-900 leading-relaxed mb-2">
              A pesar de la experiencia y trayectoria de la empresa, gran parte de los procesos
              administrativos eran realizados de forma manual mediante registros en cuadernos físicos
              y anotaciones en papel. Esta situación ocasionaba dificultades para llevar el control
              de los pedidos, los pagos pendientes y las fechas de entrega.
            </p>
            <p className="text-sm text-red-900 leading-relaxed">
              La falta de un sistema centralizado aumentaba el riesgo de pérdida de información,
              retrasos en la producción y problemas en la organización de los pedidos, afectando
              tanto la productividad interna como la atención a los clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Justificación */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <HiOutlineCheckBadge className="text-emerald-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Justificación</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
          <p className="text-slate-600 text-sm leading-relaxed">
            El desarrollo del sistema <strong>Onal&amp;Nel</strong> surge como una solución tecnológica
            orientada a optimizar los procesos internos de la empresa y mejorar el control operativo
            de los pedidos y pagos.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            La implementación del software permite registrar y gestionar información de clientes,
            pedidos y pagos de manera organizada y segura, además de automatizar tareas relacionadas
            con recordatorios de entrega y control de pedidos pendientes.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Adicionalmente, el sistema incorpora funcionalidades para la generación de facturas y
            reportes de ventas, facilitando el control administrativo y contribuyendo a una mejor
            toma de decisiones dentro de la empresa.
          </p>
        </div>
      </section>

      {/* Objetivos */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbTarget className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Objetivos</h2>
        </div>

        {/* Objetivo General */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3">Objetivo General</h3>
          <div className="flex gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <HiOutlineRocketLaunch className="text-indigo-500 mt-0.5 shrink-0" size={20} />
            <p className="text-sm text-indigo-900 leading-relaxed">
              Implementar un sistema de gestión web para la empresa <strong>Confecciones ONA &amp; NEL</strong>
              que optimice el proceso de registro y seguimiento de pedidos, permita reutilizar la
              información de los clientes y facilite el control de pagos, entregas y facturación.
            </p>
          </div>
        </div>

        {/* Objetivos Específicos */}
        <div>
          <h3 className="text-base font-semibold text-slate-800 mb-3">Objetivos Específicos</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <ul className="space-y-2">
              {objetivosEspecificos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-indigo-600">{i + 1}</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Alcance */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <TbBarcode className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-2xl text-slate-800">Alcance</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            El sistema Onal&amp;Nel contempla el desarrollo e implementación de una plataforma web
            enfocada en la gestión integral de talleres de confección. Entre las funcionalidades
            cubiertas por el sistema se incluyen:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {alcance.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <HiOutlineCheckBadge className="text-green-500 shrink-0" size={16} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
