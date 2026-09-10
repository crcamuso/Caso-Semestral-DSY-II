/* ===========================================================
   CARRITO DE COMPRAS — Distribuidora de Gas El Volcán
   Requerimiento Anexo 1: implementar un carrito de compra,
   añadir productos, definir reglas del carrito y guardar la
   información en localStorage.
   =========================================================== */

const CLAVE_CARRITO = "gasvolcan_carrito";
const CUPON_VALIDO = "GASVOLCAN10"; // 10% de descuento, solo de forma demostrativa

function obtenerCarrito(){
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito){
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

/** Regla de negocio: no se puede añadir más unidades que el stock disponible. */
function agregarAlCarrito(codigoProducto, cantidad){
  const producto = obtenerProductoPorCodigo(codigoProducto);
  if (!producto) return { ok:false, mensaje:"El producto no existe." };

  const carrito = obtenerCarrito();
  const linea = carrito.find(l => l.codigo === codigoProducto);
  const cantidadActual = linea ? linea.cantidad : 0;
  const cantidadTotal = cantidadActual + cantidad;

  if (cantidad <= 0) return { ok:false, mensaje:"La cantidad debe ser mayor a 0." };
  if (cantidadTotal > producto.stock){
    return { ok:false, mensaje:`Solo quedan ${producto.stock} unidades de "${producto.nombre}" en stock.` };
  }

  if (linea){
    linea.cantidad = cantidadTotal;
  } else {
    carrito.push({ codigo: producto.codigo, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });
  }
  guardarCarrito(carrito);
  return { ok:true, mensaje:`"${producto.nombre}" se añadió al carrito.` };
}

function cambiarCantidadCarrito(codigoProducto, nuevaCantidad){
  const producto = obtenerProductoPorCodigo(codigoProducto);
  const carrito = obtenerCarrito();
  const linea = carrito.find(l => l.codigo === codigoProducto);
  if (!linea) return;

  if (nuevaCantidad < 1) nuevaCantidad = 1;
  if (producto && nuevaCantidad > producto.stock) nuevaCantidad = producto.stock;
  linea.cantidad = nuevaCantidad;
  guardarCarrito(carrito);
}

function quitarDelCarrito(codigoProducto){
  guardarCarrito(obtenerCarrito().filter(l => l.codigo !== codigoProducto));
}

function vaciarCarrito(){
  guardarCarrito([]);
}

function totalUnidadesCarrito(){
  return obtenerCarrito().reduce((total, l) => total + l.cantidad, 0);
}

function subtotalCarrito(){
  return obtenerCarrito().reduce((total, l) => total + (l.precio * l.cantidad), 0);
}

/** Actualiza el contador del ícono del carrito en la barra de navegación (todas las páginas). */
function actualizarContadorCarrito(){
  document.querySelectorAll("[data-contador-carrito]").forEach(el => {
    el.textContent = totalUnidadesCarrito();
  });
}
