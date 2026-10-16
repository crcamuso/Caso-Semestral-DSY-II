export const DOMINIOS_CORREO_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com']

export function esRequerido(valor) {
    return valor !== null && valor !== undefined && valor.toString().trim().length > 0
}

// RUN sin puntos ni guion. Ej: 191110226
export function validarRun(run) {
    if (!run) return false
    const limpio = run.trim().toUpperCase()
    if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) return false

    const cuerpo = limpio.slice(0, -1)
    const dv = limpio.slice(-1)
    let suma = 0
    let multiplo = 2
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i], 10) * multiplo
        multiplo = multiplo === 7 ? 2 : multiplo + 1
    }
    const resto = 11 - (suma % 11)
    const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
    return dv === dvEsperado
}

export function tieneFormatoCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
}

// Formato general + dominio permitido (regla de la V1)
export function validarCorreo(correo) {
    if (!tieneFormatoCorreo(correo)) return false
    const dominio = correo.split('@')[1]?.toLowerCase()
    return DOMINIOS_CORREO_PERMITIDOS.includes(dominio)
}

export function maximo(valor, max) {
    return (valor || '').toString().length <= max
}

export function minimo(valor, min) {
    return (valor || '').toString().length >= min
}

export function esEnteroEnRango(valor, min, max) {
    if (valor === '' || valor === null || valor === undefined) return false
    if (!/^-?\d+$/.test(String(valor).trim())) return false
    const n = Number(valor)
    if (n < min) return false
    if (max !== null && n > max) return false
    return true
}

export function esDecimalEnRango(valor, min, max) {
    if (valor === '' || valor === null || valor === undefined) return false
    if (!/^-?\d+(\.\d+)?$/.test(String(valor).trim())) return false
    const n = Number(valor)
    if (n < min) return false
    if (max !== null && n > max) return false
    return true
}