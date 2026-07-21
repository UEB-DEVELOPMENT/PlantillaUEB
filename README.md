# UEB - Plantilla Institucional

Plantilla institucional de la **Universidad Estatal de Bolívar** construida con Next.js y Tailwind CSS, adaptada para uso administrativo y académico.

## Colores institucionales

- Azul: `#0b283f` (brand-500)
- Rojo: `#a51c1c` (error-500)
- Blanco: `#ffffff`

## Tecnologías

- **Next.js 16** — Framework React con renderizado estático
- **React 19** — Biblioteca UI
- **TypeScript** — Tipado estático
- **Tailwind CSS v4** — Estilos utilitarios
- **ApexCharts** — Gráficos interactivos
- **FullCalendar** — Calendario
- **Flatpickr** — Selectores de fecha
- **Swiper** — Carruseles
- **react-dropzone** — Carga de archivos

## Traducción

El componente de traducción usa **GTranslate.net** (widget `dwf.js`) para cambiar entre idiomas. Idiomas disponibles:

- Español, English, Français, Português, Italiano, 简体中文

El botón de idioma se encuentra en el header, con un menú desplegable estilizado que coincide con el diseño de la plantilla.

## Páginas incluidas

- **Dashboard** — Panel principal con métricas y gráficos
- **Autenticación** — Inicio de sesión y registro
- **Tablas** — Tabla básica con datos de ejemplo
- **Formularios** — Elementos de formulario (inputs, selects, checkboxes, etc.)
- **Gráficos** — Gráficos de barras y líneas
- **Calendario** — Calendario interactivo FullCalendar
- **Perfil** — Perfil de usuario
- **Elementos UI** — Alertas, botones, insignias, avatares, imágenes, videos, modales
- **Página 404** — Página de error personalizada
- **Página en blanco** — Plantilla para contenido nuevo

## Estructura del proyecto

```
src/
├── app/              # Páginas y layouts
├── components/       # Componentes reutilizables
├── context/          # Contextos React (sidebar, tema)
└── layout/           # Layout principal (sidebar, header)
```

## Instalación

```bash
npm install
npm run dev
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
