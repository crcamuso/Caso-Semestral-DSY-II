/* ===========================================================
   NAVEGACIÓN — comportamiento compartido en todas las páginas
   de la tienda: menú hamburguesa responsivo, contador de
   carrito y enlaces de sesión (Iniciar sesión / Cerrar sesión).
   =========================================================== */

document.addEventListener("DOMContentLoaded", function(){
  const botonMenu = document.getElementById("boton-menu");
  const navPrincipal = document.getElementById("nav-principal");
  if (botonMenu && navPrincipal){
    botonMenu.addEventListener("click", function(){
      navPrincipal.classList.toggle("abierto");
      const expandido = navPrincipal.classList.contains("abierto");
      botonMenu.setAttribute("aria-expanded", expandido);
    });
  }

  if (typeof actualizarContadorCarrito === "function"){
    actualizarContadorCarrito();
  }

  const areaSesion = document.getElementById("area-sesion");
  if (areaSesion && typeof obtenerSesion === "function"){
    const sesion = obtenerSesion();
    if (sesion){
      const enlacePanel = ["Administrador", "Vendedor"].includes(sesion.tipoUsuario)
        ? `<a href="admin/index.html" class="enlace-sesion">Panel admin</a>`
        : "";
      areaSesion.innerHTML = `
        <span class="enlace-sesion">Hola, ${sesion.nombre}</span>
        ${enlacePanel}
        <a href="#" id="enlace-cerrar-sesion" class="enlace-sesion">Cerrar sesión</a>`;
      document.getElementById("enlace-cerrar-sesion").addEventListener("click", function(e){
        e.preventDefault();
        cerrarSesion();
        window.location.href = "index.html";
      });
    }
  }
});
