import { useEffect, useState } from 'react'

const DESPLAZAMIENTO_MINIMO = 300

// Botón flotante que aparece al bajar en la página y sube suavemente al inicio.
function BotonVolverArriba() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const alDesplazar = () => setVisible(window.scrollY > DESPLAZAMIENTO_MINIMO)
        window.addEventListener('scroll', alDesplazar)
        return () => window.removeEventListener('scroll', alDesplazar)
    }, [])

    if (!visible) return null

    return (
        <button
            type="button"
            className="btn btn-danger position-fixed bottom-0 end-0 m-3 shadow no-imprimir"
            aria-label="Volver arriba"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            ↑
        </button>
    )
}

export default BotonVolverArriba
