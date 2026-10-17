import { Link, useLocation } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { obtenerBlogPorId } from '../../services/blogService'

const ETIQUETAS = {
    productos: 'Productos',
    categorias: 'Categorías',
    ofertas: 'Ofertas',
    registro: 'Crear cuenta',
    login: 'Iniciar sesión',
    nosotros: 'Nosotros',
    blog: 'Blogs',
    contacto: 'Contacto',
    carrito: 'Carrito',
    checkout: 'Checkout',
    'pago-correcto': 'Pago correcto',
    'pago-error': 'Pago con error',
}

// Migas de pan según la ruta actual. Los ids se reemplazan por el nombre del producto, categoría o blog.
function Breadcrumbs() {
    const { pathname } = useLocation()
    const { obtenerProducto, obtenerCategoria } = useProducts()

    const segmentos = pathname.split('/').filter(Boolean)
    if (segmentos.length === 0 || !(segmentos[0] in ETIQUETAS)) return null

    const etiquetaDe = (segmento, indice) => {
        if (ETIQUETAS[segmento]) return ETIQUETAS[segmento]
        const padre = segmentos[indice - 1]
        if (padre === 'productos') return obtenerProducto(segmento)?.nombre ?? 'Detalle'
        if (padre === 'categorias') return obtenerCategoria(segmento)?.nombre ?? 'Categoría'
        if (padre === 'blog') return obtenerBlogPorId(segmento)?.titulo ?? 'Artículo'
        return segmento
    }

    const migas = segmentos.map((segmento, indice) => ({
        etiqueta: etiquetaDe(segmento, indice),
        ruta: `/${segmentos.slice(0, indice + 1).join('/')}`,
    }))

    return (
        <nav aria-label="breadcrumb" className="container pt-3 no-imprimir">
            <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {migas.map((miga, indice) =>
                    indice === migas.length - 1 ? (
                        <li key={miga.ruta} className="breadcrumb-item active" aria-current="page">{miga.etiqueta}</li>
                    ) : (
                        <li key={miga.ruta} className="breadcrumb-item"><Link to={miga.ruta}>{miga.etiqueta}</Link></li>
                    ),
                )}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
