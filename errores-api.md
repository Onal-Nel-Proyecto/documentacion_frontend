# Documentación de Errores — API Onal & Nel

> Documentación generada a partir de los mensajes de error del sistema,
> siguiendo el formato definido en `REASONIX.md`.

---

## Índice de módulos

1. [Autenticación](#1-autenticación-auth)
2. [Usuarios](#2-usuarios-usuarios)
3. [Clientes](#3-clientes-clientes)
4. [Pedidos](#4-pedidos)
5. [Productos](#5-productos)
6. [Materiales](#6-materiales)
7. [Ventas](#7-ventas)
8. [Pagos](#8-pagos)
9. [Factura](#9-factura)
10. [Categorías](#10-categorías)
11. [Medidas](#11-medidas)
12. [Proveedores](#12-proveedores)
13. [Abastecimiento](#13-abastecimiento)
14. [Producción](#14-producción)
15. [Dashboard](#15-dashboard)
16. [Errores globales](#16-errores-globales)

---

## 1. Autenticación (`/auth`)

---

### 1.1 Usuario inválido

**Categoría:** Autenticación

**Descripción:**
El correo electrónico o la contraseña ingresados no corresponden a ningún usuario registrado.

**Posible causa:**
Credenciales incorrectas al iniciar sesión.

**Situaciones comunes:**
- Inicio de sesión con correo no registrado.
- Contraseña escrita incorrectamente.
- Usuario eliminado o no existente en el sistema.

**Cómo solucionarlo:**
- Verificar que el correo electrónico esté bien escrito.
- Verificar que la contraseña sea correcta.
- Si el problema persiste, contactar al administrador.

**Ejemplo:**
```json
POST /auth/login
{ "email": "usuario@correo.com", "password": "incorrecta" }
→ 401 { "status": false, "error": "Usuario invalido" }
```

---

### 1.2 Usuario bloqueado

**Categoría:** Autorización

**Descripción:**
El usuario intentó acceder al sistema pero su cuenta se encuentra bloqueada.

**Posible causa:**
La cuenta fue bloqueada por un administrador debido a incumplimiento de políticas o múltiples intentos fallidos.

**Situaciones comunes:**
- Intentar iniciar sesión con una cuenta bloqueada.
- Intentar acceder a recursos protegidos después de haber sido suspendido.

**Cómo solucionarlo:**
- Contactar al área de soporte o administrador.
- Solicitar la revisión del estado de la cuenta.
- Esperar a que un administrador realice el desbloqueo correspondiente.

**Ejemplo:**
```json
POST /auth/login
→ 403 { "status": false, "error": "Usuario bloqueado" }
```

---

### 1.3 No autorizado, se requiere autenticación

**Categoría:** Autenticación

**Descripción:**
La petición no incluye un token JWT válido o no se envió el token.

**Posible causa:**
- Token no enviado en la cookie o cabecera.
- Token malformado.
- Token de acceso no presente.

**Situaciones comunes:**
- Consumir un endpoint protegido sin haber iniciado sesión.
- Consumir un endpoint protegido después de cerrar sesión.
- Token no incluido en la petición.

**Cómo solucionarlo:**
- Iniciar sesión para obtener el token.
- Incluir el token en las cookies de la petición.
- Verificar que el token no haya expirado.

**Ejemplo:**
```json
GET /pedidos (sin token)
→ 401 { "status": false, "error": "No autorizado, se requiere autenticación" }
```

---

### 1.4 Sesión expirada

**Categoría:** Autenticación

**Descripción:**
El token JWT ha expirado y no es válido para continuar la sesión.

**Posible causa:**
El tiempo de vida del access token se ha cumplido.

**Situaciones comunes:**
- Dejar la aplicación abierta por largo tiempo sin actividad.
- Usar un token generado hace más tiempo del permitido (configurado en `ACCESS_TOKEN_EXPIRES_IN`).

**Cómo solucionarlo:**
- Utilizar el endpoint `/auth/refresh` para renovar el token mediante el refreshToken.
- Iniciar sesión nuevamente.

**Ejemplo:**
```json
GET /pedidos (token expirado)
→ 401 { "status": false, "error": "Sesión expirada" }
```

---

### 1.5 Token inválido

**Categoría:** Autenticación

**Descripción:**
El token JWT proporcionado no es válido (malformado, firma incorrecta, etc.).

**Posible causa:**
- Token manipulado o alterado.
- Token generado con una clave secreta diferente.
- Token malformado.

**Situaciones comunes:**
- Intentar usar un token modificado manualmente.
- Usar un token de otro entorno (desarrollo vs producción).

**Cómo solucionarlo:**
- Iniciar sesión nuevamente para obtener un token nuevo.
- No manipular manualmente los tokens.

**Ejemplo:**
```json
GET /auth/perfil (token manipulado)
→ 401 { "status": false, "error": "Token inválido" }
```

---

### 1.6 Acceso denegado

**Categoría:** Autorización

**Descripción:**
El usuario autenticado no tiene permisos suficientes para realizar la operación solicitada.

**Posible causa:**
El rol del usuario no tiene los privilegios necesarios (solo administradores).

**Situaciones comunes:**
- Un usuario no administrador intenta crear, actualizar o eliminar recursos.
- Un usuario no administrador intenta acceder a rutas restringidas.

**Cómo solucionarlo:**
- Contactar al administrador para solicitar los permisos necesarios.
- Iniciar sesión con una cuenta con rol `ADMINISTRADOR`.

**Ejemplo:**
```json
POST /productos (usuario sin rol admin)
→ 403 { "status": false, "error": "Acceso denegado" }
```

---

## 2. Usuarios (`/usuarios`)

---

### 2.1 Usuario no encontrado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un usuario con el ID especificado.

**Posible causa:**
El ID del usuario no existe en la base de datos.

**Situaciones comunes:**
- Consultar un usuario por ID que fue eliminado.
- ID mal escrito o inválido.

**Cómo solucionarlo:**
- Verificar que el ID del usuario sea correcto.
- Consultar la lista de usuarios para obtener IDs válidos.

**Ejemplo:**
```json
GET /usuarios/US999
→ 404 { "status": false, "error": "Usuario no encontrado" }
```

---

## 3. Clientes (`/clientes`)

---

### 3.1 Cliente no encontrado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un cliente con el ID especificado.

**Posible causa:**
- El ID del cliente no existe.
- El cliente fue eliminado o bloqueado.

**Situaciones comunes:**
- Consultar un cliente con ID incorrecto.
- Intentar actualizar un cliente que no existe.

**Cómo solucionarlo:**
- Verificar que el ID del cliente sea correcto.
- Consultar la lista de clientes activos.

**Ejemplo:**
```json
GET /clientes/CLI999
→ 404 { "status": false, "error": "Cliente no encontrado" }
```

---

### 3.2 El cliente ya se encuentra eliminado

**Categoría:** Reglas de negocio

**Descripción:**
Se intentó cambiar el estado de un cliente que ya se encuentra inactivo/eliminado.

**Posible causa:**
El cliente ya fue deshabilitado previamente.

**Situaciones comunes:**
- Intentar bloquear un cliente que ya está bloqueado.

**Cómo solucionarlo:**
- Verificar el estado actual del cliente antes de realizar la operación.
- Si se requiere, reactivar el cliente primero.

**Ejemplo:**
```json
PATCH /clientes/CLI001/estado (ya inactivo)
→ 400 { "status": false, "error": "El cliente ya se encuntra eliminado" }
```

---

### 3.3 El usuario USXXX no existe

**Categoría:** Recurso no encontrado

**Descripción:**
Al crear un cliente se especificó un ID de usuario responsable que no existe.

**Posible causa:**
- El usuario asignado fue eliminado.
- ID de usuario incorrecto.

**Situaciones comunes:**
- Crear un cliente asignando un usuario que no existe en el sistema.

**Cómo solucionarlo:**
- Verificar que el ID del usuario exista en la tabla de usuarios.
- Asignar un usuario válido.

**Ejemplo:**
```json
POST /clientes (con usuIdFk inválido)
→ 400 { "status": false, "error": "El usuario US999 no existe" }
```

---

## 4. Pedidos

---

### 4.1 Pedido no encontrado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un pedido con el ID especificado.

**Posible causa:**
- El ID del pedido no existe.
- El pedido fue eliminado.

**Situaciones comunes:**
- Consultar un pedido con ID incorrecto.
- Actualizar un pedido que no existe.

**Cómo solucionarlo:**
- Verificar que el ID del pedido sea correcto.
- Consultar la lista de pedidos.

**Ejemplo:**
```json
GET /pedidos/PD999
→ 404 { "status": false, "error": "Pedido no encontrado" }
```

---

### 4.2 Cliente no encontrado (al crear/actualizar pedido)

**Categoría:** Recurso no encontrado

**Descripción:**
El cliente asociado al pedido no existe en el sistema.

**Posible causa:**
- ID de cliente incorrecto.
- El cliente fue eliminado.

**Situaciones comunes:**
- Crear un pedido con un cliente que no existe.

**Cómo solucionarlo:**
- Verificar que el ID del cliente exista.
- Consultar la lista de clientes activos.

**Ejemplo:**
```json
POST /pedidos (con cliente_id inexistente)
→ 404 { "status": false, "error": "Cliente no encontrado" }
```

---

### 4.3 El cliente está bloqueado

**Categoría:** Reglas de negocio

**Descripción:**
No se puede crear un pedido porque el cliente asociado se encuentra bloqueado.

**Posible causa:**
El cliente fue deshabilitado por el administrador.

**Situaciones comunes:**
- Intentar registrar un pedido para un cliente inactivo.

**Cómo solucionarlo:**
- Reactivar al cliente antes de crear el pedido.
- Contactar al administrador.

**Ejemplo:**
```json
POST /pedidos (cliente bloqueado)
→ 403 { "status": false, "error": "El cliente está bloqueado" }
```

---

### 4.4 No hay campos para actualizar

**Categoría:** Validación

**Descripción:**
Se intentó actualizar un pedido sin enviar ningún campo válido para modificar.

**Posible causa:**
La petición PUT no incluye datos en el cuerpo o los campos enviados no son editables.

**Situaciones comunes:**
- Enviar una petición PUT sin cuerpo o con cuerpo vacío.

**Cómo solucionarlo:**
- Incluir al menos un campo editable en el cuerpo de la petición (cliente_id, descripcion, observacion, fecha_estimada_entrega, recordatorio, tipo_pedido).

**Ejemplo:**
```json
PUT /pedidos/PD001 (cuerpo vacío)
→ 400 { "status": false, "error": "No hay campos para actualizar" }
```

---

### 4.5 El pedido debe estar en estado TERMINADO para entregarlo

**Categoría:** Reglas de negocio

**Descripción:**
No se puede marcar un pedido como ENTREGADO si no está en estado TERMINADO.

**Posible causa:**
El pedido aún está en proceso, pendiente o cancelado.

**Situaciones comunes:**
- Intentar entregar un pedido que no ha terminado su producción.

**Cómo solucionarlo:**
- Completar la producción del pedido para cambiar su estado a TERMINADO.
- Luego proceder a la entrega.

**Ejemplo:**
```json
PATCH /pedidos/PD001/entregar (estado: PENDIENTE)
→ 400 { "status": false, "error": "El pedido debe estar en estado TERMINADO para entregarlo. Estado actual: pendiente" }
```

---

### 4.6 Error al crear el pedido

**Categoría:** Error interno del servidor

**Descripción:**
Ocurrió un error inesperado al intentar crear el pedido en la base de datos.

**Posible causa:**
Error de base de datos, restricciones no contempladas o error del SP.

**Situaciones comunes:**
- Problemas de conexión con la BD.
- Error en el procedimiento almacenado de generación de ID.

**Cómo solucionarlo:**
- Reintentar la operación.
- Si persiste, contactar al equipo de desarrollo.

**Ejemplo:**
```json
POST /pedidos
→ 500 { "status": false, "error": "Error al crear el pedido" }
```

---

### 4.7 Validaciones de pedido (400)

**Categoría:** Validación

| Mensaje | Ubicación |
|---------|-----------|
| `id del cliente requerido` | POST /pedidos |
| `el id del cliente debe de tener como minimo 7 caracteres maximo 15 caracteres` | POST /pedidos |
| `La fecha debe tener formato válido (YYYY-MM-DD)` | POST /pedidos |
| `La fecha no puede ser anterior a hoy` | POST /pedidos |
| `La fecha estimada no puede superar un año a partir de hoy` | POST /pedidos |
| `Observaciones debe ser texto` | POST /pedidos |
| `El recordatorio debe ser un numero` | POST /pedidos |
| `Tipo de pedido inválido` | POST /pedidos |
| `La descripción debe ser texto` | POST /pedidos |
| `La descripción no puede tener más de 100 caracteres` | POST /pedidos |
| `el parametro pag debe ser un numero` | GET /pedidos |
| `el estado debe ser: pendiente \| terminado \| cancelado \| en_proceso \| entregado \| completados` | GET /pedidos |
| `fecha_desde debe tener formato válido (YYYY-MM-DD)` | GET /pedidos |
| `fecha_hasta debe tener formato válido (YYYY-MM-DD)` | GET /pedidos |
| `el parametro cliente debe ser texto` | GET /pedidos |
| `tipo_pedido debe ser: personalizado \| retoques \| modificaciones` | GET /pedidos |
| `estado_pago debe ser: SIN PAGAR \| ABONADO \| PAGADO` | GET /pedidos |
| `fecha_entrega_desde debe tener formato válido (YYYY-MM-DD)` | GET /pedidos |
| `fecha_entrega_hasta debe tener formato válido (YYYY-MM-DD)` | GET /pedidos |
| `descripcion no puede tener más de 100 caracteres` | GET /pedidos |
| `tipo_prenda no válido` | GET /pedidos |
| `mes debe ser un número entre 1 y 12` | GET /pedidos |
| `El motivo de cancelación es obligatorio` | PATCH /pedidos/:id/cancelar |
| `El motivo debe ser texto` | PATCH /pedidos/:id/cancelar |
| `El motivo no puede superar los 255 caracteres` | PATCH /pedidos/:id/cancelar |

---

## 5. Productos

---

### 5.1 Producto no encontrado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un producto con el ID especificado.

**Posible causa:**
- El ID del producto no existe.
- El producto fue desactivado.

**Situaciones comunes:**
- Consultar un producto por ID incorrecto.
- Actualizar un producto que no existe.

**Cómo solucionarlo:**
- Verificar que el ID del producto sea correcto.
- Consultar la lista de productos.

**Ejemplo:**
```json
GET /productos/PR999
→ 404 { "status": false, "error": "Producto no encontrado" }
```

---

### 5.2 La categoría especificada no existe

**Categoría:** Recurso no encontrado

**Descripción:**
Al crear o actualizar un producto se especificó una categoría que no existe.

**Posible causa:**
- ID de categoría incorrecto.
- La categoría fue eliminada.

**Situaciones comunes:**
- Crear un producto con categoría inexistente.

**Cómo solucionarlo:**
- Verificar que el ID de la categoría exista en el sistema.
- Consultar la lista de categorías.

**Ejemplo:**
```json
POST /productos (categoriaId inválido)
→ 400 { "status": false, "error": "La categoría especificada no existe" }
```

---

## 6. Materiales

---

### 6.1 Material no encontrado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un material con el ID especificado.

**Posible causa:**
- El ID del material no existe.
- El material fue eliminado.

**Situaciones comunes:**
- Consultar un material por ID incorrecto.
- Actualizar un material que no existe.

**Cómo solucionarlo:**
- Verificar que el ID del material sea correcto.

**Ejemplo:**
```json
GET /materiales/999
→ 404 { "status": false, "error": "Material no encontrado" }
```

---

## 7. Ventas

---

### 7.1 Venta no encontrada

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró una venta con el ID especificado.

**Posible causa:**
- El ID de la venta no existe.
- La venta fue anulada.

**Situaciones comunes:**
- Consultar una venta con ID incorrecto.

**Cómo solucionarlo:**
- Verificar que el ID de la venta sea correcto.

**Ejemplo:**
```json
GET /ventas/VT999
→ 404 { "status": false, "error": "Venta no encontrada" }
```

---

### 7.2 El monto supera el saldo pendiente de la venta

**Categoría:** Reglas de negocio

**Descripción:**
El monto del pago registrado supera el saldo pendiente de la venta.

**Posible causa:**
- Se intenta pagar más del total adeudado.
- Error en el cálculo del monto a pagar.

**Situaciones comunes:**
- Registrar un pago con monto superior al faltante.

**Cómo solucionarlo:**
- Verificar el saldo pendiente antes de registrar el pago.
- Ajustar el monto al valor correcto.

**Ejemplo:**
```json
POST /ventas (monto > faltante)
→ 400 { "status": false, "error": "El pago supera el saldo pendiente de la venta" }
```

---

## 8. Pagos

---

### 8.1 Debe proporcionar un pedido o una venta para registrar el pago

**Categoría:** Validación

**Descripción:**
No se puede crear un pago si no se especifica un pedido_id o una venta_id.

**Posible causa:**
- Falta el campo pedido_id y venta_id en el cuerpo de la petición.

**Situaciones comunes:**
- Crear un pago sin referencia.

**Cómo solucionarlo:**
- Incluir al menos pedido_id o venta_id en el cuerpo.

**Ejemplo:**
```json
POST /pagos (sin referencias)
→ 400 { "status": false, "error": "Debe proporcionar un pedido o una venta para registrar el pago" }
```

---

### 8.2 Pago no encontrado o ya fue rechazado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró el pago especificado o ya se encuentra en estado RECHAZADO.

**Posible causa:**
- ID de pago incorrecto.
- El pago ya fue rechazado anteriormente.

**Situaciones comunes:**
- Intentar rechazar un pago que no existe.
- Intentar rechazar un pago dos veces.

**Cómo solucionarlo:**
- Verificar el ID del pago.
- Consultar el estado actual del pago.

**Ejemplo:**
```json
PATCH /pagos/PAG999/rechazar
→ 404 { "status": false, "error": "Pago no encontrado o ya fue rechazado" }
```

---

### 8.3 El monto supera el saldo pendiente del pedido

**Categoría:** Reglas de negocio

**Descripción:**
El monto del pago supera el saldo pendiente del pedido asociado.

**Posible causa:**
- Error en el monto ingresado.
- Ya se realizaron pagos previos que cubren el total.

**Situaciones comunes:**
- Registrar un pago mayor a la deuda pendiente.

**Cómo solucionarlo:**
- Consultar el resumen del pedido para conocer el saldo pendiente.
- Ajustar el monto al valor correcto.

**Ejemplo:**
```json
POST /pagos (monto > faltante del pedido)
→ 400 { "status": false, "error": "El monto supera el saldo pendiente del pedido" }
```

---

### 8.4 El pedido no existe

**Categoría:** Recurso no encontrado

**Descripción:**
El pedido especificado en el pago no existe.

**Posible causa:**
- ID de pedido incorrecto.
- El pedido fue eliminado.

**Situaciones comunes:**
- Registrar un pago referenciando un pedido inexistente.

**Cómo solucionarlo:**
- Verificar que el ID del pedido sea correcto.

**Ejemplo:**
```json
POST /pagos (pedido_id inválido)
→ 404 { "status": false, "error": "El pedido no existe" }
```

---

### 8.5 No se pueden registrar pagos en un pedido cancelado

**Categoría:** Reglas de negocio

**Descripción:**
No se permiten pagos para pedidos que están en estado CANCELADO.

**Posible causa:**
El pedido fue cancelado y ya no admite transacciones.

**Situaciones comunes:**
- Intentar registrar un pago para un pedido cancelado.

**Cómo solucionarlo:**
- Verificar el estado del pedido antes de registrar el pago.
- Si el pedido está cancelado, no es posible agregar pagos.

**Ejemplo:**
```json
POST /pagos (pedido cancelado)
→ 400 { "status": false, "error": "No se pueden registrar pagos en un pedido cancelado" }
```

---

### 8.6 La venta no existe

**Categoría:** Recurso no encontrado

**Descripción:**
La venta especificada en el pago no existe.

**Posible causa:**
- ID de venta incorrecto.
- La venta fue anulada.

**Situaciones comunes:**
- Registrar un pago referenciando una venta inexistente.

**Cómo solucionarlo:**
- Verificar que el ID de la venta sea correcto.

**Ejemplo:**
```json
POST /pagos (venta_id inválido)
→ 404 { "status": false, "error": "La venta no existe" }
```

---

### 8.7 Validaciones de pagos (400)

**Categoría:** Validación

| Mensaje | Ubicación |
|---------|-----------|
| `Debe proporcionar un pedido_id o una venta_id` | POST /pagos |
| `El monto es obligatorio` | POST /pagos |
| `El monto debe ser un número positivo mayor a 0` | POST /pagos |
| `El método de pago es obligatorio` | POST /pagos |
| `Método de pago inválido` | POST /pagos |
| `El ID del pago es obligatorio` | PATCH /pagos/:id/rechazar |

---

## 9. Factura

---

### 9.1 Factura no encontrada

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró una factura con el ID especificado.

**Posible causa:**
- ID de factura incorrecto.
- La factura fue anulada.

**Situaciones comunes:**
- Consultar una factura inexistente.

**Cómo solucionarlo:**
- Verificar que el ID de la factura sea correcto.
- Generar la factura primero si es para una venta.

**Ejemplo:**
```json
GET /ventas/VT001/factura (sin factura)
→ 404 { "status": false, "error": "Factura no encontrada" }
```

---

## 10. Categorías

---

### 10.1 Categoría no encontrada

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró una categoría con el ID especificado.

**Posible causa:**
- ID de categoría incorrecto.
- La categoría fue eliminada o desactivada.

**Situaciones comunes:**
- Consultar, actualizar o eliminar una categoría que no existe.

**Cómo solucionarlo:**
- Verificar que el ID de la categoría sea correcto.

**Ejemplo:**
```json
GET /categorias/999
→ 404 { "status": false, "error": "Categoría no encontrada" }
```

---

## 11. Medidas

---

### 11.1 Medida no encontrada

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró una medida con el ID especificado.

**Posible causa:**
- ID de medida incorrecto.
- La medida fue eliminada.

**Situaciones comunes:**
- Consultar o modificar una medida inexistente.

**Cómo solucionarlo:**
- Verificar que el ID de la medida exista.

**Ejemplo:**
```json
GET /medidas/999
→ 404 { "status": false, "error": "Medida no encontrada" }
```

---

## 12. Proveedores

---

### 12.1 Proveedor no encontrado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un proveedor con el ID especificado.

**Posible causa:**
- ID de proveedor incorrecto.
- El proveedor fue deshabilitado.

**Situaciones comunes:**
- Consultar o actualizar un proveedor que no existe.

**Cómo solucionarlo:**
- Verificar que el ID del proveedor sea correcto.

**Ejemplo:**
```json
GET /proveedores/P999
→ 404 { "status": false, "error": "Proveedor no encontrado" }
```

---

## 13. Abastecimiento

---

### 13.1 Abastecimiento no encontrado

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un registro de abastecimiento con el ID especificado.

**Posible causa:**
- ID de abastecimiento incorrecto.
- El registro fue eliminado.

**Situaciones comunes:**
- Consultar un abastecimiento que no existe.

**Cómo solucionarlo:**
- Verificar que el ID del abastecimiento sea correcto.

---

## 14. Producción

---

### 14.1 Producción no encontrada

**Categoría:** Recurso no encontrado

**Descripción:**
No se encontró un registro de producción con el ID especificado.

**Posible causa:**
- ID de producción incorrecto.
- El registro fue eliminado.

**Situaciones comunes:**
- Consultar o modificar una producción inexistente.

**Cómo solucionarlo:**
- Verificar que el ID de producción exista.

---

## 15. Dashboard

---

### 15.1 Error interno del servidor

**Categoría:** Error interno del servidor

**Descripción:**
Ocurrió un error inesperado al consultar los datos del dashboard.

**Posible causa:**
Error en las consultas de base de datos o en el procesamiento de los KPIs.

**Situaciones comunes:**
- Problemas temporales de conexión con la BD.
- Datos inconsistentes en las tablas de hechos.

**Cómo solucionarlo:**
- Reintentar la operación.
- Si persiste, contactar al equipo de desarrollo.

---

## 16. Errores globales

---

### 16.1 Error interno del servidor

**Categoría:** Error interno del servidor

**Descripción:**
Error genérico del servidor. Es el mensaje por defecto cuando ocurre una excepción no controlada.

**Posible causa:**
- Error en la base de datos.
- Error no contemplado en la lógica del controlador.
- Excepción en tiempo de ejecución.

**Situaciones comunes:**
- Cualquier operación que falle por causas no previstas.
- Error de conexión con MySQL.
- Timeout en consultas.

**Cómo solucionarlo:**
- Revisar los logs del servidor para identificar la causa raíz.
- Reintentar la operación.
- Contactar al equipo de desarrollo si persiste.

**Ejemplo:**
```json
GET /pedidos (error BD)
→ 500 { "status": false, "error": "Error interno del servidor" }
```

---

### 16.2 Errores de validación (400)

**Categoría:** Validación

Cuando se envían datos inválidos, el sistema responde con un objeto de errores detallado:

```json
{
  "status": false,
  "msg": "Errores de validación",
  "errors": {
    "nombre": ["El nombre es requerido"],
    "email": ["El correo electrónico no es válido"]
  }
}
```

Cada campo puede tener uno o varios mensajes de error listados en un array.

---

### 16.3 Recurso no encontrado (404)

**Categoría:** Recurso no encontrado

**Descripción:**
Formato genérico para recursos no encontrados en cualquier módulo.

**Respuesta:**
```json
{
  "status": false,
  "error": "<nombre del recurso> no encontrado"
}
```

**Ejemplos comunes:**
- `Cliente no encontrado`
- `Producto no encontrado`
- `Pedido no encontrado`
- `Usuario no encontrado`
- `Material no encontrado`
- `Proveedor no encontrado`
- `Categoría no encontrada`
- `Medida no encontrada`
- `Venta no encontrada`
- `Factura no encontrada`

---

### 16.4 Error de validación de ID de cliente

**Categoría:** Validación

| Mensaje | Módulo |
|---------|--------|
| `El ID de cliente debe ser un número entero positivo` | Clientes |
| `id del cliente requerido` | Pedidos |
| `el id del cliente debe de tener como minimo 7 caracteres maximo 15 caracteres` | Pedidos |
| `El id del cliente debe tener entre 7 y 15 caracteres` | Pedidos (update) |

---

### 16.5 Error de validación de fecha

**Categoría:** Validación

| Mensaje | Módulo |
|---------|--------|
| `La fecha debe tener formato válido (YYYY-MM-DD)` | Pedidos |
| `La fecha no puede ser anterior a hoy` | Pedidos |
| `La fecha estimada no puede superar un año a partir de hoy` | Pedidos |
| `fecha_desde debe tener formato válido (YYYY-MM-DD)` | Pedidos (GET) |
| `fecha_hasta debe tener formato válido (YYYY-MM-DD)` | Pedidos (GET) |
| `fecha_entrega_desde debe tener formato válido (YYYY-MM-DD)` | Pedidos (GET) |
| `fecha_entrega_hasta debe tener formato válido (YYYY-MM-DD)` | Pedidos (GET) |

---

### 16.6 Error de validación de método de pago

**Categoría:** Validación

| Mensaje | Módulo |
|---------|--------|
| `Método de pago inválido. Permitidos: TRANSFERENCIA, EFECTIVO, TARJETA` | Pagos |

---

### 16.7 Errores de archivos (imágenes)

**Categoría:** Validación

| Mensaje | Módulo |
|---------|--------|
| `La imagen no puede superar los 5MB` | Pedidos (fotos) |
| `Solo se permiten archivos .jpg, .jpeg, .png, .webp` | Pedidos (fotos) |
| `No se envió ninguna imagen` | Pedidos (fotos) |
| `El pedido ya tiene el máximo de 15 fotos` | Pedidos (fotos) |
| `Foto no encontrada` | Pedidos (fotos) |

---

> **Nota:** Esta documentación cubre la mayoría de los errores del sistema.
> Los mensajes de error de validación (`express-validator`) se devuelven
> en formato `{ status: false, msg: "Errores de validación", errors: { campo: ["msg"] } }`
> con código HTTP 400.
