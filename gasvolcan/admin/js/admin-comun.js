/* ===========================================================
   PANEL ADMINISTRADOR — comportamiento común
   Regla de seguridad: ninguna vista del panel debe estar
   accesible sin autenticación con el rol adecuado.
   =========================================================== */

const SESION_ADMIN = exigirSesion(["Administrador", "Vendedor"], "../login.html");

document.addEventListener("DOMContentLoaded", function(){
  if (!SESION_ADMIN) return;

  document.getElementById("nombre-sesion").textContent = SESION_ADMIN.nombre;
  document.getElementById("rol-sesion").textContent = SESION_ADMIN.tipoUsuario;

  // El Vendedor no gestiona usuarios: se oculta esa sección del menú.
  if (SESION_ADMIN.tipoUsuario === "Vendedor"){
    const enlaceUsuarios = document.getElementById("enlace-usuarios");
    if (enlaceUsuarios) enlaceUsuarios.style.display = "none";
  }

  document.getElementById("boton-salir").addEventListener("click", function(){
    cerrarSesion();
    window.location.href = "../login.html";
  });

  const botonMenu = document.getElementById("boton-menu-admin");
  const panelLateral = document.getElementById("panel-lateral");
  if (botonMenu && panelLateral){
    botonMenu.addEventListener("click", function(){
      panelLateral.classList.toggle("abierto");
    });
  }
});

/** Bloquea el acceso a una página exclusiva de Administrador (usada en usuarios.html / usuario-form.html). */
function exigirRolAdministrador(){
  if (SESION_ADMIN && SESION_ADMIN.tipoUsuario !== "Administrador"){
    window.location.href = "index.html";
  }
}
