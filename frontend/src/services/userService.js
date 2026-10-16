import { leer, escribir, siguienteId, CLAVES } from './almacen'
import { esRequerido, minimo, maximo, validarCorreo, validarRun } from '../utils/validaciones'

const CLAVE = CLAVES.usuarios

export const ROLES = ['admin', 'cliente']

function validar(datos, idActual = null) {
    const errores = {}
    const lista = leer(CLAVE)

    const nombre = String(datos.nombre ?? '').trim()
    if (!esRequerido(nombre)) errores.nombre = 'El nombre es obligatorio.'
    else if (!maximo(nombre, 50)) errores.nombre = 'El nombre admite hasta 50 caracteres.'

    const apellidos = String(datos.apellidos ?? '').trim()
    if (!esRequerido(apellidos)) errores.apellidos = 'Los apellidos son obligatorios.'
    else if (!maximo(apellidos, 100)) errores.apellidos = 'Los apellidos admiten hasta 100 caracteres.'

    const correo = String(datos.correo ?? '').trim()
    if (!esRequerido(correo)) {
        errores.correo = 'El correo es obligatorio.'
    } else if (!validarCorreo(correo)) {
        errores.correo = 'Usa un correo válido de @duoc.cl, @profesor.duoc.cl o @gmail.com.'
    } else if (
        lista.some((u) => u.id !== idActual && u.correo.toLowerCase() === correo.toLowerCase())
    ) {
        errores.correo = 'Ese correo ya está registrado.'
    }

    // Al editar, la contraseña puede quedar en blanco para conservar la actual.
    const exigirClave = idActual === null || esRequerido(datos.clave)
    if (exigirClave && (!minimo(datos.clave, 6) || !maximo(datos.clave, 20))) {
        errores.clave = 'La contraseña debe tener entre 6 y 20 caracteres.'
    }

    // El RUN es opcional (el registro público no lo pide), pero si viene debe ser válido y único.
    const run = String(datos.run ?? '').trim().toUpperCase()
    if (run) {
        if (!validarRun(run)) {
            errores.run = 'RUN inválido. Escríbelo sin puntos ni guion (ej: 191110226).'
        } else if (lista.some((u) => u.id !== idActual && u.run === run)) {
            errores.run = 'Ese RUN ya está registrado.'
        }
    }

    if (!ROLES.includes(datos.rol ?? 'cliente')) errores.rol = 'El rol debe ser admin o cliente.'
    if (!maximo(datos.direccion, 300)) errores.direccion = 'La dirección admite hasta 300 caracteres.'

    return errores
}

function normalizar(datos, existente = {}) {
    return {
        run: String(datos.run ?? '').trim().toUpperCase(),
        nombre: String(datos.nombre).trim(),
        apellidos: String(datos.apellidos).trim(),
        correo: String(datos.correo).trim(),
        clave: esRequerido(datos.clave) ? String(datos.clave) : existente.clave,
        fechaNacimiento: String(datos.fechaNacimiento ?? '').trim(),
        rol: datos.rol ?? 'cliente',
        region: String(datos.region ?? '').trim(),
        comuna: String(datos.comuna ?? '').trim(),
        direccion: String(datos.direccion ?? '').trim(),
    }
}

export function listarUsuarios() {
    return leer(CLAVE)
}

export function obtenerUsuarioPorId(id) {
    return leer(CLAVE).find((u) => u.id === Number(id)) ?? null
}

export function obtenerUsuarioPorCorreo(correo) {
    return leer(CLAVE).find((u) => u.correo.toLowerCase() === String(correo).trim().toLowerCase()) ?? null
}

export function crearUsuario(datos) {
    const errores = validar(datos)
    if (Object.keys(errores).length > 0) return { ok: false, errores }

    const lista = leer(CLAVE)
    const nuevo = { id: siguienteId(lista), ...normalizar(datos) }
    lista.push(nuevo)
    escribir(CLAVE, lista)
    return { ok: true, dato: { ...nuevo } }
}

export function actualizarUsuario(id, datos) {
    const lista = leer(CLAVE)
    const indice = lista.findIndex((u) => u.id === Number(id))
    if (indice === -1) return { ok: false, errores: { general: 'Usuario no encontrado.' } }

    const errores = validar(datos, lista[indice].id)
    if (Object.keys(errores).length > 0) return { ok: false, errores }

    lista[indice] = { ...lista[indice], ...normalizar(datos, lista[indice]) }
    escribir(CLAVE, lista)
    return { ok: true, dato: { ...lista[indice] } }
}

export function eliminarUsuario(id) {
    const lista = leer(CLAVE)
    const restantes = lista.filter((u) => u.id !== Number(id))
    if (restantes.length === lista.length) return { ok: false, mensaje: 'Usuario no encontrado.' }
    escribir(CLAVE, restantes)
    return { ok: true }
}

// Devuelve el usuario sin la contraseña, o null si las credenciales no coinciden.
export function autenticar(correo, clave) {
    const usuario = obtenerUsuarioPorCorreo(correo)
    if (!usuario || usuario.clave !== clave) return null
    const sinClave = { ...usuario }
    delete sinClave.clave
    return sinClave
}