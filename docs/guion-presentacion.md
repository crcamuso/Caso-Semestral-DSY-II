# Guion de presentación — GasVolcan (15 min + 5 min de preguntas)

## Reparto
- **Leo:** flujo cliente (registro, producto, carrito, checkout, boleta) y componentes de la tienda.
- **Cristopher:** flujo admin (CRUD, reportes), pruebas Jasmine/Karma y GitHub.

## Minuto a minuto
| Min | Quién | Qué mostrar |
|---|---|---|
| 0–1 | Ambos | Presentación del proyecto: tienda de gas licuado en Chillán; V1 estática vs V2 en React. |
| 1–3 | Cristopher | Arquitectura: carpetas (`components`, `pages`, `layouts`, `context`, `services`, `data`), rutas y layouts tienda/admin, guard de admin. |
| 3–5 | Leo | Datos y persistencia: `db.js` → services CRUD → Context → `localStorage`. Mostrar que recargar no pierde datos. |
| 5–6 | Leo | Home, categorías, ofertas, buscador del navbar y filtros/orden en productos. |
| 6–7 | Leo | Registro con validación en tiempo real (`useForm`) e inicio de sesión. |
| 7–10 | Leo | Demo de compra: detalle de producto → carrito (cantidad, stock) → checkout (región/comuna) → pago correcto → boleta imprimible. |
| 10–11 | Leo | Pago con error: reintentar conservando carrito y datos (selector de simulación en checkout). |
| 11–13 | Cristopher | Demo admin: iniciar sesión como `admin@duoc.cl`, CRUD de productos/categorías/usuarios, críticos y reportes. |
| 13–14 | Cristopher | Pruebas Jasmine/Karma: qué se prueba (render, props, estado, eventos) y resultado de `npm test`. |
| 14–15 | Ambos | GitHub: ramas por tarjeta, Pull Requests, commits por integrante. Cierre. |

## Preparación de la demo
1. `cd frontend && npm install && npm run dev`.
2. Limpiar datos de prueba: en la consola del navegador, `localStorage.clear()` y recargar.
3. Cuentas: `admin@duoc.cl` / `admin123`; cliente `camila@gmail.com` / `cliente123`.
4. Para el pago con error, elegir «rechazado» en la simulación del checkout.

## Preguntas probables y respuestas sugeridas
1. **¿Por qué `ProductCard` no lee el contexto?** Es presentacional: recibe todo por props, así se reutiliza en Home, Productos, Categoría y Ofertas, y es fácil de probar.
2. **¿Qué es `ListaProductos`?** La grilla que mapea productos a `ProductCard`; evita repetir el mismo bloque en cuatro vistas.
3. **¿Cómo persisten los datos?** Los services leen y escriben en `localStorage` partiendo de `db.js`; los Context vuelven a leer tras cada cambio para actualizar la UI.
4. **¿Por qué Context y no Redux?** Son tres estados simples (productos, sesión, carrito); Context basta y no agrega dependencias.
5. **¿Cómo se respeta el stock?** `CartProvider` valida al agregar y al cambiar cantidad, y ajusta las cantidades al stock vigente.
6. **¿Cuándo se descuenta el stock?** Solo cuando el pago es aprobado, justo después de crear la orden.
7. **¿Qué hace `useForm`?** Guarda valores, calcula errores con una función `validar` y muestra el error solo si el campo fue tocado.
8. **¿Cómo funciona región → comuna?** Al cambiar la región se limpia la comuna y el select de comunas se llena con `comunasDeRegion`.
9. **¿Cómo se simula el pago?** `pagoService.simularPago` devuelve aprobado o rechazado; en el checkout hay un selector para la demo.
10. **¿Qué pasa si el pago falla?** La orden queda como «Pago fallido», no se descuenta stock y el botón de reintento vuelve al checkout con los datos.
11. **¿Cómo se imprime la boleta?** `window.print()` con estilos `@media print` que ocultan navbar, footer y botones.
12. **¿Cómo se protege `/admin`?** `RutaAdmin` revisa `esAdmin` del `AuthContext` y redirige a `/login`.
13. **¿Dónde está la lógica de filtros?** En `utils/filtrosProductos.js` como función pura; `FiltrosProductos` solo muestra los controles.
14. **¿Cómo funciona el buscador del navbar?** Navega a `/productos?q=texto` y `Productos` filtra por nombre sin importar tildes ni mayúsculas.
15. **¿Cómo se generan los breadcrumbs?** Desde la ruta actual; los ids se reemplazan por el nombre del producto, categoría o blog.
16. **¿Cómo trabajaron en GitHub?** Una rama `feature/tarjeta-XX` por tarjeta de Trello, commits claros y Pull Request hacia `main`.
17. **¿Qué principio guía los componentes?** Responsabilidad única: cada componente hace una cosa (mostrar, validar, calcular).
18. **¿Cómo se prueban los eventos?** Con spies de Jasmine: se simula el clic en Añadir y se verifica que se llamó la función recibida.
19. **¿Qué mejorarían?** Backend real con Spring Boot y MySQL, contraseñas con hash, pasarela de pago real y más cobertura de pruebas.
20. **¿Qué cambió respecto de la V1?** Pasamos de páginas HTML sueltas a componentes React con rutas, estado compartido, servicios CRUD y pruebas.
