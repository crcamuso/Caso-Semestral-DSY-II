import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from './CartContext'
import { useProducts } from '../hooks/useProducts'
import { precioVigente } from '../utils/precios'

const CLAVE_CARRITO = 'gasvolcan_v2_carrito'

function leerCarrito() {
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO))
        return Array.isArray(guardado) ? guardado : []
    } catch {
        return []
    }
}

// Debe ir dentro de ProductsProvider: necesita los productos para precios y stock.
export function CartProvider({ children }) {
    const { productos } = useProducts()
    const [items, setItems] = useState(leerCarrito)

    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items))
        } catch {
            // sin almacenamiento disponible
        }
    }, [items])

    // Une cada item con su producto actual. Si el producto ya no existe o no tiene stock, se omite.
    const lineas = useMemo(
        () =>
            items
                .map((item) => {
                    const producto = productos.find((p) => p.id === item.productoId)
                    if (!producto) return null
                    const cantidad = Math.min(item.cantidad, producto.stock)
                    const precio = precioVigente(producto)
                    return {
                        productoId: producto.id,
                        nombre: producto.nombre,
                        imagen: producto.imagen,
                        precio,
                        stock: producto.stock,
                        cantidad,
                        subtotal: precio * cantidad,
                    }
                })
                .filter((linea) => linea && linea.cantidad > 0),
        [items, productos],
    )

    const total = useMemo(() => lineas.reduce((suma, l) => suma + l.subtotal, 0), [lineas])
    const cantidadTotal = useMemo(() => lineas.reduce((suma, l) => suma + l.cantidad, 0), [lineas])

    const agregar = useCallback(
        (productoId, cantidad = 1) => {
            const producto = productos.find((p) => p.id === Number(productoId))
            if (!producto) return { ok: false, mensaje: 'El producto no existe.' }
            if (producto.stock <= 0) return { ok: false, mensaje: `${producto.nombre} no tiene stock.` }

            const actual = items.find((i) => i.productoId === producto.id)?.cantidad ?? 0
            const nueva = actual + Number(cantidad)
            if (nueva > producto.stock) {
                return { ok: false, mensaje: `Solo quedan ${producto.stock} unidades de ${producto.nombre}.` }
            }

            setItems((previos) =>
                previos.some((i) => i.productoId === producto.id)
                    ? previos.map((i) => (i.productoId === producto.id ? { ...i, cantidad: nueva } : i))
                    : [...previos, { productoId: producto.id, cantidad: nueva }],
            )
            return { ok: true, mensaje: `${producto.nombre} añadido al carrito.` }
        },
        [productos, items],
    )

    const cambiarCantidad = useCallback(
        (productoId, cantidad) => {
            const producto = productos.find((p) => p.id === Number(productoId))
            if (!producto) return { ok: false, mensaje: 'El producto no existe.' }

            const nueva = Math.floor(Number(cantidad))
            if (!Number.isFinite(nueva) || nueva < 1) {
                return { ok: false, mensaje: 'La cantidad mínima es 1.' }
            }
            if (nueva > producto.stock) {
                return { ok: false, mensaje: `Solo quedan ${producto.stock} unidades de ${producto.nombre}.` }
            }

            setItems((previos) =>
                previos.map((i) => (i.productoId === producto.id ? { ...i, cantidad: nueva } : i)),
            )
            return { ok: true }
        },
        [productos],
    )

    const quitar = useCallback((productoId) => {
        setItems((previos) => previos.filter((i) => i.productoId !== Number(productoId)))
    }, [])

    const vaciar = useCallback(() => setItems([]), [])

    const value = useMemo(
        () => ({ lineas, total, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar }),
        [lineas, total, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar],
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
}