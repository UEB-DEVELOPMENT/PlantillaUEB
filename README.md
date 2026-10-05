# UEB - Plantilla Institucional

![Plantilla UEB](./Plantilla.png)

Plantilla institucional de la **Universidad Estatal de Bolívar** construida con Next.js, Tailwind CSS y el **[UEB Design System](https://ueb-design-system-v2.pages.dev/?path=/docs/overview--docs)** (`@ueb-development/ui-core`).

## ⚡ Inicio rápido

El paquete `@ueb-development/ui-core` se publica en **GitHub Packages**, así que antes de instalar crea un archivo `.npmrc` en la raíz del proyecto (ya está en `.gitignore`, no lo subas) con un token de GitHub que tenga el permiso `read:packages`:

```ini
@ueb-development:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=TU_TOKEN_DE_GITHUB
```

Después:

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

> **¿El navegador muestra "Gotenberg has no UI, it's an API" u otra aplicación?** Si el puerto 3000 está ocupado, Next.js salta solo al siguiente (3001, 3002…). Revisa en la consola la URL que imprime `npm run dev`. Ese puerto puede estar publicado también por un contenedor Docker solo en IPv4 (`127.0.0.1:PUERTO`). Next escucha en IPv6 y no detecta el conflicto, pero el navegador resuelve `localhost` a `127.0.0.1` y abre el contenedor. Para evitarlo, elige un puerto libre de forma explícita:
>
> ```bash
> npm run dev -- -p 3010
> ```
>
> Para ver qué ocupa cada puerto: `docker ps --format "table {{.Names}}\t{{.Ports}}"`.

## 📦 Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |

## 🧩 UEB Design System

Todos los componentes de interfaz (botones, inputs, select, dropdowns, diálogos, sidebar, navbar, tablas, etc.) provienen de `@ueb-development/ui-core`. La documentación visual de cada componente está en el **[Storybook del Design System](https://ueb-design-system-v2.pages.dev/?path=/docs/overview--docs)**.

```tsx
import { Button } from "@ueb-development/ui-core/components/button";
import { Sidebar } from "@ueb-development/ui-core/components/sidebar";
```

- **Estilos y tema:** `src/app/globals.css` importa `@ueb-development/ui-core/globals.css`, que ya incluye Tailwind CSS, los tokens de color institucionales (claro y oscuro), las fuentes (Outfit) y las utilidades que usan los componentes. Usa los tokens semánticos (`bg-primary`, `text-muted-foreground`, `bg-navbar`, `border-border`…) en lugar de colores fijos.
- **Primitivas Base UI:** los componentes están construidos sobre [Base UI](https://base-ui.com/). Para que un componente se renderice como otro elemento se usa la prop `render`, no `asChild`:

  ```tsx
  <Button nativeButton={false} render={<Link href="/" />}>Volver al inicio</Button>

  <DropdownMenuTrigger render={<Button variant="ghost" />}>Opciones</DropdownMenuTrigger>

  <SidebarMenuButton render={<Link href="/calendar" />} tooltip="Calendario">
    <CalendarDays />
    <span>Calendario</span>
  </SidebarMenuButton>
  ```

- **Etiquetas de menú:** `DropdownMenuLabel` debe ir dentro de un `DropdownMenuGroup`.
- **Layout:** el encabezado usa `Navbar` con el nombre del sistema centrado ("Plantilla UEB", en la tipografía de marca `font-brand`), y el menú lateral sigue el patrón *Collapsible Icon* del DS: `Sidebar` con `collapsible="icon"`, cabecera con el escudo (visible también colapsado), grupos separados con `SidebarSeparator` y footer con Soporte y Cerrar sesión.
- **Accesibilidad:** `src/app/layout.tsx` envuelve la aplicación en `AccesibilityProvider` y muestra `AccesibilityToolbar` (abajo a la derecha). Desde ahí se ajusta el tamaño de texto, los temas para daltonismo y alto contraste, la fuente legible, el espaciado de texto y la lectura en voz alta. `Alt+J` abre el menú.

## 🎨 Paleta de colores

Los colores los define el Design System. Los principales son:

| Color | Token | Código | Uso |
|-------|-------|--------|-----|
| Azul institucional | `--primary` / `--navbar` / `--sidebar` | `#0b283f` | Barra superior, sidebar, botones principales |
| Rojo institucional | `--navbar-border` | `#6f1715` | Borde inferior de la barra superior |
| Fondo de página | `--background` | `oklch(0.99 0.002 254.7)` | Área de contenido |

## 🧱 Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| Next.js 16 | Framework React |
| React 19 | Biblioteca UI |
| TypeScript | Tipado estático |
| Tailwind CSS v4 | Estilos utilitarios |
| `@ueb-development/ui-core` | Componentes y tema del UEB Design System |
| TanStack Table | Tablas de datos |
| ApexCharts | Gráficos interactivos |
| FullCalendar | Calendario |
| Flatpickr | Selectores de fecha |
| Swiper | Carruseles |
| react-dropzone | Carga de archivos |

## 🗄️ Backend

Los proyectos que usen esta plantilla deben consumir un backend con este stack:

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [NestJS](https://nestjs.com/) | 11 | API REST en TypeScript |
| [Swagger / OpenAPI](https://docs.nestjs.com/openapi/introduction) (`@nestjs/swagger`) | 11 (OpenAPI 3) | Documentación interactiva y contrato de la API |
| [PostgreSQL](https://www.postgresql.org/) | **18** | Base de datos relacional |

### Convenciones

- **Prefijo de rutas:** todos los endpoints bajo `/api` (por ejemplo `GET /api/usuarios`), usando `app.setGlobalPrefix("api")`.
- **Documentación:** Swagger UI expuesto en `/api/docs` y el esquema OpenAPI en `/api/docs-json`. Cada controlador se documenta con `@ApiTags`, cada DTO con `@ApiProperty`, y los endpoints protegidos con `@ApiBearerAuth`.
- **Validación:** DTOs con `class-validator` y `ValidationPipe` global (`whitelist: true`, `transform: true`).
- **Autenticación:** JWT en la cabecera `Authorization: Bearer <token>`.
- **CORS:** habilitado para el origen del frontend (`http://localhost:3000` en desarrollo).

Ejemplo mínimo de `main.ts`:

```ts
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({ origin: process.env.FRONTEND_URL });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle("API UEB")
    .setDescription("API institucional de la Universidad Estatal de Bolívar")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("api/docs", app, () => SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
```

### Base de datos con Docker

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:18
    environment:
      POSTGRES_USER: ueb
      POSTGRES_PASSWORD: ueb
      POSTGRES_DB: ueb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql

volumes:
  pgdata:
```

> En la imagen `postgres:18` el volumen se monta en `/var/lib/postgresql` (no en `/var/lib/postgresql/data` como en versiones anteriores).

### Variables de entorno

| Proyecto | Variable | Ejemplo |
|----------|----------|---------|
| Backend (`.env`) | `DATABASE_URL` | `postgresql://ueb:ueb@localhost:5432/ueb` |
| Backend (`.env`) | `PORT` | `4000` |
| Backend (`.env`) | `FRONTEND_URL` | `http://localhost:3000` |
| Backend (`.env`) | `JWT_SECRET` | *(valor secreto)* |
| Frontend (`.env.local`) | `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api` |

### Puertos en desarrollo

| Servicio | URL |
|----------|-----|
| Frontend (esta plantilla) | `http://localhost:3000` |
| API NestJS | `http://localhost:4000/api` |
| Swagger UI | `http://localhost:4000/api/docs` |
| PostgreSQL 18 | `localhost:5432` |

## 🌐 Traducción

Usa **GTranslate.net** para cambiar entre idiomas. El botón de idioma está en el header.

**Idiomas:** Español, English, Français, Português, Italiano, 简体中文

## 📄 Páginas incluidas

- **Dashboard** — Panel principal con métricas y gráficos
- **Autenticación** — Inicio de sesión y registro
- **Tablas** — Tabla de datos con búsqueda, columnas configurables y exportación
- **Formularios** — Elementos de formulario
- **Gráficos** — Gráficos de barras y líneas
- **Calendario** — Calendario interactivo
- **Perfil** — Perfil de usuario
- **Elementos UI** — Alertas, botones, modales, etc.
- **Página 404** — Página de error personalizada
- **Página en blanco** — Plantilla base para contenido nuevo

## 📁 Estructura del proyecto

```
src/
├── app/              # Páginas y layouts (App Router)
├── components/       # Componentes de la plantilla (envuelven ui-core)
├── context/          # Contextos React (tema)
├── hooks/            # Hooks reutilizables
├── icons/            # Iconos SVG (importados como componentes con SVGR)
└── layout/           # Layout principal (AppSidebar, AppHeader)
```
