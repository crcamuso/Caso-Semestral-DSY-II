import { leer, escribir, siguienteId, CLAVES } from './almacen'
import { esRequerido, minimo, maximo } from '../utils/validaciones'

const CLAVE = CLAVES.categorias

function validar(datos, idActual = null) {
    const errores = {}
    const nombre = String(datos.nombre ?? '').trim()

    if (!esRequerido(nombre)) {
        errores.nombre = 'El nombre es obligatorio.'
    } else if (!minimo(nombre, 3) || !maximo(nombre, 50)) {
        errores.nombre = 'El nombre debe tener entre 3 y 50 caracteres.'
    } else if (
        leer(CLAVE).some((c) => c.id !== idActual && c.nombre.toLowerCase() === nombre.toLowerCase())
    ) {
        errores.nombre = 'Ya existe una categoría con ese nombre.'
    }

    if (!maximo(datos.descripcion, 200)) {
        errores.descripcion = 'La descripción admite hasta 200 caracteres.'
    }
    return errores
}

function normalizar(datos) {
    return {
        nombre: String(datos.nombre).trim(),
        descripcion: String(datos.descripcion ?? '').trim(),
        icono: String(datos.icono ?? '').trim() || '🔥',
    }
}

export function listarCategorias() {
    return leer(CLAVE)
}

export function obtenerCategoriaPorId(id) {
    return leer(CLAVE).find((c) => c.id === Number(id)) ?? null
}

export function crearCategoria(datos) {
    const errores = validar(datos)
    if (Object.keys(errores).length > 0) return { ok: false, errores }

    const lista = leer(CLAVE)
    const nueva = { id: siguienteId(lista), ...normalizar(datos) }
    lista.push(nueva)
    escribir(CLAVE, lista)
    return { ok: true, dato: { ...nueva } }
}

export function actualizarCategoria(id, datos) {
    const lista = leer(CLAVE)
    const indice = lista.findIndex((c) => c.id === Number(id))
    if (indice === -1) return { ok: false, errores: { general: 'Categoría no encontrada.' } }

    const errores = validar(datos, lista[indice].id)
    if (Object.keys(errores).length > 0) return { ok: false, errores }

    lista[indice] = { ...lista[indice], ...normalizar(datos) }
    escribir(CLAVE, lista)
    return { ok: true, dato: { ...lista[indice] } }
}

// No permite borrar categorías que tengan productos asociados.
export function eliminarCategoria(id) {
    const lista = leer(CLAVE)
    if (!lista.some((c) => c.id === Number(id))) {
        return { ok: false, mensaje: 'Categoría no encontrada.' }
    }

    const asociados = leer(CLAVES.productos).filter((p) => p.categoriaId === Number(id)).length
    if (asociados > 0) {
        return { ok: false, mensaje: `No se puede eliminar: tiene ${asociados} producto(s) asociado(s).` }
    }

    escribir(CLAVE, lista.filter((c) => c.id !== Number(id)))
    return { ok: true }
}