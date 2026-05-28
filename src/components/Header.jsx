import { HiMenu } from 'react-icons/hi'

export default function Header({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100"
      >
        <HiMenu size={20} />
      </button>
      <h2 className="text-sm font-semibold text-slate-700 tracking-wide">{title}</h2>
    </header>
  )
}
