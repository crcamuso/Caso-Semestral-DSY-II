/* ===========================================================
   DATOS DE PRODUCTOS — Distribuidora de Gas El Volcán
   Arreglo base en JavaScript (según Anexo 1, requerimiento
   "Listar productos mediante JavaScript: crear un arreglo de
   productos y mostrar los productos del arreglo").
   Se guarda en localStorage para que el panel administrador
   pueda crear, editar y eliminar productos de forma persistente.
   =========================================================== */

const CLAVE_PRODUCTOS = "gasvolcan_productos";

const PRODUCTOS_INICIALES = [
  { codigo:"CL001", categoria:"Cilindros de Gas", nombre:"Cilindro GLP 5 kg", descripcion:"Cilindro de gas licuado de petróleo de 5 kg. Ideal para uso residencial (cocina, calefacción pequeña).", precio:6500, stock:80, stockCritico:15, imagen:"" },
  { codigo:"CL002", categoria:"Cilindros de Gas", nombre:"Cilindro GLP 11 kg", descripcion:"Cilindro estándar doméstico. El más utilizado en los hogares chilenos. Compatible con reguladores estándar.", precio:12000, stock:200, stockCritico:30, imagen:"" },
  { codigo:"CL003", categoria:"Cilindros de Gas", nombre:"Cilindro GLP 15 kg", descripcion:"Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.", precio:16000, stock:90, stockCritico:20, imagen:"" },
  { codigo:"CL004", categoria:"Cilindros de Gas", nombre:"Cilindro GLP 45 kg", descripcion:"Cilindro industrial. Uso comercial: restaurantes, talleres y calefacción de locales.", precio:45000, stock:30, stockCritico:8, imagen:"" },
  { codigo:"RG001", categoria:"Reguladores", nombre:"Regulador doméstico estándar", descripcion:"Regulador de 1 etapa para cilindros de 5, 11 y 15 kg. Presión de salida 28 mbar.", precio:8990, stock:45, stockCritico:10, imagen:"" },
  { codigo:"RG002", categoria:"Reguladores", nombre:"Regulador de alta presión", descripcion:"Regulador para cocinas industriales o equipos de mayor consumo. Presión regulable.", precio:18990, stock:12, stockCritico:5, imagen:"" },
  { codigo:"RG003", categoria:"Reguladores", nombre:"Regulador dual (2 salidas)", descripcion:"Permite conectar dos artefactos simultáneamente al mismo cilindro.", precio:14990, stock:18, stockCritico:6, imagen:"" },
  { codigo:"MG001", categoria:"Mangueras y Conexiones", nombre:"Manguera de gas 1,5 m", descripcion:"Manguera flexible homologada. Diámetro interior 9 mm. Compatible con reguladores estándar.", precio:3990, stock:80, stockCritico:15, imagen:"" },
  { codigo:"MG002", categoria:"Mangueras y Conexiones", nombre:"Manguera de gas 3 m", descripcion:"Manguera larga para instalaciones donde el artefacto está alejado del cilindro.", precio:6990, stock:50, stockCritico:10, imagen:"" },
  { codigo:"MG003", categoria:"Mangueras y Conexiones", nombre:"Abrazadera metálica", descripcion:"Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.", precio:990, stock:200, stockCritico:40, imagen:"" },
  { codigo:"MG004", categoria:"Mangueras y Conexiones", nombre:"Kit de conexión completo", descripcion:"Incluye regulador, manguera de 1,5 m y abrazaderas. Todo lo necesario para instalar un cilindro nuevo.", precio:12990, stock:25, stockCritico:6, imagen:"" },
  { codigo:"AC001", categoria:"Accesorios", nombre:"Carro porta cilindro 11/15 kg", descripcion:"Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.", precio:12990, stock:20, stockCritico:5, imagen:"" },
  { codigo:"AC002", categoria:"Accesorios", nombre:"Tapa protectora para válvula", descripcion:"Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.", precio:1490, stock:60, stockCritico:12, imagen:"" },
  { codigo:"AC003", categoria:"Accesorios", nombre:"Detector de gas a batería", descripcion:"Sensor electroquímico con alarma sonora y visual ante fuga de gas GLP o metano.", precio:19990, stock:8, stockCritico:10, imagen:"" }
];

function obtenerProductos(){
  const guardado = localStorage.getItem(CLAVE_PRODUCTOS);
  if (!guardado){
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(PRODUCTOS_INICIALES));
    return JSON.parse(JSON.stringify(PRODUCTOS_INICIALES));
  }
  try { return JSON.parse(guardado); }
  catch(e){ return JSON.parse(JSON.stringify(PRODUCTOS_INICIALES)); }
}

function guardarProductos(listaProductos){
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaProductos));
}

function obtenerProductoPorCodigo(codigo){
  return obtenerProductos().find(p => p.codigo === codigo);
}

function guardarProducto(producto, esNuevo){
  const productos = obtenerProductos();
  if (esNuevo){
    productos.push(producto);
  } else {
    const indice = productos.findIndex(p => p.codigo === producto.codigo);
    if (indice >= 0) productos[indice] = producto;
  }
  guardarProductos(productos);
}

function eliminarProducto(codigo){
  const productos = obtenerProductos().filter(p => p.codigo !== codigo);
  guardarProductos(productos);
}

function formatoCLP(valor){
  return "$" + Number(valor).toLocaleString("es-CL");
}
