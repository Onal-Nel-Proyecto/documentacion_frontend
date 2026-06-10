# Documentación de Endpoints — API REST

> Proyecto Express con rutas montadas bajo `/`.  
> Formato: **Ruta** | **Método** | **Descripción** | **Respuestas exitosas (2xx / 3xx)**

---

## Índice

- [Auth (`/auth`)](#auth-auth)
- [Pedidos (`/pedidos`)](#pedidos-pedidos)
- [Dashboard (`/dashboard`)](#dashboard-dashboard)
- [Clientes (`/clientes`)](#clientes-clientes)
- [Usuarios (`/usuarios`)](#usuarios-usuarios)
- [Productos (`/productos`)](#productos-productos)
- [Materiales (`/materiales`)](#materiales-materiales)
- [Pagos (`/pagos`)](#pagos-pagos)
- [Ventas (`/ventas`)](#ventas-ventas)
- [Alertas (`/alertas`)](#alertas-alertas)
- [Categorías (`/categorias`)](#categorías-categorias)
- [Medidas (`/medidas`)](#medidas-medidas)
- [Proveedores (`/proveedores`)](#proveedores-proveedores)
- [Extras](#extras)

---

## Auth (`/auth`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/auth/login` | **POST** | Iniciar sesión. Valida credenciales y devuelve tokens JWT en cookies (`token`, `refreshToken`) más datos del usuario. | **200** – `{ user_id, nombres, apellidos, rol }` + cookies `token` y `refreshToken` (httpOnly). |
| `/auth/logout` | **POST** | Cerrar sesión. Limpia las cookies de autenticación. | **200** – `{ msg: "Sesión cerrada" }` |
| `/auth/refresh` | **POST** | Refrescar token de acceso usando el `refreshToken` de las cookies. | **200** – `{ message: "Token de acceso actualizado" }` + nueva cookie `token`. |
| `/auth/perfil` | **GET** | Obtener perfil del usuario autenticado (requiere token válido). | **200** – `{ authenticated: true, user: { user_id, nombres, apellidos, rol } }` |

---

## Pedidos (`/pedidos`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/pedidos` | **GET** | Listar pedidos con paginación y filtros (`pag`, `estado`, `fecha_desde`, `fecha_hasta`, `cliente`, `tipo_pedido`, `estado_pago`, `fecha_entrega_desde`, `fecha_entrega_hasta`, `descripcion`). | **200** – `{ ... }` (resultado paginado del servicio) |
| `/pedidos` | **POST** | Crear un nuevo pedido. Requiere `body` con datos del pedido. | **201** – `{ status: true, msg: "Se registro un nuevo pedido con el ID #...", data: pedido_id }` |
| `/pedidos/entregas` | **GET** | Listar pedidos en estado completado (TERMINADO + ENTREGADO) con paginación y filtros (`pag`, `cliente`, `fecha_desde`, `fecha_hasta`, `estado`, `mes`). | **200** – `{ ... }` (resultado paginado) |
| `/pedidos/:id` | **GET** | Obtener un pedido por su ID. | **200** – `{ ... }` (datos del pedido) |
| `/pedidos/:id` | **PUT** | Actualizar datos de un pedido existente. | **200** – `{ status: true, msg: "Se actualizó con éxito el pedido" }` |
| `/pedidos/:id/cancelar` | **PATCH** | Cancelar un pedido. Requiere `body: { motivo }`. | **200** – `{ status: true, msg: "Se ha cancelado el pedido con el código #..." }` |
| `/pedidos/:id/entregar` | **PATCH** | Marcar pedido como ENTREGADO (cambia de TERMINADO → ENTREGADO). | **200** – `{ status: true, msg: "Pedido #... marcado como ENTREGADO" }` |
| `/pedidos/:id/detalles` | **POST** | Agregar un detalle (producto) a un pedido. | **201** – `{ status: true, msg: "Detalle de pedido registrado correctamente", data: { detalle_id } }` |
| `/pedidos/:id/detalles/:id_detalle` | **DELETE** | Eliminar un detalle de un pedido. | **200** – `{ status: true, msg: "Detalle de pedido eliminado exitosamente" }` |
| `/pedidos/:id/detalles/:id_detalle` | **PATCH** | Actualizar un detalle de pedido. | **200** – `{ status: true, msg: "Detalle de pedido actualizado exitosamente", data: {...} }` |
| `/pedidos/:id/detalles/:id_detalle/produccion` | **POST** | Registrar un detalle de pedido en producción. | **201** – `{ status: true, msg: "El detalle del pedido fue agregado a producción." }` |
| `/pedidos/:id/detalles/:id_detalle/produccion/:id_produccion` | **PATCH** | Actualizar el estado de producción de un detalle. | **201** – `{ status: true, msg: "Estado de producción actualizado correctamente." }` |
| `/pedidos/:id/detalles/:id_detalle/produccion/:id_produccion` | **DELETE** | Cancelar/eliminar un registro de producción. | **200** – `{ status: true, msg: "Producción cancelada correctamente." }` |
| `/pedidos/:id/fotos` | **POST** | Subir una foto a un pedido (multipart, campo `foto`, máx 5MB, hasta 15 fotos por pedido). | **201** – `{ status: true, msg: "...", data: {...} }` |
| `/pedidos/:id/fotos/:fotoId` | **DELETE** | Eliminar una foto de un pedido. | **200** – `{ status: true, msg: "..." }` |

---

## Dashboard (`/dashboard`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/dashboard/resumen` | **GET** | Obtener resumen general del dashboard (estadísticas). | **200** – `{ status: true, data: {...} }` |
| `/dashboard/pedidos` | **GET** | Obtener datos de pedidos para el dashboard. | **200** – `{ status: true, data: {...} }` |

---

## Clientes (`/clientes`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/clientes` | **GET** | Listar clientes con paginación y búsqueda (`pagina`, `limite`, `search`). | **200** – `{ ... }` (resultado paginado) |
| `/clientes` | **POST** | Crear un nuevo cliente. | **201** – `{ ... }` (cliente creado) |
| `/clientes/:id` | **GET** | Obtener un cliente por su ID. | **200** – `{ ... }` (datos del cliente) |
| `/clientes/:id` | **PUT** | Actualizar datos de un cliente. | **200** – `{ ... }` (resultado de la actualización) |
| `/clientes/:id/estado` | **PATCH** | Cambiar el estado (activo/inactivo) de un cliente. | **200** – `{ status: true, msg: "El cliente fue eliminado" }` |

---

## Usuarios (`/usuarios`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/usuarios` | **GET** | Listar todos los usuarios (solo admin). | **200** – `[ ... ]` (array de usuarios) |
| `/usuarios/:id` | **GET** | Obtener un usuario por ID (solo admin). | **200** – `{ ... }` (datos del usuario) |
| `/usuarios` | **POST** | Crear un nuevo usuario (solo admin). | **201** – `{ msg: "..." }` |
| `/usuarios/:id` | **PUT** | Actualizar datos de un usuario (solo admin). | **200** – `{ msg: "..." }` |
| `/usuarios/:id/estado` | **PATCH** | Cambiar estado del usuario: 1=activo, 2=bloqueado (solo admin). | **200** – `{ msg: "..." }` |
| `/usuarios/:id/password` | **PATCH** | Actualizar contraseña del usuario (admin o el propio usuario). | **200** – `{ msg: "..." }` |

---

## Productos (`/productos`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/productos` | **GET** | Listar productos con paginación y filtros (`pagina`, `limite`, `nombre`, `estado`, `categoria`, `tipoProducto`). | **200** – `{ status: true, data: [...], meta: { ... } }` |
| `/productos/:id` | **GET** | Obtener un producto por ID. | **200** – `{ status: true, data: {...} }` |
| `/productos` | **POST** | Crear un nuevo producto (solo admin). | **201** – `{ status: true, msg: "...", id: ... }` |
| `/productos/:id` | **PUT** | Actualizar un producto (solo admin). | **200** – `{ status: true, msg: "..." }` |
| `/productos/:id/estado` | **PATCH** | Cambiar el estado de un producto (solo admin). | **200** – `{ status: true, msg: "..." }` |

---

## Materiales (`/materiales`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/materiales` | **GET** | Listar materiales con paginación y filtros (`pagina`, `limite`, `nombre`, `estado`, `tipoMaterial`). | **200** – `{ status: true, data: [...], meta: {...} }` |
| `/materiales/:id` | **GET** | Obtener un material por ID. | **200** – `{ status: true, data: {...} }` |
| `/materiales` | **POST** | Crear un nuevo material (solo admin). | **201** – `{ status: true, msg: "...", id: ... }` |
| `/materiales/:id` | **PUT** | Actualizar un material (solo admin). | **200** – `{ status: true, msg: "..." }` |
| `/materiales/:id/estado` | **PATCH** | Cambiar el estado de un material (solo admin). | **200** – `{ status: true, msg: "..." }` |

---

## Pagos (`/pagos`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/pagos` | **GET** | Listar pagos con filtros (`pedido_id`, `venta_id`, `pagina`, `limite`). | **200** – `{ ... }` (resultado paginado) |
| `/pagos` | **POST** | Registrar un nuevo pago asociado a un pedido o venta. | **201** – `{ ... }` (pago creado) |
| `/pagos/:id/rechazar` | **PATCH** | Rechazar un pago por su ID. | **200** – `{ ... }` (resultado) |

---

## Ventas (`/ventas`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/ventas` | **GET** | Listar ventas con paginación y filtros (`pagina`, `limite`, `fecha_registro`, `fecha_limite_pago`, `cliente`). | **200** – `{ ... }` (resultado paginado) |
| `/ventas` | **POST** | Registrar una nueva venta. | **201** – `{ ... }` (venta creada) |
| `/ventas/:id` | **GET** | Obtener una venta por ID. | **200** – `{ ... }` (datos de la venta) |
| `/ventas/:id` | **PATCH** | Actualizar venta (descuento, fecha límite de pago). | **200** – `{ ... }` (resultado) |
| `/ventas/:id` | **DELETE** | Anular una venta. | **200** – `{ ... }` (resultado) |
| `/ventas/:id/detalles` | **POST** | Agregar un detalle (producto) a una venta. | **201** – `{ ... }` (detalle creado) |
| `/ventas/:id/detalles/:id_detalle` | **DELETE** | Eliminar un detalle de venta. | **200** – `{ ... }` (resultado) |
| `/ventas/reportes/mensual` | **GET** | Obtener reporte mensual de ventas (`mes`, `anio`). | **200** – `{ status: true, data: {...} }` |
| `/ventas/reportes/periodo` | **GET** | Obtener reporte de ventas por periodo (`fechaInicio`, `fechaFin`). | **200** – `{ status: true, data: {...} }` |
| `/ventas/reportes/mensual/pdf` | **GET** | Exportar reporte mensual de ventas en PDF (`mes`, `anio`). | **200** – `application/pdf` (descarga) |
| `/ventas/reportes/periodo/pdf` | **GET** | Exportar reporte por periodo en PDF (`fechaInicio`, `fechaFin`). | **200** – `application/pdf` (descarga) |
| `/ventas/reportes/mensual/excel` | **GET** | Exportar reporte mensual de ventas en Excel (`mes`, `anio`). | **200** – `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (descarga `.xlsx`) |
| `/ventas/reportes/periodo/excel` | **GET** | Exportar reporte por periodo en Excel (`fechaInicio`, `fechaFin`). | **200** – `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (descarga `.xlsx`) |
| `/ventas/:id/factura` | **GET** | Obtener datos de la factura de una venta. | **200** – `{ ... }` (datos de factura) |
| `/ventas/:id/factura` | **POST** | Crear factura para una venta. | **201** – `{ ... }` (factura creada) |
| `/ventas/:id/factura/:id_factura/anular` | **PATCH** | Anular una factura. | **200** – `{ ... }` (resultado) |
| `/ventas/:id/factura/pdf` | **GET** | Generar y descargar PDF de la factura de una venta. | **200** – `application/pdf` (visualización en línea) |

---

## Alertas (`/alertas`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/alertas` | **GET** | Listar alertas con paginación y filtros (`pagina`, `limite`, `estado`, `tipo`, `categoria`). | **200** – `{ ... }` (resultado paginado) |

---

## Categorías (`/categorias`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/categorias` | **GET** | Listar todas las categorías con filtros (`nombre`, `estado`). | **200** – `{ status: true, data: [...] }` |
| `/categorias/:id` | **GET** | Obtener una categoría por ID. | **200** – `{ status: true, data: {...} }` |
| `/categorias` | **POST** | Crear una nueva categoría (solo admin). | **201** – `{ status: true, msg: "...", id: ... }` |
| `/categorias/:id` | **PUT** | Actualizar una categoría (solo admin). | **200** – `{ status: true, msg: "..." }` |
| `/categorias/:id/estado` | **PATCH** | Cambiar el estado de una categoría (solo admin). | **200** – `{ status: true, msg: "..." }` |

---

## Medidas (`/medidas`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/medidas` | **GET** | Listar todas las medidas con filtros (`nombre`, `estado`). | **200** – `{ status: true, data: [...] }` |
| `/medidas/:id` | **GET** | Obtener una medida por ID. | **200** – `{ status: true, data: {...} }` |
| `/medidas` | **POST** | Crear una nueva medida (solo admin). | **201** – `{ status: true, msg: "...", id: ... }` |
| `/medidas/:id` | **PUT** | Actualizar una medida (solo admin). | **200** – `{ status: true, msg: "..." }` |
| `/medidas/:id/estado` | **PATCH** | Cambiar el estado de una medida (solo admin). | **200** – `{ status: true, msg: "..." }` |

---

## Proveedores (`/proveedores`)

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/proveedores` | **GET** | Listar proveedores con paginación y filtros (`pagina`, `limite`, `prov_nombre`, `prov_tipo_suministro`). | **200** – `{ ... }` (resultado paginado) |
| `/proveedores` | **POST** | Crear un nuevo proveedor. | **201** – `{ ... }` (proveedor creado) |
| `/proveedores/:id` | **GET** | Obtener un proveedor por ID. | **200** – `{ ... }` (datos del proveedor) |
| `/proveedores/:id` | **PUT** | Actualizar datos de un proveedor. | **200** – `{ ... }` (resultado) |
| `/proveedores/:id` | **DELETE** | Deshabilitar (eliminación lógica) un proveedor. | **200** – `{ ... }` (resultado) |

---

## Extras

| Ruta | Método | Descripción | Respuesta exitosa |
|------|--------|-------------|-------------------|
| `/prueba` | **GET** | Ruta de prueba protegida (solo admin) — verifica que la autenticación funciona. | **200** – `"pagina protegida"` (texto plano) |
| `/api-docs` | **GET** | Documentación interactiva Swagger/OpenAPI de la API. | **200** – Página HTML con Swagger UI |

---

> **Nota:** Todos los endpoints (excepto `/auth/login`, `/auth/logout`, `/auth/refresh` y `/api-docs`) requieren autenticación mediante middleware `authValidator`. Los endpoints marcados como *(solo admin)* también requieren el rol de administrador (`isAdmin`).
