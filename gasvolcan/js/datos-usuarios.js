/* ===========================================================
   DATOS DE USUARIOS Y SESIÓN — Distribuidora de Gas El Volcán
   Como esta entrega es solo Frontend (HTML, CSS y JavaScript),
   la autenticación y los roles se simulan con localStorage.
   =========================================================== */

const CLAVE_USUARIOS = "gasvolcan_usuarios";
const CLAVE_SESION = "gasvolcan_sesion";

// Usuario administrador de ejemplo para poder revisar el panel
// administrador sin tener que registrarse primero.
const USUARIOS_INICIALES = [
  {
    run: "191110229", nombre: "Marcela", apellidos: "Soto Pinto",
    correo: "admin@duoc.cl", clave: "admin123", fechaNacimiento: "1980-04-12",
    tipoUsuario: "Administrador", region: "Región de Ñuble", comuna: "Chillán",
    direccion: "Av. Collín 450, Chillán"
  },
  {
    run: "18345678K", nombre: "Pedro", apellidos: "Ríos Vega",
    correo: "vendedor@duoc.cl", clave: "vend1234", fechaNacimiento: "1990-07-01",
    tipoUsuario: "Vendedor", region: "Región de Ñuble", comuna: "Chillán Viejo",
    direccion: "Los Aromos 220, Chillán Viejo"
  }
];

function obtenerUsuarios(){
  const guardado = localStorage.getItem(CLAVE_USUARIOS);
  if (!guardado){
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(USUARIOS_INICIALES));
    return JSON.parse(JSON.stringify(USUARIOS_INICIALES));
  }
  try { return JSON.parse(guardado); }
  catch(e){ return JSON.parse(JSON.stringify(USUARIOS_INICIALES)); }
}

function guardarUsuarios(lista){
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

function obtenerUsuarioPorCorreo(correo){
  return obtenerUsuarios().find(u => u.correo.toLowerCase() === correo.toLowerCase());
}

function obtenerUsuarioPorRun(run){
  return obtenerUsuarios().find(u => u.run === run);
}

function guardarUsuario(usuario, esNuevo){
  const usuarios = obtenerUsuarios();
  if (esNuevo){
    usuarios.push(usuario);
  } else {
    const indice = usuarios.findIndex(u => u.run === usuario.run);
    if (indice >= 0) usuarios[indice] = usuario;
  }
  guardarUsuarios(usuarios);
}

function eliminarUsuario(run){
  guardarUsuarios(obtenerUsuarios().filter(u => u.run !== run));
}

/* ---------- Sesión ---------- */

function iniciarSesion(correo, clave){
  const usuario = obtenerUsuarioPorCorreo(correo);
  if (!usuario || usuario.clave !== clave) return null;
  const sesion = { correo: usuario.correo, nombre: usuario.nombre, tipoUsuario: usuario.tipoUsuario };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return sesion;
}

function obtenerSesion(){
  const guardado = localStorage.getItem(CLAVE_SESION);
  return guardado ? JSON.parse(guardado) : null;
}

function cerrarSesion(){
  localStorage.removeItem(CLAVE_SESION);
}

/** Exige una sesión con alguno de los roles indicados; si no cumple, redirige. */
function exigirSesion(rolesPermitidos, urlRedireccion){
  const sesion = obtenerSesion();
  if (!sesion || !rolesPermitidos.includes(sesion.tipoUsuario)){
    window.location.href = urlRedireccion;
    return null;
  }
  return sesion;
}
