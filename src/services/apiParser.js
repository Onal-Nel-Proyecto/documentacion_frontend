/**
 * Parsea el archivo markdown de documentación de endpoints
 * a una estructura de datos organizada por módulos.
 *
 * Formato esperado:
 *
 *   ## Módulo (`/prefix`)
 *
 *   | Ruta | Método | Descripción | Respuesta exitosa |
 *   |------|--------|-------------|-------------------|
 *   | ...  | ...    | ...         | ...               |
 */

/* ─── Helpers ──────────────────────────────────── */

function parseTableRow(line) {
  const parts = line.split('|')
  return parts.slice(1, -1).map((p) => p.trim())
}

function extractMethod(cell) {
  const match = cell.match(/\*{0,2}(GET|POST|PUT|PATCH|DELETE)\*{0,2}/i)
  return match ? match[1] : cell.trim()
}

function extractStatusCode(cell) {
  const match = cell.match(/\*\*(\d{3})\*\*/)
  return match ? match[1] : ''
}

function cleanResponseText(cell) {
  return cell
    .replace(/\*\*\d{3}\*\*\s*[–\-—]?\s*/, '')
    .trim()
}

function extractPathParams(path) {
  const params = []
  const parts = path.split('/')
  for (const part of parts) {
    if (part.startsWith(':')) {
      params.push(part.slice(1))
    }
  }
  return params
}

function extractQueryParams(description) {
  // Busca paréntesis con nombres de parámetros: (`pag`, `estado`, `fecha_desde`)
  const match = description.match(/\((`[^`]+`(?:\s*,\s*`[^`]+`)*)\)/)
  if (!match) return []
  return match[1]
    .split(',')
    .map((p) => p.trim().replace(/`/g, ''))
    .filter(Boolean)
}

/* ─── Parser de tabla markdown ──────────────────── */

function parseMarkdownTable(text) {
  const lines = text.split('\n').filter((l) => l.trim().startsWith('|'))
  if (lines.length < 2) return null

  // Primera fila sin separador → headers
  const tableLines = lines.filter((l) => !l.includes('---'))
  if (tableLines.length < 1) return null

  const headers = parseTableRow(tableLines[0])
  const dataLines = tableLines.slice(1)

  return dataLines.map((line) => {
    const cells = parseTableRow(line)
    const row = {}
    headers.forEach((h, i) => {
      row[h] = cells[i] !== undefined ? cells[i] : ''
    })
    return row
  })
}

/* ─── Parser principal ──────────────────────────── */

/**
 * @param {string} rawText — Contenido completo de DOC_ENDPOINTS.md
 * @returns {Array<{
 *   id: string,
 *   name: string,
 *   prefix: string,
 *   endpoints: Array<{
 *     method: string,
 *     path: string,
 *     description: string,
 *     responseStatus: string,
 *     responseText: string,
 *     pathParams: string[],
 *     queryParams: string[],
 *   }>,
 * }>}
 */
export function parseApiDoc(rawText) {
  // Separar secciones por "## " (título nivel 2)
  const parts = rawText.split(/\n(?=## )/).slice(1)

  const modules = []

  for (const part of parts) {
    const lines = part.split('\n')
    const heading = lines[0].trim()
    const content = lines.slice(1).join('\n')

    // Saltar secciones sin tabla de datos
    const tableData = parseMarkdownTable(content)
    if (!tableData || tableData.length === 0) continue

    // Extraer nombre del módulo y prefijo de ruta
    const headMatch = heading.match(
      /^##\s+(.+?)(?:\s*\(`([^`]+)`\))?\s*$/,
    )
    const name = headMatch
      ? headMatch[1].trim()
      : heading.replace(/^##\s+/, '').trim()
    const prefix = headMatch && headMatch[2] ? headMatch[2].trim() : ''

    const id = name
      .toLowerCase()
      .replace(/[\s_()/]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const endpoints = tableData.map((row) => {
      const rawMethod = row['Método'] || ''
      const rawPath = (row['Ruta'] || '').trim()
      const rawDesc = (row['Descripción'] || '').trim()
      const rawResp = row['Respuesta exitosa'] || ''

      return {
        method: extractMethod(rawMethod),
        path: rawPath,
        description: rawDesc,
        responseStatus: extractStatusCode(rawResp),
        responseText: cleanResponseText(rawResp),
        pathParams: extractPathParams(rawPath),
        queryParams: extractQueryParams(rawDesc),
      }
    })

    modules.push({ id, name, prefix, endpoints })
  }

  return modules
}
