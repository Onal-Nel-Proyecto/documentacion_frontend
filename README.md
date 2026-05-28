# Onal&Nel — Documentación Técnica

Sistema de gestión web para **Confecciones ONA & NEL**, desarrollado para optimizar y digitalizar los procesos administrativos y operativos de la empresa. La plataforma permite gestionar clientes, pedidos, pagos, inventario, proveedores y reportes de ventas desde un entorno centralizado.

Este repositorio contiene el **frontend de documentación técnica** del proyecto, construido con React + Vite + Tailwind CSS.

---

## Tecnologías

| Tecnología     | Versión | Descripción                          |
| -------------- | ------- | ------------------------------------ |
| React          | ^19     | Biblioteca de interfaz de usuario    |
| Vite           | ^8      | Bundler y entorno de desarrollo      |
| Tailwind CSS   | ^4      | Framework de estilos utilitario      |
| React Router   | ^7      | Enrutamiento SPA                     |
| React Icons    | ^5      | Librería de iconos (Heroicons, Tabler) |

---

## Estructura del Frontend

```txt
src/
├── assets/            # Recursos estáticos (imágenes, SVG)
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/        # Componentes reutilizables
│   ├── Header.jsx     # Barra superior
│   ├── Sidebar.jsx    # Menú lateral dinámico
│   └── WIP.jsx        # Placeholder para páginas en desarrollo
├── layouts/
│   └── DocLayout.jsx  # Layout principal con sidebar + header
├── pages/
│   ├── Landing.jsx    # Página de inicio /
│   ├── tech/          # Manual Técnico
│   │   ├── Inicio.jsx         # Presentación del proyecto
│   │   ├── Introduccion.jsx   # Descripción, empresa, objetivos
│   │   ├── Instalacion.jsx    # Guía de instalación
│   │   └── Estructura.jsx     # Estructura del proyecto
│   └── user/          # Manual de Usuario
│       └── PrimerosPasos.jsx
├── routes/
│   ├── AppRouter.jsx  # Configuración de rutas
│   └── navConfig.jsx  # Configuración del menú de navegación
├── App.css
├── App.jsx
├── index.css          # Estilos globales + Tailwind
└── main.jsx           # Punto de entrada
```

---

## Instalación

### Requisitos

- Node.js >= 18
- pnpm (recomendado) o npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

# 2. Instalar dependencias
pnpm install
# o con npm:
npm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
# o:
npm run dev
```

El servidor se iniciará en **http://localhost:5173**.

---

## Scripts Disponibles

| Comando           | Descripción                            |
| ----------------- | -------------------------------------- |
| `pnpm dev`        | Inicia el servidor de desarrollo       |
| `pnpm build`      | Genera build de producción en `dist/`  |
| `pnpm preview`    | Previsualiza el build de producción    |
| `pnpm lint`       | Ejecuta ESLint sobre el código         |

---

## Dependencias

### Producción

| Paquete            | Propósito                             |
| ------------------ | ------------------------------------- |
| `react`            | Biblioteca principal de UI            |
| `react-dom`        | Renderizado DOM                       |
| `react-router-dom` | Enrutamiento SPA                      |
| `react-icons`      | Iconos (Heroicons, Tabler Icons)      |
| `tailwindcss`      | Framework CSS utilitario              |
| `@tailwindcss/vite`| Plugin de Tailwind para Vite          |

### Desarrollo

| Paquete                       | Propósito                          |
| ----------------------------- | ---------------------------------- |
| `vite`                        | Bundler y dev server               |
| `@vitejs/plugin-react`        | Plugin de React para Vite          |
| `eslint`                      | Linter de código                   |
| `eslint-plugin-react-hooks`   | Reglas ESLint para React Hooks     |
| `eslint-plugin-react-refresh` | Reglas ESLint para React Refresh   |

---

## Rutas

| Ruta                     | Página             | Descripción                           |
| ------------------------ | ------------------ | ------------------------------------- |
| `/`                      | Landing            | Página de inicio del sitio            |
| `/tecnico`               | —                  | Redirige a `/tecnico/inicio`          |
| `/tecnico/inicio`        | Inicio             | Presentación del proyecto Onal&Nel    |
| `/tecnico/introduccion`  | Introducción       | Descripción, empresa, objetivos       |
| `/tecnico/instalacion`   | Instalación        | Guía de instalación paso a paso       |
| `/tecnico/estructura`    | Estructura         | Estructura del backend y frontend     |
| `/tecnico/diagramas`     | *WIP*              | Pendiente                             |
| `/tecnico/base-de-datos` | *WIP*              | Pendiente                             |
| `/tecnico/api`           | *WIP*              | Pendiente                             |
| `/usuario`               | —                  | Redirige a `/usuario/primeros-pasos`  |
| `/usuario/primeros-pasos`| Primeros Pasos     | Guía inicial para usuarios            |
| `/usuario/requerimientos`| *WIP*              | Pendiente                             |
| `/usuario/interfaz`      | *WIP*              | Pendiente                             |
| `/usuario/flujo`         | *WIP*              | Pendiente                             |
| `/usuario/solucion-problemas` | *WIP*         | Pendiente                             |

---

## Convenciones

- **Iconos:** Se usan `react-icons/hi2` (Heroicons) y `react-icons/tb` (Tabler Icons).
- **Estilos:** Tailwind CSS v4 con clases utilitarias — sin CSS personalizado salvo animaciones de entrada (`.page-enter`) y estilos base en `index.css`.
- **Rutas:** Definidas en `src/routes/AppRouter.jsx`, navegación configurada en `src/routes/navConfig.jsx`.
- **Layout:** `DocLayout` proporciona el sidebar + header para todas las páginas de documentación.

---

## Licencia

Este proyecto es de uso interno de **Confecciones ONA & NEL**.
