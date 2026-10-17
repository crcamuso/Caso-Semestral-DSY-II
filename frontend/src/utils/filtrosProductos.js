import { precioVigente } from './precios'

export const FILTROS_INICIALES = {
    categoriaId: '',
    precioMin: '',
    precioMax: '',
    soloOfertas: false,
    orden: 'ninguno',
}

export const OPCIONES_ORDEN = [
    { valor: 'ninguno', texto: 'Sin ordenar' },
    { valor: 'precio-asc', texto: 'Precio: menor a mayor' },
    { valor: 'precio-desc', texto: 'Precio: mayor a menor' },
]

// Minúsculas y sin tildes, para que "regulador" encuentre "Regulador" y "cañeria" a "Cañería".
function normalizar(texto) {
    return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

// Devuelve una lista nueva; no modifica la original.
export function filtrarProductos(productos, texto, filtros) {
    const busqueda = normalizar(texto.trim())
    const min = filtros.precioMin === '' ? null : Number(filtros.precioMin)
    const max = filtros.precioMax === '' ? null : Number(filtros.precioMax)

    const resultado = productos.filter((producto) => {
        const precio = precioVigente(producto)
        if (busqueda && !normalizar(producto.nombre).includes(busqueda)) return false
        if (filtros.categoriaId !== '' && producto.categoriaId !== Number(filtros.categoriaId)) return false
        if (min !== null && precio < min) return false
        if (max !== null && precio > max) return false
        if (filtros.soloOfertas && precio === producto.precio) return false
        return true
    })

    if (filtros.orden === 'precio-asc') resultado.sort((a, b) => precioVigente(a) - precioVigente(b))
    if (filtros.orden === 'precio-desc') resultado.sort((a, b) => precioVigente(b) - precioVigente(a))
    return resultado
}
