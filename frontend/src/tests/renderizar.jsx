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