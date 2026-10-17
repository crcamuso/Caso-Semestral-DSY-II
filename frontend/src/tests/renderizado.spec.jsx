/* global describe, it, expect, afterEach */
import { MemoryRouter } from 'react-router-dom'
import ListaProductos from '../components/common/ListaProductos'
import ProductCard from '../components/common/ProductCard'
import Aviso from '../components/common/Aviso'
import CampoFormulario from '../components/formularios/CampoFormulario'
import { renderizar, buscarBoton } from './renderizar'

// Datos de prueba: no dependen de db.js ni de localStorage.
const CATEGORIAS_PRUEBA = [
    { id: 1, nombre: 'Cilindros de Gas' },
    { id: 2, nombre: 'Reguladores' },
]

const PRODUCTOS_PRUEBA = [
    { id: 1, categoriaId: 1, nombre: 'Cilindro de prueba 11 kg', precio: 12000, precioOferta: null, oferta: false, stock: 20, imagen: '' },
    { id: 2, categoriaId: 2, nombre: 'Regulador de prueba', precio: 9000, precioOferta: 7000, oferta: true, stock: 5, imagen: '' },
    { id: 3, categoriaId: 2, nombre: 'Manguera de prueba', precio: 4000, precioOferta: null, oferta: false, stock: 0, imagen: '' },
]

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

describe('ListaProductos (renderizado correcto)', () => {
    const montarLista = (productos) =>
        montar(
            <MemoryRouter>
                <ListaProductos productos={productos} categorias={CATEGORIAS_PRUEBA} onAnadir={() => {}} />
            </MemoryRouter>,
        )

    it('renderiza una tarjeta por cada producto recibido', () => {
        const contenedor = montarLista(PRODUCTOS_PRUEBA)

        // Verifica: la cantidad de tarjetas es igual a la cantidad de productos del conjunto de datos.
        expect(contenedor.querySelectorAll('.card').length).toBe(PRODUCTOS_PRUEBA.length)
    })

    it('muestra el nombre de cada producto', () => {
        const contenedor = montarLista(PRODUCTOS_PRUEBA)

        // Verifica: ningún producto del conjunto se quedó sin mostrar.
        PRODUCTOS_PRUEBA.forEach((producto) => {
            expect(contenedor.textContent).toContain(producto.nombre)
        })
    })

    it('muestra la categoría de cada producto', () => {
        const contenedor = montarLista(PRODUCTOS_PRUEBA)

        // Verifica: el categoriaId se traduce al nombre de la categoría recibida por props.
        expect(contenedor.textContent).toContain('Cilindros de Gas')
        expect(contenedor.textContent).toContain('Reguladores')
    })

    it('muestra el mensaje vacío cuando no hay productos', () => {
        const contenedor = montarLista([])

        // Verifica: sin datos no se dibuja ninguna tarjeta...
        expect(contenedor.querySelectorAll('.card').length).toBe(0)
        // ...y aparece el texto por defecto.
        expect(contenedor.textContent).toContain('No hay productos para mostrar.')
    })
})

describe('ProductCard (renderizado condicional)', () => {
    const BASE = { id: 1, nombre: 'Producto de prueba', categoria: 'Pruebas', precio: 10000, stock: 10, onAnadir: () => {} }
    const montarTarjeta = (props) =>
        montar(
            <MemoryRouter>
                <ProductCard {...BASE} {...props} />
            </MemoryRouter>,
        )

    it('con stock muestra la cantidad y deja el botón habilitado', () => {
        const contenedor = montarTarjeta({ stock: 20 })

        // Verifica: se informa el stock disponible.
        expect(contenedor.textContent).toContain('Stock: 20')
        // Verifica: el botón Añadir no está deshabilitado.
        expect(buscarBoton(contenedor, 'Añadir').disabled).toBe(false)
    })

    it('sin stock muestra "Sin stock" y deshabilita el botón', () => {
        const contenedor = montarTarjeta({ stock: 0 })

        // Verifica: el texto cambia cuando el stock es 0...
        expect(contenedor.textContent).toContain('Sin stock')
        expect(contenedor.textContent).not.toContain('Stock: 0')
        // ...y no se puede añadir al carrito.
        expect(buscarBoton(contenedor, 'Añadir').disabled).toBe(true)
    })

    it('con oferta muestra la insignia y el precio original tachado', () => {
        const contenedor = montarTarjeta({ precio: 10000, precioOferta: 8000 })

        // Verifica: aparece la insignia "Oferta".
        expect(contenedor.querySelector('.badge').textContent).toBe('Oferta')
        // Verifica: el precio original se muestra tachado.
        expect(contenedor.querySelector('.text-decoration-line-through')).not.toBeNull()
    })

    it('sin oferta no muestra la insignia ni el precio tachado', () => {
        const contenedor = montarTarjeta({ precioOferta: null })

        // Verifica: sin precio de oferta esos elementos no existen.
        expect(contenedor.querySelector('.badge')).toBeNull()
        expect(contenedor.querySelector('.text-decoration-line-through')).toBeNull()
    })
})

describe('Mensajes de error (renderizado condicional)', () => {
    it('Aviso con error muestra el mensaje en una alerta de peligro', () => {
        const contenedor = montar(
            <Aviso aviso={{ ok: false, mensaje: 'No hay stock suficiente.' }} onCerrar={() => {}} />,
        )

        // Verifica: existe la alerta roja con el texto del error.
        expect(contenedor.querySelector('.alert-danger')).not.toBeNull()
        expect(contenedor.textContent).toContain('No hay stock suficiente.')
    })

    it('Aviso sin mensaje no renderiza nada', () => {
        const contenedor = montar(<Aviso aviso={null} onCerrar={() => {}} />)

        // Verifica: si no hay error, el contenedor queda vacío (no aparece ningún mensaje).
        expect(contenedor.innerHTML).toBe('')
    })

    it('Aviso de éxito usa alerta verde y no la de error', () => {
        const contenedor = montar(
            <Aviso aviso={{ ok: true, mensaje: 'Producto añadido.' }} onCerrar={() => {}} />,
        )

        // Verifica: el tipo de alerta depende de aviso.ok.
        expect(contenedor.querySelector('.alert-success')).not.toBeNull()
        expect(contenedor.querySelector('.alert-danger')).toBeNull()
    })

    it('CampoFormulario muestra el error solo cuando recibe uno', () => {
        const contenedor = montar(
            <CampoFormulario name="nombre" etiqueta="Nombre" valor="" onChange={() => {}} error="El nombre es obligatorio." />,
        )

        // Verifica: el mensaje aparece y el campo se marca como inválido.
        expect(contenedor.querySelector('.invalid-feedback').textContent).toBe('El nombre es obligatorio.')
        expect(contenedor.querySelector('input').className).toContain('is-invalid')
    })

    it('CampoFormulario sin error no muestra ningún mensaje', () => {
        const contenedor = montar(
            <CampoFormulario name="nombre" etiqueta="Nombre" valor="Ana" onChange={() => {}} />,
        )

        // Verifica: sin error no hay mensaje ni marca de inválido.
        expect(contenedor.querySelector('.invalid-feedback')).toBeNull()
        expect(contenedor.querySelector('input').className).not.toContain('is-invalid')
    })
})