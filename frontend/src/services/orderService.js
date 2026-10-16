import { leer, escribir, siguienteId, CLAVES } from './almacen'
import { esRequerido, esEnteroEnRango, tieneFormatoCorreo } from '../utils/validaciones'

const CLAVE = CLAVES.ordenes

export const ESTADOS = ['Pendiente', 'Pago fallido', 'Entregada', 'Cancelada']

function validar(datos) {
    const errores = {}
    const cliente = datos.cliente ?? {}
    const direccion = datos.direccion ?? {}

    if (!esRequerido(cliente.nombre)) errores.nombre = 'El nombre es obligatorio.'
    if (!esRequerido(cliente.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.'
    if (!esRequerido(cliente.correo)) errores.correo = 'El correo es obligatorio.'
    else if (!tieneFormatoCorreo(String(cliente.correo).trim())) errores.correo = 'El correo no es válido.'

    if (!esRequerido(direccion.calle)) errores.calle = 'La calle es obligatoria.'
    if (!esRequerido(direccion.region)) errores.region = 'Selecciona una región.'
    if (!esRequerido(direccion.comuna)) errores.comuna = 'Selecciona una comuna.'

    const items = datos.items
    if (!Array.isArray(items) || items.length === 0) {
        errores.items = 'El carrito está vacío.'
    } else if (
        items.some(
            (i) =>
                !esEnteroEnRango(i.productoId, 1, null) ||
                !esEnteroEnRango(i.cantidad, 1, null) ||
                !esEnteroEnRango(i.precio, 0, null),
        )
    ) {
        errores.items = 'Hay productos con datos inválidos.'
    }

    return errores
}

export function listarOrdenes() {
    return leer(CLAVE)
}

export function obtenerOrdenPorId(id) {
    return leer(CLAVE).find((o) => o.id === Number(id)) ?? null
}

export function listarOrdenesPorUsuario(usuarioId) {
    return leer(CLAVE).filter((o) => o.usuarioId === Number(usuarioId))
}

// El total se calcula aquí a partir de los items; no se confía en el que venga del formulario.
export function crearOrden(datos) {
    const errores = validar(datos)
    if (Object.keys(errores).length > 0) return { ok: false, errores }

    const items = datos.items.map((i) => ({
        productoId: Number(i.productoId),
        nombre: String(i.nombre),
        precio: Number(i.precio),
        cantidad: Number(i.cantidad),
    }))

    const lista = leer(CLAVE)
    const id = siguienteId(lista)
    const nueva = {
        id,
        numero: `ORD-${String(id).padStart(4, '0')}`,
        usuarioId: datos.usuarioId ?? null,
        fecha: new Date().toISOString().slice(0, 10),
        estado: 'Pendiente',
        cliente: {
            nombre: String(datos.cliente.nombre).trim(),
            apellidos: String(datos.cliente.apellidos).trim(),
            correo: String(datos.cliente.correo).trim(),
        },
        direccion: {
            calle: String(datos.direccion.calle).trim(),
            departamento: String(datos.direccion.departamento ?? '').trim(),
            region: String(datos.direccion.region).trim(),
            comuna: String(datos.direccion.comuna).trim(),
            indicaciones: String(datos.direccion.indicaciones ?? '').trim(),
        },
        items,
        total: items.reduce((suma, i) => suma + i.precio * i.cantidad, 0),
    }

    lista.push(nueva)
    escribir(CLAVE, lista)
    return { ok: true, dato: JSON.parse(JSON.stringify(nueva)) }
}

// Una orden solo cambia de estado; sus datos y su detalle no se editan.
export function actualizarEstadoOrden(id, estado) {
    if (!ESTADOS.includes(estado)) return { ok: false, errores: { estado: 'Estado no válido.' } }

    const lista = leer(CLAVE)
    const indice = lista.findIndex((o) => o.id === Number(id))
    if (indice === -1) return { ok: false, errores: { general: 'Orden no encontrada.' } }

    lista[indice].estado = estado
    escribir(CLAVE, lista)
    return { ok: true, dato: JSON.parse(JSON.stringify(lista[indice])) }
}

export function eliminarOrden(id) {
    const lista = leer(CLAVE)
    const restantes = lista.filter((o) => o.id !== Number(id))
    if (restantes.length === lista.length) return { ok: false, mensaje: 'Orden no encontrada.' }
    escribir(CLAVE, restantes)
    return { ok: true }
}