import { act } from 'react'
import { createRoot } from 'react-dom/client'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Monta un elemento en un div del documento y devuelve cómo limpiarlo.
export function renderizar(elemento) {
    const contenedor = document.createElement('div')
    document.body.appendChild(contenedor)
    const raiz = createRoot(contenedor)

    act(() => {
        raiz.render(elemento)
    })

    return {
        contenedor,
        desmontar() {
            act(() => raiz.unmount())
            contenedor.remove()
        },
    }
}

// Busca un botón por su texto exacto.
export function buscarBoton(contenedor, texto) {
    return (
        Array.from(contenedor.querySelectorAll('button')).find(
            (boton) => boton.textContent.trim() === texto,
        ) ?? null
    )
}

export function hacerClic(elemento) {
    act(() => {
        elemento.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    })
}

// React ignora value = '...' directo: hay que usar el setter nativo y disparar 'input'.
export function escribir(campo, valor) {
    const prototipo =
        campo instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const asignar = Object.getOwnPropertyDescriptor(prototipo, 'value').set
    act(() => {
        asignar.call(campo, valor)
        campo.dispatchEvent(new Event('input', { bubbles: true }))
    })
}

export function seleccionar(select, valor) {
    const asignar = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set
    act(() => {
        asignar.call(select, valor)
        select.dispatchEvent(new Event('change', { bubbles: true }))
    })
}

export function salirDelCampo(campo) {
    act(() => {
        campo.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    })
}

export function enviarFormulario(formulario) {
    act(() => {
        formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })
}