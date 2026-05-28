import {
  HiOutlineRocketLaunch,
  HiOutlineCheckBadge,
  HiOutlineSquares2X2,
  HiOutlineArrowsRightLeft,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import {
  TbHome,
  TbBook2,
  TbDownload,
  TbFolderOpen,
  TbChartDots3,
  TbDatabase,
  TbApi,
} from 'react-icons/tb'

export const userNav = [
  { label: 'Primeros pasos',        path: '/usuario/primeros-pasos',       icon: HiOutlineRocketLaunch },
  { label: 'Requerimientos',        path: '/usuario/requerimientos',       icon: HiOutlineCheckBadge },
  { label: 'Interfaz general',      path: '/usuario/interfaz',             icon: HiOutlineSquares2X2 },
  { label: 'Flujo principal',       path: '/usuario/flujo',                icon: HiOutlineArrowsRightLeft },
  { label: 'Solución de problemas', path: '/usuario/solucion-problemas',   icon: HiOutlineWrenchScrewdriver },
]

export const techNav = [
  { label: 'Inicio',                path: '/tecnico/inicio',               icon: TbHome  },
  { label: 'Introducción',          path: '/tecnico/introduccion',         icon: TbBook2 },
  { label: 'Instalación',           path: '/tecnico/instalacion',          icon: TbDownload },
  { label: 'Estructura del proyecto', path: '/tecnico/estructura',         icon: TbFolderOpen },
  { label: 'Diagramas',             path: '/tecnico/diagramas',            icon: TbChartDots3 },
  { label: 'Base de datos',         path: '/tecnico/base-de-datos',        icon: TbDatabase },
  { label: 'API / Endpoints',       path: '/tecnico/api',                  icon: TbApi },
]
