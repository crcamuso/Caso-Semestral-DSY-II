# Distribuidora de Gas El Volcán — Tienda en línea (Entrega 1, DSY1104)

Proyecto Frontend en **HTML5, CSS3 y JavaScript** (sin frameworks ni backend),
desarrollado sobre el caso de estudio **Forma C: Distribuidora de Gas El
Volcán**, cumpliendo los requisitos del Anexo 1 de la Evaluación 1.

> Nota: el documento "Forma C" describe la solución completa del semestre
> (React + Spring Boot + MySQL + AWS). Esta entrega 1 solo exige HTML, CSS y
> JavaScript puro (ver Anexo 1), por lo que aquí se construyó la propuesta de
> **frontend estático** con el contexto de negocio de Gas El Volcán. La
> autenticación y los roles se **simulan con `localStorage`**, ya que el
> backend con Spring Boot y la base de datos MySQL corresponden a entregas
> posteriores del proyecto.

## Cómo abrir el proyecto

1. Descomprime el archivo.
2. Abre `index.html` con doble clic (funciona sin servidor, solo con el
   navegador) o, mejor aún, sírvelo con una extensión tipo "Live Server" para
   evitar restricciones del navegador con `localStorage`.
3. Todo el catálogo, los usuarios y el carrito se guardan en `localStorage`,
   por lo que persisten al recargar la página (bórralos desde las
   herramientas de desarrollador si quieres reiniciar los datos de prueba).

## Cuentas de prueba

| Rol            | Correo               | Contraseña |
|----------------|-----------------------|------------|
| Administrador  | admin@duoc.cl          | admin123   |
| Vendedor       | vendedor@duoc.cl       | vend1234   |

Cualquier persona puede registrarse desde `registro.html`; los usuarios
nuevos quedan con rol **Cliente**.

## Estructura del proyecto

```
gasvolcan/
├── index.html              Página principal (Home)
├── productos.html          Listado de productos con filtro por categoría
├── detalle-producto.html   Detalle + carrito (lee ?codigo= por URL)
├── registro.html           Registro de usuario (rol Cliente)
├── login.html               Inicio de sesión
├── nosotros.html            Sobre la empresa + zonas de despacho
├── blogs.html                Noticias / casos curiosos
├── blog-detalle-1.html       Detalle: elegir el cilindro correcto
├── blog-detalle-2.html       Detalle: seguridad en el uso del gas
├── contacto.html             Formulario de contacto
├── carrito.html               Carrito de compras (localStorage)
├── css/estilos.css            Hoja de estilos general
├── css/admin.css              Estilos del panel administrador
├── js/datos-productos.js      Arreglo de productos + persistencia
├── js/datos-usuarios.js       Usuarios y sesión simulada
├── js/datos-regiones.js       Regiones/comunas (select dependiente)
├── js/carrito.js               Lógica del carrito de compras
├── js/validaciones.js          Validaciones reutilizables
├── js/nav.js                    Menú responsivo + estado de sesión
└── admin/
    ├── index.html                Dashboard (home administrador)
    ├── productos.html             Listado de productos (mantenedor)
    ├── producto-form.html         Nuevo / editar producto
    ├── usuarios.html               Listado de usuarios (solo Administrador)
    ├── usuario-form.html           Nuevo / editar usuario (solo Administrador)
    └── js/admin-comun.js           Protección de rutas por rol + menú lateral
```

## Roles implementados (control de acceso simulado)

- **Administrador**: acceso total al panel (productos y usuarios).
- **Vendedor**: solo puede *ver* el listado de productos; no ve el menú de
  usuarios ni los botones de crear/editar/eliminar.
- **Cliente**: solo puede navegar y comprar en la tienda pública; si intenta
  entrar a `/admin` sin sesión válida, es redirigido a `login.html`.

## Validaciones de JavaScript implementadas

- **Inicio de sesión**: correo obligatorio (máx. 100 caract., solo dominios
  `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`); contraseña obligatoria
  (4 a 10 caracteres).
- **Contacto**: nombre obligatorio (máx. 100); correo opcional pero con
  dominio válido si se ingresa; comentario obligatorio (máx. 500).
- **Registro / mantenedor de usuario**: RUN obligatorio y validado con
  dígito verificador (sin puntos ni guion, 7 a 9 caracteres), nombre
  (máx. 50), apellidos (máx. 100), correo (dominios permitidos, único),
  contraseña (4 a 10), región/comuna dependientes, dirección (máx. 300).
- **Mantenedor de producto**: código (mín. 3, único), nombre (máx. 100),
  descripción opcional (máx. 500), precio decimal (mín. 0), stock entero
  (mín. 0), stock crítico opcional con alerta visual cuando el stock
  disponible es igual o inferior a ese valor, categoría obligatoria.
- **Carrito de compras**: no permite añadir más unidades que el stock
  disponible; persiste en `localStorage`; incluye cupón de descuento de
  demostración (`GASVOLCAN10`).

## Diseño responsivo

Probado en tres tamaños de referencia: 360 px (menú hamburguesa), 768 px
(rejilla de 2–3 columnas) y 1280 px (rejilla completa / panel con menú
lateral fijo). Todo el layout usa CSS Grid/Flexbox con `@media queries`.

## Pendiente para próximas entregas (fuera del alcance de esta entrega 1)

- Backend real con microservicios Spring Boot y base de datos MySQL.
- Autenticación con tokens y cifrado real de contraseñas.
- Módulo de pedidos/despacho y mapa interactivo (Leaflet/Google Maps).
- Despliegue en AWS con Docker.
