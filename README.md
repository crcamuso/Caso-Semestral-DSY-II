# Gas El Volcán — Tienda online (Evaluación 2)

Frontend de la tienda online de la Distribuidora de Gas El Volcán (Chillán): catálogo, carrito, checkout simulado y panel de administración. Proyecto académico DSY1104, Evaluación 2.

No tiene backend: los datos se simulan en `frontend/src/data/db.js`, se manejan con servicios CRUD y se guardan en `localStorage`, así que sobreviven a recargar la página.

## Tecnologías

- React con Vite
- React Router (rutas de la tienda y del panel administrador)
- Bootstrap (diseño responsivo)
- Context API y `localStorage` (productos, sesión y carrito)
- Jasmine y Karma (pruebas unitarias)

## Requisitos

- Node.js en una versión LTS reciente (comprueba con `node -v`)
- Google Chrome o Microsoft Edge (solo para correr las pruebas)

## Instalación

```bash
git clone https://github.com/crcamuso/Caso-Semestral-DSY-II.git
cd Caso-Semestral-DSY-II/frontend
npm install
npm run dev
```

Abre la dirección que muestre Vite (normalmente `http://localhost:5173`).

## Scripts

Se ejecutan desde la carpeta `frontend/`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve la versión de producción. |
| `npm run lint` | Revisa el código con ESLint. |
| `npm test` | Corre las pruebas Jasmine con Karma y lista cada una. |
| `npm run test:coverage` | Corre las pruebas y mide la cobertura. |

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@duoc.cl` | `admin123` |
| Cliente | `vendedor@duoc.cl` | `vend1234` |
| Cliente | `camila@gmail.com` | `cliente123` |

El panel de administrador está en `/admin` y solo abre con el rol administrador. Para volver a los datos iniciales, borra las claves `gasvolcan_v2_*` en las herramientas del navegador (Application, Local Storage).

## Funcionalidades

**Tienda:** home con carrusel, productos con búsqueda, filtros y orden por precio, detalle de producto, categorías, ofertas, carrito con control de stock, registro e inicio de sesión con validación en tiempo real, checkout con región y comuna, pago correcto o con error (simulado) con boleta imprimible, nosotros, contacto y blogs.

**Panel de administrador:** dashboard con métricas y productos con stock crítico, y CRUD de productos con confirmación antes de eliminar.

**En desarrollo:** órdenes y boletas, categorías, usuarios, reportes y perfil del administrador.

## Estructura del repositorio

```
Caso-Semestral-DSY-II/
├── frontend/                Proyecto React (Evaluación 2)
│   ├── src/
│   │   ├── components/      Piezas reutilizables (admin, carrito, common, formularios, ...)
│   │   ├── pages/           Vistas: tienda/ y admin/
│   │   ├── layouts/         TiendaLayout y AdminLayout
│   │   ├── routes/          AppRouter y guard RutaAdmin
│   │   ├── context/         Providers de productos, sesión y carrito
│   │   ├── hooks/           useProducts, useAuth, useCart, useForm, ...
│   │   ├── services/        CRUD sobre los datos simulados
│   │   ├── data/            db.js y regiones.js
│   │   ├── utils/           Validaciones, formato y ayudas
│   │   └── tests/           Pruebas Jasmine
│   └── karma.conf.cjs       Configuración de Karma
├── docs/                    ERS V2, guion de la presentación y cobertura del testing
└── gasvolcan/               Sitio HTML de la Evaluación 1 (solo referencia)
```

## Pruebas

La suite tiene 38 pruebas (renderizado, props, estado y eventos). El detalle de cada caso y la cobertura están en [docs/cobertura-testing.md](docs/cobertura-testing.md).

## Documentación

- [ERS V2](docs/ERS-V2.md)
- [Cobertura del testing](docs/cobertura-testing.md)
- [Guion de la presentación](docs/guion-presentacion.md)

## Flujo de trabajo

Cada tarjeta del tablero de Trello se trabaja en su propia rama (`feature/tarjeta-NN-nombre`) y se integra a `main` mediante un Pull Request. Los mensajes de commit describen el cambio en español.

## Integrantes

- Cristopher Camus — panel de administrador, pruebas y GitHub
- Leonardo Mansilla — tienda, formularios y documentación
