/**
 * Mapeo de slugs de la aplicación a endpoints de la API.
 *
 * @type {Record<string, string>}
 */
const ENDPOINTS = {
  clases:                  'DIAGRAMA DE CLASES',
  'casos-uso':             'CASOS DE USO',
  actividades:             'ACTIVIDADES',
  'modelo-entidad-relacion': 'ER',
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
 * `Array<{ module: string, images: Array<{ id, title, url, description?, orden? }> }>`
 *
 * @param {unknown} data
 * @returns {data is Array<{ module: string; images: Array<{ id: string; title: string; url: string; description?: string; orden?: number }> }>}
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
 * Obtiene los diagramas de un tipo desde la API REST.
 *
 * @param {string} tipo — Slug del diagrama ('clases', 'casos-uso', etc.)
 * @returns {Promise<Array<{ module: string; images: Array<{ id: string; title: string; url: string; description?: string }> }>>}
 * @throws {Error} Si el tipo no es válido, hay error de red, o la respuesta no tiene el formato esperado.
 */
export async function getDiagramas(tipo) {
  const endpoint = ENDPOINTS[tipo]

  if (!endpoint) {
    throw new Error(`Tipo de diagrama no válido: "${tipo}"`)
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
