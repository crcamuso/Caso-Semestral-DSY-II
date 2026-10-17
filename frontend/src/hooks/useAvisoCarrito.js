import { useCallback, useState } from 'react'
import { useCart } from './useCart'

// Añade productos al carrito y guarda el mensaje de resultado para mostrarlo con <Aviso />.
export function useAvisoCarrito() {
    const { agregar } = useCart()
    const [aviso, setAviso] = useState(null)

    const anadir = useCallback(
        (productoId, cantidad = 1) => {
            const resultado = agregar(productoId, cantidad)
            setAviso({ ok: resultado.ok, mensaje: resultado.mensaje })
            return resultado
        },
        [agregar],
    )

    const mostrarAviso = useCallback((ok, mensaje) => setAviso({ ok, mensaje }), [])
    const cerrarAviso = useCallback(() => setAviso(null), [])

    return { aviso, anadir, mostrarAviso, cerrarAviso }
}
