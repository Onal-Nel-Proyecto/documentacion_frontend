export default function Card({ icon: Icon, title, description, onClick, href, className = '' }) {
  const Tag = href ? 'a' : onClick ? 'button' : 'div'
  const extraProps = href ? { href } : onClick ? { type: 'button', onClick } : {}

  return (
    <Tag
      {...extraProps}
      className={`group bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-left w-full ${
        href || onClick
          ? 'cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all duration-200'
          : ''
      } ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-all duration-200">
          <Icon className="text-indigo-600" size={24} />
        </div>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      )}
    </Tag>
  )
}
