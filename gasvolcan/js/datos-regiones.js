/* ===========================================================
   ARREGLO DE REGIONES Y COMUNAS (complementario al entregable)
   Se usa en los formularios de registro y mantenedor de usuario.
   Al cambiar la región, se debe actualizar la lista de comunas.
   =========================================================== */

const REGIONES_Y_COMUNAS = [
  {
    region: "Región de Ñuble",
    comunas: ["Chillán", "Chillán Viejo", "El Carmen", "Pinto", "San Ignacio", "Bulnes", "Quillón"]
  },
  {
    region: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"]
  },
  {
    region: "Región Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Las Condes", "Maipú"]
  },
  {
    region: "Región de la Araucanía",
    comunas: ["Temuco", "Villarrica", "Angol"]
  }
];

/**
 * Llena un <select> de regiones y enlaza el cambio con el <select> de comunas.
 * @param {string} idSelectRegion
 * @param {string} idSelectComuna
 * @param {string} [regionSeleccionada]
 * @param {string} [comunaSeleccionada]
 */
function inicializarRegionesComunas(idSelectRegion, idSelectComuna, regionSeleccionada, comunaSeleccionada){
  const selectRegion = document.getElementById(idSelectRegion);
  const selectComuna = document.getElementById(idSelectComuna);
  if (!selectRegion || !selectComuna) return;

  selectRegion.innerHTML = '<option value="">-- Seleccione la región --</option>' +
    REGIONES_Y_COMUNAS.map(r => `<option value="${r.region}">${r.region}</option>`).join("");

  function llenarComunas(nombreRegion, comunaAMarcar){
    const region = REGIONES_Y_COMUNAS.find(r => r.region === nombreRegion);
    if (!region){
      selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
      selectComuna.disabled = true;
      return;
    }
    selectComuna.disabled = false;
    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>' +
      region.comunas.map(c => `<option value="${c}" ${c === comunaAMarcar ? "selected" : ""}>${c}</option>`).join("");
  }

  selectComuna.disabled = true;
  selectRegion.addEventListener("change", () => llenarComunas(selectRegion.value));

  if (regionSeleccionada){
    selectRegion.value = regionSeleccionada;
    llenarComunas(regionSeleccionada, comunaSeleccionada);
  }
}
