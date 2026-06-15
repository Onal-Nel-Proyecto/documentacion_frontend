import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from '../pages/Landing'
import DocLayout from '../layouts/DocLayout'
import PrimerosPasos from '../pages/user/PrimerosPasos'
import Requerimientos from '../pages/user/Requerimientos'
import Interfaz from '../pages/user/Interfaz'
import InterfazModulo from '../pages/user/InterfazModulo'
import SolucionProblemas from '../pages/user/SolucionProblemas'
import Inicio from '../pages/tech/Inicio'
import Introduccion from '../pages/tech/Introduccion'
import Instalacion from '../pages/tech/Instalacion'
import Estructura from '../pages/tech/Estructura'
import Diagramas from '../pages/tech/Diagramas'
import DiagramaDetalle from '../pages/tech/DiagramaDetalle'
import BaseDeDatos from '../pages/tech/BaseDeDatos'
import Api from '../pages/tech/Api'
import WIP from '../components/WIP'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* User Manual */}
        <Route path="/usuario" element={<DocLayout type="usuario" />}>
          <Route index element={<Navigate to="primeros-pasos" replace />} />
          <Route path="primeros-pasos" element={<PrimerosPasos />} />
          <Route path="requerimientos"      element={<Requerimientos />} />
          <Route path="interfaz"                 element={<Interfaz />} />
          <Route path="interfaz/:modulo"       element={<InterfazModulo />} />
          <Route path="flujo"               element={<WIP title="Flujo principal" />} />
          <Route path="solucion-problemas"  element={<SolucionProblemas />} />
        </Route>

        {/* Tech Manual */}
        <Route path="/tecnico" element={<DocLayout type="tecnico" />}>
          <Route index element={<Navigate to="inicio" replace />} />
          <Route path="inicio"  element={<Inicio />} />
          <Route path="introduccion"  element={<Introduccion />} />
          <Route path="instalacion"   element={<Instalacion />} />
          <Route path="estructura"    element={<Estructura />} />
          <Route path="diagramas"              element={<Diagramas />} />
          <Route path="diagramas/:diagrama"       element={<DiagramaDetalle />} />
          <Route path="base-de-datos"         element={<BaseDeDatos />} />
          <Route path="api" element={<Api />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
