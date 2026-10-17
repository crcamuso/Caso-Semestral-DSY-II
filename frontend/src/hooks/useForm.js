import { useState } from 'react'

// Maneja los valores de un formulario y valida en tiempo real.
// `validar(valores)` debe devolver un objeto { campo: 'mensaje' } (vacío si todo está bien).
// Un error solo se muestra cuando el campo fue modificado o el usuario salió de él.
export function useForm(valoresIniciales, validar) {
    const [valores, setValores] = useState(valoresIniciales)
    const [tocados, setTocados] = useState({})

    const errores = validar(valores)
    const valido = Object.keys(errores).length === 0

    const cambiar = (evento) => {
        const { name, value, type, checked } = evento.target
        setValores((previos) => ({ ...previos, [name]: type === 'checkbox' ? checked : value }))
        setTocados((previos) => ({ ...previos, [name]: true }))
    }

    const tocar = (evento) => {
        const { name } = evento.target
        setTocados((previos) => ({ ...previos, [name]: true }))
    }

    // Para forzar que se vean todos los errores, por ejemplo al intentar enviar.
    const tocarTodos = () => {
        setTocados(Object.fromEntries(Object.keys(valores).map((campo) => [campo, true])))
    }

    // Cambia varios valores a la vez (ej: al cambiar la región se limpia la comuna).
    const establecer = (nuevos) => setValores((previos) => ({ ...previos, ...nuevos }))

    const reiniciar = () => {
        setValores(valoresIniciales)
        setTocados({})
    }

    const errorDe = (campo) => (tocados[campo] ? errores[campo] : undefined)

    return { valores, errores, valido, cambiar, tocar, tocarTodos, establecer, reiniciar, errorDe }
}
