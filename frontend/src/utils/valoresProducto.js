export const VALORES_NUEVO_PRODUCTO = {
    codigo: '',
    nombre: '',
    descripcion: '',
    categoriaId: '',
    precio: '',
    stock: '',
    stockCritico: '',
    oferta: false,
    precioOferta: '',
    imagen: '',
}

// Convierte un producto guardado en los valores (texto) que maneja el formulario.
export function valoresDesdeProducto(producto) {
    return {
        codigo: producto.codigo,
        nombre: producto.nombre,
        descripcion: producto.descripcion ?? '',
        categoriaId: String(producto.categoriaId),
        precio: String(producto.precio),
        stock: String(producto.stock),
        stockCritico: String(producto.stockCritico),
        oferta: Boolean(producto.oferta),
        precioOferta:
            producto.precioOferta === null || producto.precioOferta === undefined
                ? ''
                : String(producto.precioOferta),
        imagen: producto.imagen ?? '',
    }
}