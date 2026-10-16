import { leer, CLAVES } from './almacen'

export function listarBlogs() {
    return leer(CLAVES.blogs)
}

export function obtenerBlogPorId(id) {
    return leer(CLAVES.blogs).find((b) => b.id === Number(id)) ?? null
}