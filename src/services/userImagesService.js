/**
 * Mapeo de slugs del manual de usuario a endpoints de la API.
 *
 * @type {Record<string, string>}
 */
const ENDPOINTS = {
  'interfaz':            'INTERFAZ',
  'solucion-problemas':  'PROBLEMAS',
}

/**
 * Obtiene la URL base de la API desde la variable de entorno.
 * Fallback a localhost:8000 para desarrollo local.
 */
function getBaseUrl() {
  return (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '')
}

/**
 * Valida que la respuesta tenga la forma esperada:
 * `Array<{ module: string, images: Array<{ id, title, url, orden? }> }>`
 *
 * @param {unknown} data
 * @returns {data is Array<{ module: string; images: Array<{ id: string; title: string; url: string; orden?: number }> }>}
 */
function isValidResponse(data) {
  if (!Array.isArray(data)) return false
  return data.every(
    (item) =>
      item &&
      typeof item.module === 'string' &&
      Array.isArray(item.images) &&
      item.images.every(
        (img) =>
          img &&
          typeof img.id === 'string' &&
          typeof img.title === 'string' &&
          typeof img.url === 'string' &&
          (img.orden == null || typeof img.orden === 'number'),
      ),
  )
}

/**
* Valida que la respuesta plana (módulo específico) sea un array de imágenes.
*
* @param {unknown} data
* @returns {data is Array<{ id: string; title: string; url: string; orden?: number }>}
*/
function isValidFlatResponse(data) {
  if (!Array.isArray(data)) return false
  return data.every(
    (img) =>
      img &&
      typeof img.id === 'string' &&
      typeof img.title === 'string' &&
      typeof img.url === 'string' &&
      (img.orden == null || typeof img.orden === 'number'),
  )
}

/**
 * Obtiene todos los módulos con sus imágenes desde la API REST.
 *
 * @param {string} type — Slug del tipo ('interfaz' o 'solucion-problemas')
 * @returns {Promise<Array<{ module: string; images: Array<{ id: string; title: string; url: string; orden?: number }> }>>}
 */
export async function getUserModules(type) {
  const endpoint = ENDPOINTS[type]

  if (!endpoint) {
    throw new Error(`Tipo de imagen no válido: "${type}"`)
  }

  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/imagenes/${encodeURIComponent(endpoint)}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Error del servidor (${response.status}): ${response.statusText || 'Sin respuesta'}`,
    )
  }

  const data = await response.json()

  if (!isValidResponse(data)) {
    throw new Error('La respuesta de la API no tiene el formato esperado.')
  }

  return data
}

/**
 * Obtiene las imágenes de un módulo específico desde la API REST.
 *
 * @param {string} type — Slug del tipo ('interfaz' o 'solucion-problemas')
 * @param {string} moduleName — Nombre exacto del módulo (ej. "Autenticación")
 * @returns {Promise<Array<{ id: string; title: string; url: string; orden?: number }>>}
 */
export async function getUserModuleImages(type, moduleName) {
  const endpoint = ENDPOINTS[type]

  if (!endpoint) {
    throw new Error(`Tipo de imagen no válido: "${type}"`)
  }

  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/imagenes/${encodeURIComponent(endpoint)}/${encodeURIComponent(moduleName)}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Error del servidor (${response.status}): ${response.statusText || 'Sin respuesta'}`,
    )
  }

  const data = await response.json()

  if (!isValidFlatResponse(data)) {
    throw new Error('La respuesta de la API no tiene el formato esperado.')
  }

  return data
}
