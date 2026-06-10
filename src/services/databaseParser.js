/**
 * Parsea el archivo markdown del diccionario de base de datos
 * a una estructura de datos organizada por tablas.
 *
 * Formato esperado:
 *
 *   ## Entidad: `nombre`
 *
 *   **Fecha de creación:** fecha
 *   **Descripción:** texto
 *
 *   | Campo | Tamaño | Tipo de dato | Descripción |
 *   |-------|--------|--------------|-------------|
 *   | ...   | ...    | ...          | ...         |
 *
 *   **Llave primaria:** `pk`
 *   **Relaciones:** origen con destino · origen con destino
 *
 * Las columnas de la tabla de campos se detectan dinámicamente
 * desde el encabezado — no se asume una cantidad fija.
 */

/* ─── Helpers ──────────────────────────────────── */

function parseTableRow(line) {
  const parts = line.split('|')
  // El primer y último elemento son vacíos por el | inicial/final
  return parts.slice(1, -1).map((p) => p.trim())
}

function parseRelations(text) {
  if (!text) return []
  return text.split('·').map((rel) => {
    const trimmed = rel.trim()
    const match = trimmed.match(/^(.+?)\s+con\s+(.+)$/i)
    if (match) {
      return {
        origen: match[1].trim(),
        destino: match[2].trim(),
      }
    }
    return { origen: trimmed, destino: '' }
  })
}

function toId(text) {
  return text
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/* ─── Parser principal ──────────────────────────── */

/**
 * @param {string} rawText — Contenido completo del archivo markdown
 * @returns {Array<{
 *   id: string,
 *   nombre: string,
 *   descripcion: string,
 *   headers: string[],
 *   campos: Array<Record<string, string>>,
 *   llavePrimaria: string,
 *   relaciones: Array<{ origen: string, destino: string }>,
 * }>}
 */
export function parseDiccionario(rawText) {
  // Separar por "## Entidad:"
  const parts = rawText.split(/^## Entidad:/m)
  // parts[0] es el encabezado del documento (título, fecha, etc.)
  const sections = parts.slice(1)

  if (sections.length === 0) return []

  return sections.map((section) => {
    const text = section.trim()

    // --- Nombre de la tabla ---
    const nameMatch = text.match(/`([^`]+)`/)
    const nombre = nameMatch ? nameMatch[1].trim() : ''

    // --- Descripción ---
    const descMatch = text.match(/\*\*Descripción:\*\*\s*(.+?)(?:\n|$)/)
    const descripcion = descMatch ? descMatch[1].trim() : ''

    // --- Tabla de campos (markdown table) ---
    const allLines = text.split('\n')
    const tableLines = allLines.filter(
      (l) => l.trim().startsWith('|') && l.includes('---') === false,
    )

    let headers = []
    let campos = []

    if (tableLines.length >= 1) {
      // Primera fila = encabezados
      headers = parseTableRow(tableLines[0])

      // Filas restantes = datos
      const dataLines = tableLines.slice(1)
      campos = dataLines.map((line) => {
        const cells = parseTableRow(line)
        const campo = {}
        headers.forEach((h, i) => {
          campo[h] = cells[i] !== undefined ? cells[i] : ''
        })
        return campo
      })
    }

    // --- Llave primaria ---
    const pkMatch = text.match(/\*\*Llave primaria:\*\*\s*`([^`]+)`/)
    const llavePrimaria = pkMatch ? pkMatch[1].trim() : ''

    // --- Relaciones ---
    const relMatch = text.match(/\*\*Relaciones:\*\*\s*(.+?)(?:\n|$)/)
    const relaciones = relMatch ? parseRelations(relMatch[1].trim()) : []

    return {
      id: toId(nombre || `tabla-${Math.random()}`),
      nombre,
      descripcion,
      headers,
      campos,
      llavePrimaria,
      relaciones,
    }
  })
}
