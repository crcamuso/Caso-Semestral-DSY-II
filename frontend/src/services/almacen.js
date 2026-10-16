import {
    CATEGORIAS_INICIALES,
    PRODUCTOS_INICIALES,
    USUARIOS_INICIALES,
    ORDENES_INICIALES,
    BLOGS_INICIALES,
} from '../data/db'

export const CLAVES = {
    productos: 'gasvolcan_v2_productos',
    categorias: 'gasvolcan_v2_categorias',
    usuarios: 'gasvolcan_v2_usuarios',
    ordenes: 'gasvolcan_v2_ordenes',
    blogs: 'gasvolcan_v2_blogs',
}

const INICIALES = {
    [CLAVES.productos]: PRODUCTOS_INICIALES,
    [CLAVES.categorias]: CATEGORIAS_INICIALES,
    [CLAVES.usuarios]: USUARIOS_INICIALES,
    [CLAVES.ordenes]: ORDENES_INICIALES,
    [CLAVES.blogs]: BLOGS_INICIALES,
}

// Siempre devuelve una copia nueva: quien llama puede modificarla sin afectar lo guardado.
export function leer(clave) {
    try {
        const guardado = localStorage.getItem(clave)
        if (guardado) return JSON.parse(guardado)
    } catch {
        // si falla, se usan los datos iniciales
    }
    const iniciales = JSON.parse(JSON.stringify(INICIALES[clave]))
    escribir(clave, iniciales)
    return iniciales
}

export function escribir(clave, lista) {
    try {
        localStorage.setItem(clave, JSON.stringify(lista))
    } catch {
        // sin almacenamiento disponible
    }
}

export function siguienteId(lista) {
    return lista.reduce((maximo, item) => Math.max(maximo, item.id), 0) + 1
}

// Borra lo guardado y vuelve a los datos de db.js (útil para pruebas).
export function restaurar() {
    Object.values(CLAVES).forEach((clave) => localStorage.removeItem(clave))
}