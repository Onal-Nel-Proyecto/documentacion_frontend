import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { userNav, techNav } from '../routes/navConfig'

export default function DocLayout({ type }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const nav = type === 'usuario' ? userNav : techNav
  const current = nav.find(n => location.pathname.startsWith(n.path))
  const pageTitle = current?.label || (type === 'usuario' ? 'Manual de Usuario' : 'Manual Técnico')

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f8fa]">
      <Sidebar
        type={type}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={pageTitle} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
