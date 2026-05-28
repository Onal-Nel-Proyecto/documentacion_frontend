import { TbHammer } from 'react-icons/tb'

export default function WIP({ title }) {
  return (
    <div className="page-enter min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6">
        <TbHammer size={36} className="text-amber-400" />
      </div>
      <h1 className="text-3xl text-slate-800 mb-3">{title}</h1>
      <p className="text-slate-500 text-base max-w-sm">
        Esta sección está en construcción 🚧<br />
        Pronto encontrarás el contenido aquí.
      </p>
      <div className="mt-8 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full bg-amber-300 ${i === 0 ? 'w-8' : i === 1 ? 'w-4' : 'w-2'}`} />
        ))}
      </div>
    </div>
  )
}
