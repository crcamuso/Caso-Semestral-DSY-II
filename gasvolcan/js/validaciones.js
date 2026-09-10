/* ===========================================================
   FUNCIONES DE VALIDACIÓN — Distribuidora de Gas El Volcán
   Validación de formularios en tiempo real con mensajes de
   error y sugerencias dinámicas (requerimiento Anexo 1).
   =========================================================== */

const DOMINIOS_CORREO_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

/** Muestra un mensaje de error debajo del campo indicado. */
function marcarError(idCampo, idError, mensaje){
  const campo = document.getElementById(idCampo);
  const error = document.getElementById(idError);
  if (campo) campo.closest(".campo")?.classList.add("con-error");
  if (error) error.textContent = mensaje;
  return false;
}

/** Limpia el estado de error de un campo. */
function limpiarError(idCampo, idError){
  const campo = document.getElementById(idCampo);
  const error = document.getElementById(idError);
  if (campo) campo.closest(".campo")?.classList.remove("con-error");
  if (error) error.textContent = "";
  return true;
}

/** Valida que un texto no esté vacío. */
function esRequerido(valor){
  return valor !== null && valor !== undefined && valor.toString().trim().length > 0;
}

/** Valida el formato y dígito verificador de un RUN chileno sin puntos ni guion. Ej: 19011022K */
function validarRun(run){
  if (!run) return false;
  const limpio = run.trim().toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) return false;
  if (limpio.length < 7 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--){
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === dvEsperado;
}

/** Valida correo: formato general + dominio permitido. */
function validarCorreo(correo){
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return false;
  const dominio = correo.split("@")[1]?.toLowerCase();
  return DOMINIOS_CORREO_PERMITIDOS.includes(dominio);
}

/** Valida longitud máxima. */
function maximo(valor, max){ return (valor || "").toString().length <= max; }
/** Valida longitud mínima. */
function minimo(valor, min){ return (valor || "").toString().length >= min; }

/** Valida que sea un número entero dentro de un rango (min inclusive, sin max si es null). */
function esEnteroEnRango(valor, min, max){
  if (valor === "" || valor === null || valor === undefined) return false;
  if (!/^-?\d+$/.test(String(valor).trim())) return false;
  const n = Number(valor);
  if (n < min) return false;
  if (max !== null && n > max) return false;
  return true;
}

/** Valida que sea un número (con decimales permitidos) dentro de un rango. */
function esDecimalEnRango(valor, min, max){
  if (valor === "" || valor === null || valor === undefined) return false;
  if (!/^-?\d+(\.\d+)?$/.test(String(valor).trim())) return false;
  const n = Number(valor);
  if (n < min) return false;
  if (max !== null && n > max) return false;
  return true;
}

/** Muestra u oculta un mensaje general de éxito/error en un formulario. */
function mostrarMensajeFormulario(idContenedor, tipo, texto){
  const el = document.getElementById(idContenedor);
  if (!el) return;
  el.className = "mensaje-formulario " + tipo;
  el.textContent = texto;
  el.style.display = "block";
}
