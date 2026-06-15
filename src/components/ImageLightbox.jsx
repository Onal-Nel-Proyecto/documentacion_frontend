import { useEffect, useCallback } from 'react'
import { TbExternalLink, TbX } from 'react-icons/tb'

/**
 * Lightbox para visualizar imágenes a pantalla completa.
 *
 * - Muestra la imagen sobre un fondo oscuro semitransparente.
 * - La imagen se renderiza como `background-image` en un div,
 *   lo que impide el menú contextual de descarga sobre ella.
 * - Bloquea el scroll del body mientras está abierto.
 * - Cierra al hacer clic fuera de la imagen, presionar Escape,
 *   o tocar el botón de cerrar.
 *
 * @param {{ src: string; alt?: string; onClose: () => void }} props
 */
export default function ImageLightbox({ src, alt = '', onClose }) {
  /* ── Bloquear scroll del body ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  /* ── Cerrar con Escape ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Botones flotantes — agrupados con fondo para evitar que la imagen los oculte */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-black/30 rounded-xl p-2 backdrop-blur-sm">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-all"
          aria-label="Cerrar"
        >
          <TbX size={22} />
        </button>

        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur flex items-center gap-1.5 px-3 text-xs font-medium text-white/80 hover:text-white transition-all"
          aria-label="Abrir imagen completa"
        >
          <TbExternalLink size={16} />
          Abrir imagen
        </a>
      </div>

      {/* Contenedor de la imagen (sin interacción directa) */}
      <div
        className="relative max-w-full max-h-full w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${src}")`,
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserDrag: 'none',
            WebkitUserSelect: 'none',
          }}
          role="img"
          aria-label={alt || 'Diagrama ampliado'}
        />
      </div>
    </div>
  )
}
