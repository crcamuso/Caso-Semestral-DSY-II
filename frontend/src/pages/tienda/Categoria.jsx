import { Link, useParams } from 'react-router-dom'
import FilaCategorias from '../../components/categorias/FilaCategorias'
import ListaProductos from '../../components/common/ListaProductos'
import Aviso from '../../components/common/Aviso'
import { useProducts } from '../../hooks/useProducts'
import { useAvisoCarrito } from '../../hooks/useAvisoCarrito'

function Categoria() {
    const { id } = useParams()
    const { productos, categorias, obtenerCategoria } = useProducts()
    const { aviso, anadir, cerrarAviso } = useAvisoCarrito()

    const categoria = obtenerCategoria(id)

    if (!categoria) {
        return (
            <div className="container py-5 text-center">
                <h1 className="h3">Categoría no encontrada</h1>
                <Link to="/categorias" className="btn btn-danger">Ver todas las categorías</Link>
            </div>
        )
    }

    const productosDeCategoria = productos.filter((p) => p.categoriaId === categoria.id)

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Categorías</h1>
            <FilaCategorias categorias={categorias} seleccionadaId={categoria.id} />

            <h2 className="h4 mb-3">{categoria.nombre}</h2>
            <Aviso aviso={aviso} onCerrar={cerrarAviso} />
            <ListaProductos
                productos={productosDeCategoria}
                categorias={categorias}
                onAnadir={anadir}
                mensajeVacio="Esta categoría todavía no tiene productos."
            />
        </div>
    )
}

export default Categoria
