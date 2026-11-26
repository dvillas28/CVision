# CVision

CVision es una plataforma web para crear, editar, guardar y optimizar curriculums profesionales compatibles con ATS, orientada a estudiantes proximos a egresar y recien titulados en Chile.

El proyecto esta organizado como un monorepo con una aplicacion React/Vite en el frontend y una API REST Node.js/Express en el backend. El backend persiste usuarios, sesiones, CVs y datos asociados en PostgreSQL mediante Prisma, y expone integraciones de IA con Gemini para mejorar campos y analizar CVs.

## Estructura

```txt
CVision/
├── frontend/   # React + Vite + TailwindCSS
├── backend/    # API Node.js + Express + Prisma
└── docker-compose*.yml
```

## Requisitos

- Docker Engine
- Docker Compose v2

## Levantar todo con Docker Compose

### Desarrollo

Levanta Postgres, ejecuta migraciones Prisma y deja frontend + backend en modo hot reload.

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Servicios expuestos:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Healthcheck backend: `http://localhost:4000/api/health`
- Postgres: `localhost:5433`

### Producción-like

Compila el frontend y lo sirve con Nginx; el backend queda detrás del proxy `/api`.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

Servicios expuestos:
- Frontend + API proxy: `http://localhost:8080`
- Healthcheck backend por proxy: `http://localhost:8080/api/health`

## Variables de entorno

- `backend/.env` contiene secretos y configuración base del backend.
- En Docker Compose, `DATABASE_URL`, `PORT` y `CORS_ORIGIN` se sobreescriben según el entorno.
- `frontend/.env.example` sigue siendo útil si quieres correr el frontend fuera de Docker.

## Ejecución local sin Docker

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Despliegue gratuito (Render + Neon)

El archivo [`render.yaml`](render.yaml) es un Blueprint de Render que crea el Project `cvision` (entorno `production`) con dos servicios:

- `cvision-api`: Web Service gratuito de Node (`backend/`). Las migraciones corren en el build porque el pre-deploy command es solo de pago. Se duerme tras 15 min sin tráfico; el frontend muestra "Despertando el servidor…" mientras despierta.
- `cvision-web`: Static Site (`frontend/`) con rewrite de `/*` a `/index.html`.

La base de datos va en Neon Free (fuera de Render). Pasos:

1. Crear un proyecto en Neon en `us-west-2` (misma zona que `region: oregon`) y copiar las URLs *pooled* y *direct*.
2. En Render: **New → Blueprint**, elegir este repo y completar las variables marcadas con `sync: false`:
   - `DATABASE_URL` (pooled) y `DIRECT_URL` (direct), ambas con `?sslmode=require`.
   - `CORS_ORIGIN` = URL del sitio estático (p. ej. `https://cvision-web.onrender.com`).
   - `VITE_API_BASE_URL` = URL del backend + `/api` (p. ej. `https://cvision-api.onrender.com/api`).
   - `GEMINI_API_KEY` y, opcionalmente, `GROQ_API_KEY` como respaldo cuando Gemini responde 429 o 5xx.
3. Si Render asigna nombres con sufijo, corregir `CORS_ORIGIN` y `VITE_API_BASE_URL` y redesplegar el sitio estático (Vite resuelve la URL en build time).

Las variables `sync: false` solo se piden al crear el Blueprint; los cambios posteriores se hacen en el dashboard.

## Stack

- Frontend: React 18, Vite, TailwindCSS, React Router, react-pdf, Typst WASM.
- Backend: Node.js, Express, Prisma, PostgreSQL, JWT, Zod, Pino.
- IA: Gemini API para optimizacion de texto y analisis ATS, con Groq como respaldo opcional.

## Documentacion por Modulo

- [Backend](backend/README.md)
- [Frontend](frontend/README.md)

## Creditos

El motor de renderizado de PDF basado en YAML y Typst fue adaptado desde [github.com/kirlts/YaCV](https://github.com/kirlts/YaCV).
