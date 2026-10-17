/* global describe, it, expect, beforeEach, afterEach, jasmine */
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import TablaCarrito from '../components/carrito/TablaCarrito'
import { ProductsProvider } from '../context/ProductsProvider'
import { CartProvider } from '../context/CartProvider'
import { useCart } from '../hooks/useCart'
import { PRODUCTOS_INICIALES } from '../data/db'
import { renderizar, buscarBoton, hacerClic } from './renderizar'

// Misma clave que usa CartProvider para guardar el carrito.
const CLAVE_CARRITO = 'gasvolcan_v2_carrito'

let vista
const montar = (elemento) => {
    vista = renderizar(elemento)
    return vista.contenedor
}

afterEach(() => {
    if (vista) {
        vista.desmontar()
        vista = null
    }
})

describe('Eventos: botón Añadir de ProductCard', () => {
    const BASE = { id: 7, nombre: 'Producto de prueba', categoria: 'Pruebas', precio: 10000, stock: 10 }
    const montarTarjeta = (props) =>
        montar(
            <MemoryRouter>
                <ProductCard {...BASE} {...props} />
            </MemoryRouter>,
        )

    it('al hacer clic ejecuta la función recibida con el id del producto', () => {
        const onAnadir = jasmine.createSpy('onAnadir')
        const contenedor = montarTarjeta({ onAnadir })

        hacerClic(buscarBoton(contenedor, 'Añadir'))

        // Verifica: se llamó una vez y con el id del producto de la tarjeta.
        expect(onAnadir).toHaveBeenCalledTimes(1)
        expect(onAnadir).toHaveBeenCalledWith(7)
    })

    it('sin stock el botón está deshabilitado y el clic no ejecuta la función', () => {
        const onAnadir = jasmine.createSpy('onAnadir')
        const contenedor = montarTarjeta({ onAnadir, stock: 0 })

        hacerClic(buscarBoton(contenedor, 'Añadir'))

        expect(onAnadir).not.toHaveBeenCalled()
    })
})

describe('Eventos: botones de TablaCarrito (con spies)', () => {
    const LINEAS = [
        { productoId: 7, nombre: 'Producto A', imagen: '', precio: 1000, stock: 10, cantidad: 2, subtotal: 2000 },
    ]

    const montarTabla = (acciones) =>
        montar(
            <TablaCarrito
                lineas={LINEAS}
                total={2000}
                onCambiarCantidad={() => ({ ok: true })}
                onQuitar={() => {}}
                onLimpiar={() => {}}
                onComprar={() => {}}
                {...acciones}
            />,
        )

    it('Eliminar llama a onQuitar con el id del producto de la fila', () => {
        const onQuitar = jasmine.createSpy('onQuitar')
        const contenedor = montarTabla({ onQuitar })

        hacerClic(buscarBoton(contenedor, 'Eliminar'))

        expect(onQuitar).toHaveBeenCalledTimes(1)
        expect(onQuitar).toHaveBeenCalledWith(7)
    })

    it('Limpiar llama a onLimpiar', () => {
        const onLimpiar = jasmine.createSpy('onLimpiar')
        const contenedor = montarTabla({ onLimpiar })

        hacerClic(buscarBoton(contenedor, 'Limpiar'))

        expect(onLimpiar).toHaveBeenCalledTimes(1)
    })

    it('Comprar ahora llama a onComprar', () => {
        const onComprar = jasmine.createSpy('onComprar')
        const contenedor = montarTabla({ onComprar })

        hacerClic(buscarBoton(contenedor, 'Comprar ahora'))

        expect(onComprar).toHaveBeenCalledTimes(1)
    })
})

// Componente de prueba: conecta TablaCarrito con el CartProvider real.
function CarritoConectado() {
    const { lineas, total, cantidadTotal, cambiarCantidad, quitar, vaciar } = useCart()
    return (
        <>
            <p id="cantidad-total">{cantidadTotal}</p>
            <TablaCarrito
                lineas={lineas}
                total={total}
                onCambiarCantidad={cambiarCantidad}
                onQuitar={quitar}
                onLimpiar={vaciar}
                onComprar={() => {}}
            />
        </>
    )
}

describe('Eventos: Eliminar en el carrito cambia el estado (providers reales)', () => {
    const montarCarrito = () =>
        montar(
            <ProductsProvider>
                <CartProvider>
                    <CarritoConectado />
                </CartProvider>
            </ProductsProvider>,
        )

    beforeEach(() => {
        localStorage.clear()
        // Carrito inicial: 2 unidades del producto 1 y 1 unidad del producto 2.
        localStorage.setItem(
            CLAVE_CARRITO,
            JSON.stringify([
                { productoId: 1, cantidad: 2 },
                { productoId: 2, cantidad: 1 },
            ]),
        )
    })

    afterEach(() => {
        localStorage.clear()
    })

    it('parte con las dos líneas del carrito guardado', () => {
        const contenedor = montarCarrito()

        expect(contenedor.querySelectorAll('tbody tr').length).toBe(2)
        expect(contenedor.querySelector('#cantidad-total').textContent).toBe('3')
    })

    it('al hacer clic en Eliminar quita la línea, baja la cantidad y actualiza lo guardado', () => {
        const contenedor = montarCarrito()

        hacerClic(buscarBoton(contenedor, 'Eliminar'))

        // Verifica: el estado cambió y la tabla tiene una línea menos.
        expect(contenedor.querySelectorAll('tbody tr').length).toBe(1)
        expect(contenedor.querySelector('#cantidad-total').textContent).toBe('1')
        expect(contenedor.textContent).not.toContain(PRODUCTOS_INICIALES[0].nombre)
        expect(contenedor.textContent).toContain(PRODUCTOS_INICIALES[1].nombre)
        // Verifica: el cambio se guardó en localStorage.
        expect(JSON.parse(localStorage.getItem(CLAVE_CARRITO)).length).toBe(1)
    })

    it('al eliminar la última línea aparece el mensaje de carrito vacío', () => {
        const contenedor = montarCarrito()

        hacerClic(buscarBoton(contenedor, 'Eliminar'))
        hacerClic(buscarBoton(contenedor, 'Eliminar'))

        expect(contenedor.textContent).toContain('Tu carrito está vacío')
        expect(contenedor.querySelector('#cantidad-total').textContent).toBe('0')
    })

    it('Limpiar vacía todo el carrito', () => {
        const contenedor = montarCarrito()

        hacerClic(buscarBoton(contenedor, 'Limpiar'))

        expect(contenedor.textContent).toContain('Tu carrito está vacío')
        expect(JSON.parse(localStorage.getItem(CLAVE_CARRITO)).length).toBe(0)
    })
})