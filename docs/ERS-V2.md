# Especificación de Requerimientos de Software (ERS) — Versión 2

**Proyecto:** Tienda online Distribuidora de Gas El Volcán · **Curso:** DSY1104 – Desarrollo FullStack II · **Evaluación 2**
**Repositorio:** https://github.com/crcamuso/Caso-Semestral-DSY-II · **Integrantes:** Cristopher y Leo

## 1. Introducción y alcance

### 1.1 Propósito
Este documento describe los requerimientos de la V2 de la tienda online de Gas El Volcán. Reemplaza a la V1 (sitio estático en HTML, CSS y JavaScript) por una aplicación React que separa la tienda pública del panel de administración.

### 1.2 Alcance
La aplicación permite a un cliente revisar el catálogo de gas licuado y accesorios, registrarse, armar un carrito, ingresar su dirección de despacho y simular el pago, obteniendo una boleta. El administrador gestiona productos, categorías, usuarios, órdenes y reportes.

Quedan fuera de esta versión: backend real (Spring Boot), base de datos (MySQL), pasarela de pago real y envío real de correos. Los datos se simulan con un archivo JS y `localStorage`.

## 2. Descripción general

| Elemento | Detalle |
|---|---|
| Zonas | Tienda pública (`/`) y panel de administrador (`/admin`, protegido por rol) |
| Datos | `src/data/db.js` (datos iniciales) + `services/` (CRUD) + `localStorage` |
| Estado global | Context: `AuthContext`, `ProductsContext`, `CartContext` con hooks `useAuth`, `useProducts`, `useCart` |
| Usuarios | Cliente (compra) y Administrador (gestiona) |
| Cuentas de prueba | `admin@duoc.cl` / `admin123` (admin) · `camila@gmail.com` / `cliente123` (cliente) |

## 3. Requerimientos funcionales

### 3.1 Tienda

| ID | Vista (ruta) | Requerimiento |
|---|---|---|
| RF-01 | Home (`/`) | Carrusel de 3 slides, categorías destacadas y productos en oferta tomados del contexto. |
| RF-02 | Productos (`/productos`) | Grilla responsiva de productos con botón Añadir. |
| RF-03 | Detalle de producto (`/productos/:id`) | Muestra imagen, descripción, precio (con oferta), stock y agrega al carrito con cantidad. Informa si el producto no existe. |
| RF-04 | Categorías (`/categorias`, `/categorias/:id`) | Fila de categorías y productos de la categoría elegida; mensaje si no tiene productos. |
| RF-05 | Ofertas (`/ofertas`) | Lista solo productos con oferta mostrando el precio original tachado. |
| RF-06 | Registro (`/registro`) | Formulario con nombre, apellidos, correo, contraseña, repetir contraseña y dirección opcional, con validación en tiempo real. Crea un cliente y abre sesión. |
| RF-07 | Inicio de sesión (`/login`) | Valida credenciales; el administrador es redirigido a `/admin`. La sesión se guarda en `localStorage`. |
| RF-08 | Nosotros (`/nosotros`) | Historia, misión, equipo y zonas de despacho. |
| RF-09 | Contacto (`/contacto`) | Formulario (nombre, correo, mensaje) con validación y mensaje de confirmación. |
| RF-10 | Blogs (`/blog`, `/blog/:id`) | Listado y detalle de los artículos 1 y 2. |
| RF-11 | Carrito (`/carrito`) | Lista de productos y tabla del carrito con cantidad editable, subtotal, eliminar, limpiar y total en tiempo real. Respeta el stock. |
| RF-12 | Checkout (`/checkout`) | Resumen, datos del cliente y dirección (región y comuna dependiente). Autocompleta si hay sesión. Crea la orden y simula el pago. |
| RF-13 | Pago correcto (`/pago-correcto`) | Número de orden, datos en solo lectura, detalle y total. Imprimir boleta (PDF) y enviar por email (simulado). Limpia el carrito. |
| RF-14 | Pago con error (`/pago-error`) | Mensaje de error, número de orden y detalle. Permite reintentar conservando carrito y datos. |
| RF-15 | Búsqueda y filtros | Buscador del navbar por nombre; filtros por categoría, rango de precio y solo ofertas; orden por precio. |
| RF-16 | Navegación | Breadcrumbs en la tienda y botón de volver arriba. |

### 3.2 Administrador

| ID | Vista (ruta) | Requerimiento | Estado |
|---|---|---|---|
| RF-20 | Dashboard (`/admin`) | Métricas y accesos rápidos. | Ruta y guard listos; vista en desarrollo |
| RF-21 | Órdenes y boleta (`/admin/ordenes`, `/admin/ordenes/:id`) | Listado de órdenes y detalle reutilizando `ResumenOrden`. | En desarrollo |
| RF-22 | Productos (`/admin/productos…`) | CRUD, críticos y reportes. | En desarrollo |
| RF-23 | Categorías (`/admin/categorias…`) | CRUD; no permite borrar categorías con productos. | En desarrollo (regla ya en `categoryService`) |
| RF-24 | Usuarios (`/admin/usuarios…`) | CRUD e historial de compras. | En desarrollo |
| RF-25 | Reportes y perfil | Reportes generales y edición del perfil. | En desarrollo |

## 4. Requerimientos no funcionales

| ID | Categoría | Requerimiento |
|---|---|---|
| RNF-01 | Usabilidad / responsivo | La interfaz se adapta a móvil, tablet y escritorio con Bootstrap 5 (grilla, navbar colapsable, tablas responsivas). |
| RNF-02 | Mantenibilidad | Un componente = una responsabilidad; nombres descriptivos; datos por props; estado propio solo cuando hace falta; JSX dividido en componentes pequeños. |
| RNF-03 | Persistencia | Los datos, el carrito y la sesión sobreviven a recargar la página (`localStorage`). |
| RNF-04 | Validación | Los formularios validan en tiempo real y los services validan de nuevo antes de guardar. |
| RNF-05 | Pruebas | Pruebas unitarias con Jasmine y Karma (renderizado, props, estado y eventos). |
| RNF-06 | Accesibilidad básica | Etiquetas asociadas a campos, `aria-label` en controles sin texto y mensajes de error anunciados. |
| RNF-07 | Impresión | La boleta se imprime sin navbar, footer ni botones. |

## 5. Herramientas y tecnologías

React 19 · Vite · React Router · Bootstrap 5 · PropTypes · Jasmine y Karma (pruebas) · ESLint · Git y GitHub (ramas `feature/tarjeta-XX` y Pull Requests) · Trello (tablero de tareas).

## 6. Historial de cambios respecto de la V1

| Aspecto | V1 | V2 |
|---|---|---|
| Tecnología | HTML, CSS y JavaScript estáticos | React + Vite + React Router + Bootstrap |
| Páginas | Archivos `.html` separados | Componentes y rutas; layouts de tienda y admin |
| Datos | Arreglos y `localStorage` sueltos | `db.js` + services CRUD + Context |
| Validación | Scripts por página | Hook `useForm` y utilidades de validación reutilizables |
| Compra | Carrito simple | Carrito con stock, checkout con región/comuna, orden, pago simulado y boleta imprimible |
| Navegación | Menú fijo | Buscador, filtros, breadcrumbs y botón volver arriba |
| Administración | Páginas básicas | Zona `/admin` protegida por rol |
| Pruebas | No había | Jasmine y Karma |

## 7. Matriz de trazabilidad

| Requerimiento | Vista / ruta | Componente principal | Tarjeta Trello |
|---|---|---|---|
| RF-01 | `/` | `pages/tienda/Home` | [Tienda] Home |
| RF-02, RF-03 | `/productos`, `/productos/:id` | `Productos`, `DetalleProducto`, `ListaProductos` | [Tienda] Productos y Detalle de producto |
| RF-04 | `/categorias`, `/categorias/:id` | `Categorias`, `Categoria`, `FilaCategorias` | [Tienda] Categorías y Categoría #1 |
| RF-05 | `/ofertas` | `Ofertas` | [Tienda] Ofertas |
| RF-06, RF-07 | `/registro`, `/login` | `FormularioRegistro`, `FormularioLogin`, `AuthProvider` | [Tienda] Registro de usuario e Iniciar sesión |
| RF-08, RF-09 | `/nosotros`, `/contacto` | `Nosotros`, `FormularioContacto` | [Tienda] Nosotros y Contacto |
| RF-10 | `/blog`, `/blog/:id` | `Blogs`, `DetalleBlog`, `TarjetaBlog` | [Tienda] Blogs y Detalle de blog |
| RF-11 | `/carrito` | `Carrito`, `TablaCarrito`, `CartProvider` | [Compra] Carrito de compra |
| RF-12 | `/checkout` | `Checkout`, `FormularioEntrega`, `pagoService` | [Compra] Checkout |
| RF-13 | `/pago-correcto` | `PagoCorrecto`, `ResumenOrden` | [Compra] Pago correcto |
| RF-14 | `/pago-error` | `PagoError`, `ResumenOrden` | [Compra] Pago con error |
| RF-15, RF-16 | Toda la tienda | `FiltrosProductos`, `filtrosProductos.js`, `Breadcrumbs`, `BotonVolverArriba`, `useForm` | [Interactividad] Formularios avanzados, filtros y navegación |
| RF-20 a RF-25 | `/admin/*` | `AdminLayout`, páginas de `pages/admin` | Tarjetas de Administrador |
