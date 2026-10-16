import { leer, escribir, siguienteId, CLAVES } from './almacen'
import { esRequerido, maximo, esEnteroEnRango } from '../utils/validaciones'

const CLAVE = CLAVES.productos

function validar(datos, idActual = null) {
    const errores = {}

    const codigo = String(datos.codigo ?? '').trim()
    if (!esRequerido(codigo)) {
        errores.codigo = 'El código es obligatorio.'
    } else if (!maximo(codigo, 10)) {
        errores.codigo = 'El código admite hasta 10 caracteres.'
    } else if (
        leer(CLAVE).some((p) => p.id !== idActual && p.codigo.toLowerCase() === codigo.toLowerCase())
    ) {
        errores.codigo = 'Ya existe un producto con ese código.'
    }

    const nombre = String(datos.nombre ?? '').trim()
    if (!esRequerido(nombre)) errores.nombre = 'El nombre es obligatorio.'
    else if (!maximo(nombre, 100)) errores.nombre = 'El nombre admite hasta 100 caracteres.'

    if (!maximo(datos.descripcion, 500)) {
        errores.descripcion = 'La descripción admite hasta 500 caracteres.'
    }

    if (!esEnteroEnRango(datos.precio, 1, null)) {
        errores.precio = 'El precio debe ser un número entero mayor a 0.'
    }
    if (!esEnteroEnRango(datos.stock, 0, null)) {
        errores.stock = 'El stock debe ser un número entero igual o mayor a 0.'
    }
    if (!esEnteroEnRango(datos.stockCritico, 0, null)) {
        errores.stockCritico = 'El stock crítico debe ser un número entero igual o mayor a 0.'
    }

    const existeCategoria = leer(CLAVES.categorias).some((c) => c.id === Number(datos.categoriaId))
    if (!existeCategoria) errores.categoriaId = 'Selecciona una categoría válida.'

    if (datos.oferta) {
        if (!esEnteroEnRango(datos.precioOferta, 1, null)) {
            errores.precioOferta = 'El precio de oferta debe ser un número entero mayor a 0.'
        } else if (!errores.precio && Number(datos.precioOferta) >= Number(datos.precio)) {
            errores.precioOferta = 'El precio de oferta debe ser menor al precio normal.'
        }
    }

    return errores
}

function normalizar(datos) {
    const oferta = Boolean(datos.oferta)
    return {
        codigo: String(datos.codigo).trim().toUpperCase(),
        categoriaId: Number(datos.categoriaId),
        nombre: String(datos.nombre).trim(),
        descripcion: String(datos.descripcion ?? '').trim(),
        precio: Number(datos.precio),
        precioOferta: oferta ? Number(datos.precioOferta) : null,
        oferta,
        stock: Number(datos.stock),
        stockCritico: Number(datos.stockCritico),
        imagen: String(datos.imagen ?? '').trim(),
    }
}

export function listarProductos() {
    return leer(CLAVE)
}

export function obtenerProductoPorId(id) {
    return leer(CLAVE).find((p) => p.id === Number(id)) ?? null
}

export function crearProducto(datos) {
    const errores = validar(datos)
    if (Object.keys(errores).length > 0) return { ok: false, errores }

    const lista = leer(CLAVE)
    const nuevo = { id: siguienteId(lista), ...normalizar(datos) }
    lista.push(nuevo)
    escribir(CLAVE, lista)
    return { ok: true, dato: { ...nuevo } }
}

export function actualizarProducto(id, datos) {
    const lista = leer(CLAVE)
    const indice = lista.findIndex((p) => p.id === Number(id))
    if (indice === -1) return { ok: false, errores: { general: 'Producto no encontrado.' } }

    const errores = validar(datos, lista[indice].id)
    if (Object.keys(errores).length > 0) return { ok: false, errores }

    lista[indice] = { ...lista[indice], ...normalizar(datos) }
    escribir(CLAVE, lista)
    return { ok: true, dato: { ...lista[indice] } }
}

export function eliminarProducto(id) {
    const lista = leer(CLAVE)
    const restantes = lista.filter((p) => p.id !== Number(id))
    if (restantes.length === lista.length) return { ok: false, mensaje: 'Producto no encontrado.' }
    escribir(CLAVE, restantes)
    return { ok: true }
}

/* ---------- Auxiliares ---------- */

export function listarProductosEnOferta() {
    return leer(CLAVE).filter((p) => p.oferta && p.precioOferta !== null && p.precioOferta < p.precio)
}

export function listarProductosPorCategoria(categoriaId) {
    return leer(CLAVE).filter((p) => p.categoriaId === Number(categoriaId))
}

export function listarProductosCriticos() {
    return leer(CLAVE).filter((p) => p.stock <= p.stockCritico)
}

// items: [{ productoId, cantidad }]. Se usará al confirmar un pago (tarjeta 12).
export function descontarStock(items) {
    const lista = leer(CLAVE)
    for (const item of items) {
        const producto = lista.find((p) => p.id === Number(item.productoId))
        if (!producto) return { ok: false, mensaje: 'Un producto del carrito ya no existe.' }
        if (producto.stock < item.cantidad) {
            return { ok: false, mensaje: `Stock insuficiente de ${producto.nombre}.` }
        }
    }
    items.forEach((item) => {
        const producto = lista.find((p) => p.id === Number(item.productoId))
        producto.stock -= item.cantidad
    })
    escribir(CLAVE, lista)
    return { ok: true }
}