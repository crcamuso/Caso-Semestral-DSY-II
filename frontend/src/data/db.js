// Base de datos simulada de Gas El Volcán.
// Los services (tarjeta 6) trabajan sobre estas listas y el contexto (tarjeta 7)
// las guarda en localStorage.

export const CATEGORIAS_INICIALES = [
    { id: 1, nombre: 'Cilindros de Gas', descripcion: 'Cilindros de 5, 11, 15 y 45 kg', icono: '🔥' },
    { id: 2, nombre: 'Reguladores', descripcion: 'Reguladores domésticos e industriales', icono: '🔧' },
    { id: 3, nombre: 'Mangueras y Conexiones', descripcion: 'Mangueras, abrazaderas y kits', icono: '🔗' },
    { id: 4, nombre: 'Accesorios', descripcion: 'Carros, tapas y detectores de gas', icono: '🧰' },
]

export const PRODUCTOS_INICIALES = [
    { id: 1, codigo: 'CL001', categoriaId: 1, nombre: 'Cilindro GLP 5 kg', descripcion: 'Cilindro de gas licuado de petróleo de 5 kg. Ideal para uso residencial (cocina, calefacción pequeña).', precio: 6500, precioOferta: null, oferta: false, stock: 80, stockCritico: 15, imagen: '' },
    { id: 2, codigo: 'CL002', categoriaId: 1, nombre: 'Cilindro GLP 11 kg', descripcion: 'Cilindro estándar doméstico. El más utilizado en los hogares chilenos. Compatible con reguladores estándar.', precio: 12000, precioOferta: null, oferta: false, stock: 200, stockCritico: 30, imagen: '' },
    { id: 3, codigo: 'CL003', categoriaId: 1, nombre: 'Cilindro GLP 15 kg', descripcion: 'Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.', precio: 16000, precioOferta: null, oferta: false, stock: 90, stockCritico: 20, imagen: '' },
    { id: 4, codigo: 'CL004', categoriaId: 1, nombre: 'Cilindro GLP 45 kg', descripcion: 'Cilindro industrial. Uso comercial: restaurantes, talleres y calefacción de locales.', precio: 45000, precioOferta: null, oferta: false, stock: 30, stockCritico: 8, imagen: '' },
    { id: 5, codigo: 'RG001', categoriaId: 2, nombre: 'Regulador doméstico estándar', descripcion: 'Regulador de 1 etapa para cilindros de 5, 11 y 15 kg. Presión de salida 28 mbar.', precio: 8990, precioOferta: 7490, oferta: true, stock: 45, stockCritico: 10, imagen: '' },
    { id: 6, codigo: 'RG002', categoriaId: 2, nombre: 'Regulador de alta presión', descripcion: 'Regulador para cocinas industriales o equipos de mayor consumo. Presión regulable.', precio: 18990, precioOferta: null, oferta: false, stock: 12, stockCritico: 5, imagen: '' },
    { id: 7, codigo: 'RG003', categoriaId: 2, nombre: 'Regulador dual (2 salidas)', descripcion: 'Permite conectar dos artefactos simultáneamente al mismo cilindro.', precio: 14990, precioOferta: null, oferta: false, stock: 18, stockCritico: 6, imagen: '' },
    { id: 8, codigo: 'MG001', categoriaId: 3, nombre: 'Manguera de gas 1,5 m', descripcion: 'Manguera flexible homologada. Diámetro interior 9 mm. Compatible con reguladores estándar.', precio: 3990, precioOferta: null, oferta: false, stock: 80, stockCritico: 15, imagen: '' },
    { id: 9, codigo: 'MG002', categoriaId: 3, nombre: 'Manguera de gas 3 m', descripcion: 'Manguera larga para instalaciones donde el artefacto está alejado del cilindro.', precio: 6990, precioOferta: null, oferta: false, stock: 50, stockCritico: 10, imagen: '' },
    { id: 10, codigo: 'MG003', categoriaId: 3, nombre: 'Abrazadera metálica', descripcion: 'Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.', precio: 990, precioOferta: null, oferta: false, stock: 200, stockCritico: 40, imagen: '' },
    { id: 11, codigo: 'MG004', categoriaId: 3, nombre: 'Kit de conexión completo', descripcion: 'Incluye regulador, manguera de 1,5 m y abrazaderas. Todo lo necesario para instalar un cilindro nuevo.', precio: 12990, precioOferta: 10990, oferta: true, stock: 25, stockCritico: 6, imagen: '' },
    { id: 12, codigo: 'AC001', categoriaId: 4, nombre: 'Carro porta cilindro 11/15 kg', descripcion: 'Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.', precio: 12990, precioOferta: 10990, oferta: true, stock: 20, stockCritico: 5, imagen: '' },
    { id: 13, codigo: 'AC002', categoriaId: 4, nombre: 'Tapa protectora para válvula', descripcion: 'Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.', precio: 1490, precioOferta: null, oferta: false, stock: 60, stockCritico: 12, imagen: '' },
    { id: 14, codigo: 'AC003', categoriaId: 4, nombre: 'Detector de gas a batería', descripcion: 'Sensor electroquímico con alarma sonora y visual ante fuga de gas GLP o metano.', precio: 19990, precioOferta: null, oferta: false, stock: 8, stockCritico: 10, imagen: '' },
]

export const USUARIOS_INICIALES = [
    {
        id: 1, run: '191110226', nombre: 'Marcela', apellidos: 'Soto Pinto',
        correo: 'admin@duoc.cl', clave: 'admin123', fechaNacimiento: '1980-04-12',
        rol: 'admin', region: 'Región de Ñuble', comuna: 'Chillán',
        direccion: 'Av. Collín 450, Chillán',
    },
    {
        id: 2, run: '183456784', nombre: 'Pedro', apellidos: 'Ríos Vega',
        correo: 'vendedor@duoc.cl', clave: 'vend1234', fechaNacimiento: '1990-07-01',
        rol: 'cliente', region: 'Región de Ñuble', comuna: 'Chillán Viejo',
        direccion: 'Los Aromos 220, Chillán Viejo',
    },
    {
        id: 3, run: '201234565', nombre: 'Camila', apellidos: 'González Rojas',
        correo: 'camila@gmail.com', clave: 'cliente123', fechaNacimiento: '1995-11-23',
        rol: 'cliente', region: 'Región de Ñuble', comuna: 'Chillán',
        direccion: 'Calle Arauco 1020, Chillán',
    },
]

export const ORDENES_INICIALES = [
    {
        id: 1, numero: 'ORD-0001', usuarioId: 2, fecha: '2026-10-05', estado: 'Entregada',
        cliente: { nombre: 'Pedro', apellidos: 'Ríos Vega', correo: 'vendedor@duoc.cl' },
        direccion: { calle: 'Los Aromos 220', departamento: '', region: 'Región de Ñuble', comuna: 'Chillán Viejo', indicaciones: '' },
        items: [
            { productoId: 2, nombre: 'Cilindro GLP 11 kg', precio: 12000, cantidad: 2 },
            { productoId: 11, nombre: 'Kit de conexión completo', precio: 10990, cantidad: 1 },
        ],
        total: 34990,
    },
    {
        id: 2, numero: 'ORD-0002', usuarioId: 3, fecha: '2026-10-12', estado: 'Pendiente',
        cliente: { nombre: 'Camila', apellidos: 'González Rojas', correo: 'camila@gmail.com' },
        direccion: { calle: 'Calle Arauco 1020', departamento: '', region: 'Región de Ñuble', comuna: 'Chillán', indicaciones: 'Portón verde' },
        items: [
            { productoId: 1, nombre: 'Cilindro GLP 5 kg', precio: 6500, cantidad: 1 },
            { productoId: 5, nombre: 'Regulador doméstico estándar', precio: 7490, cantidad: 1 },
        ],
        total: 13990,
    },
    {
        id: 3, numero: 'ORD-0003', usuarioId: 3, fecha: '2026-10-14', estado: 'Entregada',
        cliente: { nombre: 'Camila', apellidos: 'González Rojas', correo: 'camila@gmail.com' },
        direccion: { calle: 'Calle Arauco 1020', departamento: '', region: 'Región de Ñuble', comuna: 'Chillán', indicaciones: '' },
        items: [
            { productoId: 3, nombre: 'Cilindro GLP 15 kg', precio: 16000, cantidad: 1 },
            { productoId: 8, nombre: 'Manguera de gas 1,5 m', precio: 3990, cantidad: 1 },
            { productoId: 10, nombre: 'Abrazadera metálica', precio: 990, cantidad: 2 },
        ],
        total: 21970,
    },
]

// Textos de ejemplo: reemplazar por los de blogs.html y blog-detalle-1/2.html de la V1.
export const BLOGS_INICIALES = [
    {
        id: 1,
        titulo: 'Cómo detectar una fuga de gas en casa',
        fecha: '2026-09-15',
        imagen: '',
        resumen: 'Señales de alerta y qué hacer si sospechas una fuga.',
        contenido: [
            'El gas licuado tiene un olor característico que se agrega a propósito para que sea fácil notar una fuga. Si lo sientes, no enciendas luces ni artefactos.',
            'Cierra la válvula del cilindro, ventila el lugar abriendo puertas y ventanas, y llama a tu distribuidor o a los servicios de emergencia.',
            'Revisa periódicamente mangueras y conexiones, y reemplázalas si notas grietas o desgaste.',
        ],
    },
    {
        id: 2,
        titulo: 'Qué tamaño de cilindro conviene para tu hogar',
        fecha: '2026-09-28',
        imagen: '',
        resumen: 'Guía rápida para elegir entre cilindros de 5, 11, 15 y 45 kg.',
        contenido: [
            'El cilindro de 5 kg sirve para cocinas pequeñas y calefacción puntual. El de 11 kg es el más usado en hogares chilenos.',
            'El de 15 kg es útil para familias con alto consumo, y el de 45 kg se recomienda para uso comercial o industrial.',
            'Antes de pedir uno nuevo, confirma que tu regulador sea compatible con el tamaño que elegiste.',
        ],
    },
]