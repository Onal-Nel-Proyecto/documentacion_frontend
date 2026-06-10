# DICCIONARIO DE LA BASE DE DATOS

**ONAL & NEL**
Versión Actualizada - 09/06/2026

---

## Entidad: `usuario`

**Fecha de creación:** 21/04/2025

**Descripción:** Entidad que contendrá los datos personales de los empleados y los encargados de manejar el sistema.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| usuId | 15 | VARCHAR | Identificador del usuario (CC, CE) |
| usuNom | 255 | VARCHAR | Nombres del usuario |
| usuApe | 255 | VARCHAR | Apellidos del usuario |
| usuTel | 12 | VARCHAR | Número telefónico del usuario |
| usuCor | 254 | VARCHAR | Correo electrónico del usuario |
| usuPassHash | 255 | VARCHAR | Contraseña hasheada de acceso del usuario encriptada |
| usuRol | 11 | INT | Rol del usuario (FK a tabla rol) |
| usuSupFk | 15 | VARCHAR | Identificador FK del supervisor del usuario (es el usuId del encargado del usuario) |
| usuEst | 11 | INT | Estados del usuario (1 = activo, 2 = bloqueado/eliminado) |
| usuFecReg | — | TIMESTAMP | Fecha de registro del usuario |

**Llave primaria:** `usuId`

**Relaciones:** Usuario con usuario (auto-referencia) · Usuario con rol

---

## Entidad: `rol`

**Fecha de creación:** 18/03/2026

**Descripción:** Entidad que almacena los roles disponibles del sistema para los usuarios.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| rolId | 11 | INT | Identificación del rol |
| rolNom | 50 | VARCHAR | Nombre del rol |
| rolDesc | 150 | VARCHAR | Descripción del rol |

**Llave primaria:** `rolId`

---

## Entidad: `cliente`

**Fecha de creación:** 21/04/2025

**Descripción:** Entidad que contendrá los datos personales de los clientes.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| cliId | 15 | VARCHAR | Identificación del cliente (CC, TI, CE) o un número aleatorio si no se tiene la identificación del cliente |
| cliNom | 255 | VARCHAR | Nombres del cliente (primer y segundo nombre) |
| cliApe | 255 | VARCHAR | Apellidos del cliente (primer y segundo apellido) |
| cliTel | 15 | VARCHAR | Número telefónico del cliente |
| cliTel2 | 15 | VARCHAR | Número de teléfono 2 (opcional) |
| cliCorr | 254 | VARCHAR | Correo del cliente (opcional) |
| cliDir | 50 | VARCHAR | Dirección del cliente (opcional) |
| usuIdFk | 15 | VARCHAR | Identificación del usuario que registró el cliente |
| cliEst | 11 | INT | Estados del cliente (1 = activo, 2 = eliminado) |
| cliFecReg | — | TIMESTAMP | Fecha de registro del cliente |

**Llave primaria:** `cliId`

**Relaciones:** Cliente con usuario

---

## Entidad: `proveedor`

**Fecha de creación:** 18/03/2026

**Descripción:** Entidad que almacena los datos de los proveedores de productos y materiales.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| provId | 15 | VARCHAR | Identificador del proveedor |
| provNom | 50 | VARCHAR | Nombre del proveedor |
| provTel | 20 | VARCHAR | Número de teléfono del proveedor (opcional) |
| provCorr | 254 | VARCHAR | Correo del proveedor (opcional) |
| provDir | 70 | VARCHAR | Dirección del proveedor (opcional) |
| proTipMatSum | 100 | VARCHAR | Tipo de material/producto que suministra |

**Llave primaria:** `provId`

---

## Entidad: `categoria`

**Fecha de creación:** 18/03/2026

**Descripción:** Entidad que almacena las categorías de los productos (tela, ropa, media, etc.).

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| catId | 11 | INT AUTO_INCREMENT | Identificador de la categoría |
| catNom | 50 | VARCHAR | Nombre de la categoría |
| catDesc | 120 | VARCHAR | Descripción de la categoría (opcional) |
| catEst | — | ENUM | Estado de la categoría |

**Llave primaria:** `catId`

---

## Entidad: `materiales`

**Fecha de creación:** 18/03/2026

**Descripción:** Entidad que almacena los materiales utilizados en la producción (telas, hilos, botones, etc.).

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| matId | 11 | INT AUTO_INCREMENT | Identificador del material |
| matNom | 50 | VARCHAR | Nombre del material |
| matEst | — | ENUM | Estado del material |
| matDesc | 120 | VARCHAR | Descripción del material (opcional) |
| matUmbMin | 11 | INT | Umbral mínimo del material (cantidad mínima de alerta) |
| matCantDisp | 11 | INT | Cantidad disponible del material |
| matUniMed | 30 | VARCHAR | Unidad de medida del material (metros, kg, unidades, etc.) |
| matProv | 15 | VARCHAR | Identificador FK del proveedor del material (opcional) |
| matTipMat | — | ENUM | Tipo de material |

**Llave primaria:** `matId`

**Relaciones:** Materiales con tipo_material · Materiales con proveedor

---

## Entidad: `productos`

**Fecha de creación:** 21/04/2025

**Descripción:** Esta entidad almacenará los datos de todos los productos de la empresa (ropa, tela, hilos, etc.).

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| proId | 10 | VARCHAR | Código de identificación del producto/artículo |
| proNom | 70 | VARCHAR | Nombre del producto |
| proStock | 11 | INT | Cantidad disponible del producto (inventario) |
| proPreUni | 10,2 | DECIMAL | Precio unitario del producto |
| proDesc | 255 | VARCHAR | Descripción del producto (opcional) |
| proGen | — | ENUM | Género del producto (M = hombre, F = mujer, U = unisex) |
| ProCatFk | 11 | INT | Categoría del producto FK (tela, ropa, media, etc.) |
| proTipPre | — | ENUM | Tipo de prenda (camisa, pantalón, uniforme, etc.) |
| proTipPro | — | ENUM | Tipo de producto (0 = personalizado, 1 = inventario) |
| proUmbMin | 11 | INT | Umbral mínimo del producto (solo para productos de inventario, opcional) |
| proTallFk | 5 | VARCHAR | Talla del producto (opcional) |
| proEst | 11 | INT | Estado del producto (1 = activo, 2 = agotado, 3 = inactivo) |

**Llave primaria:** `proId`

**Relaciones:** Productos con categoría · Productos con proveedor

---

## Entidad: `medidas`

**Fecha de creación:** 18/03/2026

**Descripción:** Entidad que almacena el catálogo de medidas que pueden tomarse a un cliente (pecho, cintura, cadera, etc.).

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| medId | 11 | INT AUTO_INCREMENT | Identificación de la medida |
| medNom | 50 | VARCHAR | Nombre de la medida |
| medDesc | 120 | VARCHAR | Descripción de la medida (opcional) |
| medEst | — | ENUM | Estado de medida |

**Llave primaria:** `medId`

---

## Entidad: `movimientos`

**Fecha de creación:** 21/04/2025

**Descripción:** Entidad que controla la entrada y salida de los productos del inventario.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| idMov | 5 | VARCHAR | Identificador del movimiento |
| tipoMov | — | ENUM | Tipo de movimiento (PRODUCCION, AJUSTE, COMPRA, VENTA) |
| tipoSuministro | — | ENUM | Tipo de suministro |
| referenciaID | 15 | VARCHAR | Referencia del producto/material |
| cantidad | 11 | INT | Cantidad del movimiento |
| fecha | — | DATE | Fecha de registro del movimiento |
| usuIdFk | 15 | VARCHAR | Identificador FK del usuario que registró el movimiento |

**Llave primaria:** `idMov`

**Relaciones:** Movimientos con usuario

---

## Entidad: `pedidos`

**Fecha de creación:** 21/04/2025

**Descripción:** Almacena los datos principales del pedido realizado por un cliente.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| pedId | 10 | VARCHAR | Identificador único del pedido |
| pedCliIdFk | 15 | VARCHAR | Identificador FK del cliente |
| pedFecIng | — | DATETIME | Fecha en que fue ingresado al sistema el pedido |
| pedFecEst | — | DATE | Fecha estimada de entrega (opcional) |
| pedFecEnt | — | DATE | Fecha aproximada de entrega |
| pedEstFk | — | ENUM | Estado del pedido FK (pendiente, en proceso, terminado, entregado, cancelado) |
| pedObs | 300 | VARCHAR | Observaciones del pedido (opcional) |
| pedTolEst | 10,2 | DECIMAL | Precio total estimado del pedido (opcional) |
| pedTipPed | — | ENUM | Tipo de pedido |
| pedRecor | 11 | INT | Días de anticipación para recordatorio de entrega |
| pedUsuIdFk | 15 | VARCHAR | Usuario que registró el pedido |
| pedDesc | 100 | VARCHAR | Descripción del pedido |

**Llave primaria:** `pedId`

**Relaciones:** Pedido con cliente

---

## Entidad: `pedido_foto`

**Fecha de creación:** 24/03/2026

**Descripción:** Almacena los links de las fotos/imágenes del pedido.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| fotId | 11 | INT AUTO_INCREMENT | Identificador de la foto |
| pedIdFk | 10 | VARCHAR | Pedido al que pertenece la foto |
| fotUrl | 500 | VARCHAR | URL o ruta de la imagen |
| fotFec | — | TIMESTAMP | Fecha de registro de la foto |

**Llave primaria:** `fotId`

**Relaciones:** pedido_foto con pedidos

---

## Entidad: `det_pedido`

**Fecha de creación:** 21/04/2025

**Descripción:** Almacena las medidas personalizadas y el detalle del producto asociados a un pedido.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| detPedId | 10 | VARCHAR | Identificador del detalle de pedido |
| detPedCant | 11 | INT | Cantidad del pedido |
| pedObs | 255 | VARCHAR | Observaciones del pedido (opcional) |
| proIdFk | 10 | VARCHAR | Código FK del producto |
| pedIdFk | 5 | VARCHAR | Identificador FK del pedido |

**Llave primaria:** `detPedId`

**Relaciones:** Det_pedido con pedidos · Det_pedido con productos

---

## Entidad: `detped_med`

**Fecha de creación:** 18/03/2026

**Descripción:** Tabla intermedia que relaciona el detalle de pedido con las medidas del catálogo y sus valores correspondientes.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| detPedIdFk | 10 | VARCHAR | Identificador FK del detalle de pedido |
| detPedMedIdFk | 11 | INT | Identificador FK de la medida (catálogo) |
| detPedMedVal | 10,0 | DECIMAL | Valor de la medida en cm |

**Llave primaria:** `detPedIdFk` + `detPedMedIdFk`

**Relaciones:** Detped_med con det_pedido · Detped_med con medidas

---

## Entidad: `historial_pedido`

**Fecha de creación:** 24/03/2026

**Descripción:** Tabla de auditoría de pedido, se encarga de guardar los cambios de estado de la tabla pedido.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| histId | 11 | INT | Identificador de la auditoría |
| pedIdFk | 10 | VARCHAR | Pedido al que pertenece el cambio de estado |
| estadoAnterior | — | ENUM | Estado antes del cambio |
| estadoNuevo | — | ENUM | Estado después del cambio |
| usuIdFk | 15 | VARCHAR | Usuario que realizó el cambio |
| hisFec | — | TIMESTAMP | Fecha y hora del cambio de estado |
| hisObs | 250 | VARCHAR | Observaciones del cambio |

**Llave primaria:** `histId`

**Relaciones:** historial_pedido con pedido · historial_pedido con usuario

---

## Entidad: `ventas`

**Fecha de creación:** 21/04/2025

**Descripción:** Registra la información de cada venta realizada, incluyendo fecha, cliente, usuario, descuento y estado.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| venID | 10 | VARCHAR | Identificador de la venta |
| venFec | — | DATE | Fecha en que fue registrada la venta |
| venDesc | 11 | INT | Porcentaje del descuento aplicado a la venta (si aplica, por defecto 0) |
| estadoPago | — | ENUM | Estado de pago de la venta (pagado, anulado, adelantado, sin pagar) |
| venTotal | 10,2 | DECIMAL | Total de la venta |
| venFecVenLimit | — | DATE | Fecha límite de pago |
| cliIdFk | 15 | VARCHAR | Identificador FK del cliente que realizó la compra |
| usuIdFk | 15 | VARCHAR | Identificador FK del usuario que registró la venta |
| pedIdFk | 5 | VARCHAR | Identificador FK del pedido asociado (puede ser nulo) |

**Llave primaria:** `venID`

**Relaciones:** Ventas con cliente · Ventas con usuario · Ventas con pedidos

---

## Entidad: `det_venta`

**Fecha de creación:** 21/04/2025

**Descripción:** Contiene los productos asociados a cada venta realizada.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| detVenId | 10 | VARCHAR | Identificador del detalle de venta |
| idVenta | 10 | VARCHAR | Identificador FK de la venta padre |
| idProFk | 10 | VARCHAR | Código del producto/artículo (FK) |
| cantidad | 11 | INT | Cantidad del producto vendido |
| precio | 10,0 | DECIMAL | Precio del producto |
| subtotal | 30 | VARCHAR | Resultado de precio × cantidad |

**Llave primaria:** `detVenId`

**Relaciones:** Det_venta con ventas · Det_venta con productos

---

## Entidad: `pagos`

**Fecha de creación:** 18/03/2026

**Descripción:** Registra los pagos realizados asociados a una venta, permitiendo pagos parciales o múltiples pagos por venta.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| pagId | 20 | VARCHAR | Identificador del pago |
| pagVenIdFk | 5 | VARCHAR | Identificador FK de la venta |
| pagMon | 10,2 | DECIMAL | Monto del pago |
| pagMetPag | — | ENUM | Método de pago (efectivo, tarjeta, transferencia) |
| pagFec | — | DATE | Fecha del pago (opcional) |
| pagEst | — | ENUM | Estado del pago (completado, rechazado) |
| pagPedIdFk | 10 | VARCHAR | Pedido asociado para antes de que se cree una venta |

**Llave primaria:** `pagId`

**Relaciones:** Pagos con ventas · Pagos con pedidos

---

## Entidad: `factura`

**Fecha de creación:** 21/04/2025

**Descripción:** Registra las facturas generadas para las ventas realizadas.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| facId | 20 | VARCHAR | Identificador de la factura y FK de la venta |
| facFecEmi | — | DATE | Fecha de creación/emisión de la factura |
| facVenIdFk | 10 | VARCHAR | Identificador de la venta |
| facEst | — | ENUM | Estado de la factura (ACTIVA, ANULADA) |
| facTotal | 10,2 | DECIMAL | Total de la factura |

**Llave primaria:** `facId`

**Relaciones:** Factura con ventas

---

## Entidad: `abastecimiento`

**Fecha de creación:** 20/05/2026

**Descripción:** Registra las compras o ingresos de materiales e insumos necesarios para las operaciones de la empresa.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| id | 11 | INT | Identificador del abastecimiento |
| provIdFk | 15 | VARCHAR | Proveedor del suministro |
| abaFec | — | DATETIME | Fecha de abastecimiento |
| usuIdFk | 15 | VARCHAR | Usuario que registró el abastecimiento |

**Llave primaria:** `id`

**Relaciones:** abastecimiento con proveedor · abastecimiento con usuario

---

## Entidad: `detalle_abastecimiento`

**Fecha de creación:** 20/05/2026

**Descripción:** Almacena la información detallada de cada material o producto incluido en un abastecimiento.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| detAbsId | 11 | INT | Identificador del detalle |
| absIdFk | 11 | INT | Id de abastecimiento foráneo |
| detAbsTip | — | ENUM | Tipo de suministro (material, producto) |
| detAbsRefId | 20 | VARCHAR | Id de referencia |
| detAbsCan | 11 | INT | Cantidad |
| detAbsCos | 10,2 | DECIMAL | Costo de la compra |

**Llave primaria:** `detAbsId`

**Relaciones:** detalle_abastecimiento con abastecimiento

---

## Entidad: `Producción`

**Fecha de creación:** 20/05/2026

**Descripción:** Administra y controla los procesos de fabricación de productos, incluyendo su estado y seguimiento.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| prodId | 11 | INT | Identificador de la producción |
| proIdFk | 10 | VARCHAR | Id de producto |
| cantidad | 11 | INT | Cantidad a producir |
| estado | — | ENUM | Pendiente, en proceso, terminado, cancelado |
| fecha_inicio | — | DATE | Fecha que pasó la producción a "en proceso" |
| fecha_fin | — | DATE | Fecha que pasó la producción a "terminado" |
| detpetidfk | 10 | VARCHAR | Id foráneo de detalle de pedido |

**Llave primaria:** `prodId`

**Relaciones:** Producción con det_pedido · Producción con productos

---

## Entidad: `Alertas`

**Fecha de creación:** 31/05/2026

**Descripción:** Gestiona las notificaciones generadas por el sistema para informar eventos, pendientes o situaciones importantes.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| altId | 11 | INT | Identificador de la alerta |
| altTitulo | 360 | VARCHAR | Título de la notificación |
| altMensaje | — | TEXT | Explicación detallada de la alerta |
| altTipo | — | ENUM | Tipo de alerta (INFO, WARNING, ERROR) |
| altModulo | — | ENUM | Módulo originario de la alerta (PEDIDOS, PAGOS, VENTAS, INVENTARIO) |
| referenciaId | 60 | VARCHAR | Referencia del id del item |
| altFecha | — | DATETIME | Fecha y hora de la alerta |
| altInfoExtra | — | LONGTEXT | Información extra sobre la alerta en formato JSON |
| altEstado | — | ENUM | Estado de la alerta (ACTIVO, RESUELTO) |
| altCategoria | 300 | VARCHAR | Categoría a la que pertenece la alerta (ej: PAGO_PENDIENTE_PEDIDO) |

**Llave primaria:** `altId`

---

## Entidad: `Actividad_sistema`

**Fecha de creación:** 08/06/2026

**Descripción:** Registra las acciones realizadas por los usuarios y los eventos relevantes ocurridos dentro del sistema.

| Campo | Tamaño | Tipo de dato | Descripción |
|-------|--------|--------------|-------------|
| actId | 11 | INT | Identificador de la actividad |
| usuIdFk | 15 | VARCHAR | Id opcional del usuario ejecutor de la actividad |
| Modulo | 50 | VARCHAR | Módulo origen (PEDIDOS, USUARIO, CLIENTE, etc.) |
| accion | 100 | VARCHAR | Acción que generó el registro (REGISTRO, COMPRA, CAMBIO DE ESTADO, etc.) |
| descripcion | 255 | VARCHAR | Descripción de la actividad |
| referenciaId | 20 | VARCHAR | Referencia del id del item |
| fecha | 10 | DATETIME | Fecha en que se registró la actividad |

**Llave primaria:** `actId`

**Relaciones:** Actividad_sistema con usuario
