import { useState, useMemo } from 'react'
import { TbSearch, TbAlertTriangle, TbShieldOff, TbLock, TbUserOff, TbPhoto, TbFileUnknown, TbMoneybag, TbBuildingStore, TbPackage, TbShoppingCart, TbReportSearch, TbFileInvoice, TbAlertCircle } from 'react-icons/tb'

/* ──────────────────────────────────────────────
   Datos de errores (extraídos de errores-api.md)
   ────────────────────────────────────────────── */

const MODULE_ICONS = {
  globales: TbAlertCircle,
  autenticacion: TbShieldOff,
  usuarios: TbUserOff,
  clientes: TbUserOff,
  pedidos: TbPackage,
  productos: TbBuildingStore,
  ventas: TbShoppingCart,
  pagos: TbMoneybag,
  factura: TbFileInvoice,
  archivos: TbPhoto,
}

const errorsData = [
  {
    module: 'Errores globales',
    id: 'globales',
    errors: [
      {
        title: 'Error 400 — Solicitud incorrecta',
        desc: 'Los datos enviados en el formulario no son válidos.',
        causa: 'Campos vacíos, formatos incorrectos, valores fuera de rango.',
        solucion: 'Revise que todos los campos del formulario estén correctamente diligenciados antes de guardar.',
      },
      {
        title: 'Error 401 — No autorizado',
        desc: 'La sesión ha expirado o no has iniciado sesión.',
        causa: 'Token de acceso no enviado, inválido o expirado.',
        solucion: 'Inicie sesión nuevamente en el sistema. La aplicación renovará el acceso automáticamente si es posible.',
      },
      {
        title: 'Error 403 — Acceso denegado',
        desc: 'No tienes permisos suficientes para realizar esta acción.',
        causa: 'Tu rol de usuario no tiene los privilegios necesarios (solo administradores).',
        solucion: 'Contacte al administrador del sistema si necesita acceso a esta función.',
      },
      {
        title: 'Error 404 — No encontrado',
        desc: 'El recurso solicitado (cliente, pedido, venta, etc.) no existe o fue eliminado.',
        causa: 'El ID o los datos de búsqueda son incorrectos.',
        solucion: 'Verifique que el ID o los datos ingresados sean correctos. Consulte la lista correspondiente.',
      },
      {
        title: 'Error 500 — Error interno del servidor',
        desc: 'Ocurrió un error inesperado en el servidor.',
        causa: 'Problema temporal de conexión con la base de datos o error no controlado.',
        solucion: 'Intente nuevamente pasados unos minutos. Si el error persiste, contacte al administrador del sistema.',
      },
    ],
  },
  {
    module: 'Autenticación',
    id: 'autenticacion',
    errors: [
      {
        title: 'Usuario o contraseña incorrectos',
        desc: 'El correo o la contraseña ingresados no corresponden a ningún usuario registrado.',
        causa: 'Credenciales incorrectas al iniciar sesión.',
        solucion: 'Verifique que el correo y la contraseña estén bien escritos. Si olvidó su contraseña, contacte al administrador.',
      },
      {
        title: 'Usuario bloqueado',
        desc: 'Tu cuenta se encuentra bloqueada y no puedes acceder al sistema.',
        causa: 'La cuenta fue bloqueada por un administrador o por múltiples intentos fallidos.',
        solucion: 'Contacte al administrador para solicitar la revisión y el desbloqueo de su cuenta.',
      },
      {
        title: 'Sesión expirada',
        desc: 'El token de acceso ha expirado después de un periodo de inactividad.',
        causa: 'La sesión se venció por tiempo de inactividad.',
        solucion: 'La aplicación intentará renovar la sesión automáticamente. Si no funciona, cierre sesión y vuelva a iniciar.',
      },
    ],
  },
  {
    module: 'Clientes',
    id: 'clientes',
    errors: [
      {
        title: 'Cliente no encontrado',
        desc: 'No se encontró un cliente con el ID o datos especificados.',
        causa: 'El ID del cliente es incorrecto o el cliente fue desactivado.',
        solucion: 'Verifique el ID del cliente. Consulte la lista de clientes activos para obtener el ID correcto.',
      },
      {
        title: 'Cliente bloqueado o inactivo',
        desc: 'El cliente se encuentra deshabilitado y no se pueden realizar operaciones con él.',
        causa: 'El cliente fue desactivado por el administrador.',
        solucion: 'Reactive al cliente desde la opción de estado antes de continuar, o contacte al administrador.',
      },
      {
        title: 'Error al crear cliente',
        desc: 'Faltan datos obligatorios o el formato es inválido.',
        causa: 'Nombre, documento de identidad o teléfono con formato incorrecto.',
        solucion: 'Complete todos los campos obligatorios. Verifique que el documento no esté duplicado.',
      },
    ],
  },
  {
    module: 'Pedidos',
    id: 'pedidos',
    errors: [
      {
        title: 'Pedido no encontrado',
        desc: 'No se encontró un pedido con el ID especificado.',
        causa: 'El ID del pedido es incorrecto o el pedido fue eliminado.',
        solucion: 'Verifique el ID del pedido en la lista de pedidos.',
      },
      {
        title: 'El pedido debe estar en estado TERMINADO para entregarlo',
        desc: 'No se puede marcar un pedido como ENTREGADO si no ha finalizado su producción.',
        causa: 'El pedido aún está en proceso, pendiente o cancelado.',
        solucion: 'Complete la producción del pedido para cambiar su estado a TERMINADO, luego proceda a la entrega.',
      },
      {
        title: 'No se pueden registrar pagos en un pedido cancelado',
        desc: 'No se permiten pagos para pedidos que están cancelados.',
        causa: 'El pedido fue cancelado y ya no admite transacciones.',
        solucion: 'Verifique el estado del pedido. Si está cancelado, no es posible agregar pagos.',
      },
      {
        title: 'Error al subir foto',
        desc: 'La imagen no pudo ser subida al pedido.',
        causa: 'La imagen supera los 5 MB, el formato no es válido, o el pedido ya tiene 15 fotos.',
        solucion: 'Use una imagen en formato JPG, PNG o WEBP de menos de 5 MB. Elimine fotos existentes si llegó al límite.',
      },
    ],
  },
  {
    module: 'Ventas',
    id: 'ventas',
    errors: [
      {
        title: 'Venta no encontrada',
        desc: 'No se encontró una venta con el ID especificado.',
        causa: 'El ID de la venta es incorrecto o la venta fue anulada.',
        solucion: 'Verifique el ID de la venta en el listado de ventas.',
      },
      {
        title: 'El pago supera el saldo pendiente',
        desc: 'El monto del pago registrado supera el saldo pendiente de la venta.',
        causa: 'Se intenta pagar más del total adeudado.',
        solucion: 'Verifique el saldo pendiente antes de registrar el pago. Ajuste el monto al valor correcto.',
      },
    ],
  },
  {
    module: 'Pagos',
    id: 'pagos',
    errors: [
      {
        title: 'Error al registrar pago',
        desc: 'El monto del pago excede el saldo pendiente o los datos son inválidos.',
        causa: 'Monto incorrecto, método de pago inválido, o falta asociar a un pedido/venta.',
        solucion: 'Verifique el monto pendiente y seleccione un método de pago válido.',
      },
      {
        title: 'Pago no encontrado o ya fue rechazado',
        desc: 'No se encontró el pago o ya se encuentra en estado rechazado.',
        causa: 'ID de pago incorrecto o el pago ya fue procesado.',
        solucion: 'Verifique el ID del pago. Solo se pueden rechazar pagos pendientes.',
      },
    ],
  },
  {
    module: 'Factura',
    id: 'factura',
    errors: [
      {
        title: 'Factura no encontrada',
        desc: 'No se encontró una factura con el ID especificado.',
        causa: 'La factura no ha sido generada todavía o fue anulada.',
        solucion: 'Genere la factura primero desde la opción de facturación de la venta.',
      },
    ],
  },
  {
    module: 'Productos',
    id: 'productos',
    errors: [
      {
        title: 'Producto no encontrado',
        desc: 'No se encontró un producto con el ID especificado.',
        causa: 'ID incorrecto o producto desactivado.',
        solucion: 'Verifique el ID del producto en el listado de productos.',
      },
      {
        title: 'Categoría no existe',
        desc: 'La categoría seleccionada para el producto no existe.',
        causa: 'ID de categoría incorrecto o la categoría fue eliminada.',
        solucion: 'Seleccione una categoría válida de la lista de categorías disponibles.',
      },
    ],
  },
  {
    module: 'Archivos e imágenes',
    id: 'archivos',
    errors: [
      {
        title: 'La imagen supera el tamaño máximo',
        desc: 'La imagen que intenta subir supera los 5 MB permitidos.',
        causa: 'El archivo es demasiado grande.',
        solucion: 'Reduzca el tamaño de la imagen antes de subirla.',
      },
      {
        title: 'Formato de imagen no válido',
        desc: 'Solo se permiten archivos en formato JPG, PNG o WEBP.',
        causa: 'El archivo seleccionado no es una imagen válida.',
        solucion: 'Convierta la imagen a formato JPG, PNG o WEBP.',
      },
      {
        title: 'Límite de fotos alcanzado',
        desc: 'El pedido ya tiene el máximo de 15 fotos permitidas.',
        causa: 'Se alcanzó el límite de fotos por pedido.',
        solucion: 'Elimine algunas fotos existentes antes de agregar nuevas.',
      },
    ],
  },
]

/* ──────────────────────────────────────────────
   Componente de tarjeta de error
   ────────────────────────────────────────────── */

function ErrorCard({ error }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-0.5 shrink-0">
          <TbAlertTriangle className="text-amber-500" size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800">{error.title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{error.desc}</p>
        </div>
      </div>
      <div className="ml-9 space-y-2">
        <div className="flex gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase shrink-0 w-14">Causa:</span>
          <span className="text-xs text-slate-600">{error.causa}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase shrink-0 w-14">Solución:</span>
          <span className="text-xs text-slate-700">{error.solucion}</span>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Página de Solución de Problemas
   ────────────────────────────────────────────── */

export default function SolucionProblemas() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState({})

  const toggleModule = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredData = useMemo(() => {
    if (!search.trim()) return errorsData

    const q = search.toLowerCase()
    return errorsData
      .map((mod) => ({
        ...mod,
        errors: mod.errors.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.desc.toLowerCase().includes(q) ||
            e.causa.toLowerCase().includes(q) ||
            e.solucion.toLowerCase().includes(q),
        ),
      }))
      .filter((mod) => mod.errors.length > 0)
  }, [search])

  return (
    <div className="page-enter">
      {/* Page header */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Manual de Usuario
        </span>
        <h1 className="text-4xl text-slate-900 mt-3 mb-2">Solución de problemas</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
          Guía de errores comunes del sistema. Use el buscador para encontrar rápidamente el error que necesita resolver.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8 max-w-lg">
        <TbSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <input
          type="text"
          placeholder="Buscar error por nombre, causa o solución..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-shadow"
        />
      </div>

      {/* Results count */}
      {search && (
        <p className="text-xs text-slate-400 mb-4">
          {filteredData.reduce((acc, m) => acc + m.errors.length, 0)} resultado{filteredData.reduce((acc, m) => acc + m.errors.length, 0) !== 1 ? 's' : ''} para "<span className="font-medium text-slate-500">{search}</span>"
        </p>
      )}

      {/* No results */}
      {search && filteredData.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
          <TbSearch className="text-slate-300 mx-auto mb-3" size={36} />
          <p className="text-sm text-slate-500">
            No se encontraron errores que coincidan con "<span className="font-medium text-slate-600">{search}</span>"
          </p>
          <button
            onClick={() => setSearch('')}
            className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* Modules */}
      {filteredData.map((modulo) => {
        const Icon = MODULE_ICONS[modulo.id] || TbAlertCircle
        const isOpen = expanded[modulo.id] ?? (modulo.id === 'globales') // globales abierto por defecto

        return (
          <section key={modulo.id} className="mb-6">
            <button
              onClick={() => toggleModule(modulo.id)}
              className="w-full flex items-center gap-3 px-5 py-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Icon className="text-blue-600" size={18} />
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm font-semibold text-slate-800">{modulo.module}</span>
                <span className="text-xs text-slate-400 ml-2">{modulo.errors.length} error{modulo.errors.length !== 1 ? 'es' : ''}</span>
              </div>
              <span className={`text-slate-300 transition-transform text-xs ${isOpen ? 'rotate-90' : ''}`}>▶</span>
            </button>

            {isOpen && (
              <div className="mt-3 space-y-3 ml-2">
                {modulo.errors.map((err, i) => (
                  <ErrorCard key={i} error={err} />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
