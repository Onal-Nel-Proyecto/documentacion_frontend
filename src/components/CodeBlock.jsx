/**
 * Bloque de código con estilo consistente al resto del manual técnico.
 * Usa el mismo diseño que los `<pre>` del proyecto.
 */
export default function CodeBlock({ code, language = '' }) {
  return (
    <pre className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 overflow-x-auto border border-slate-200 leading-relaxed">
      {language && (
        <span className="block text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
          {language}
        </span>
      )}
      <code>{code}</code>
    </pre>
  )
}
