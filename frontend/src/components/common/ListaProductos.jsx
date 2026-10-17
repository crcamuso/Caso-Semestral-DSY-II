import PropTypes from 'prop-types'
import ProductCard from './ProductCard'
import { precioVigente } from '../../utils/precios'

// Grilla responsiva de ProductCard. No lee datos globales: todo llega por props.
function ListaProductos({ productos, categorias, onAnadir, mensajeVacio = 'No hay productos para mostrar.' }) {
    if (productos.length === 0) {
        return <p className="text-muted text-center py-4">{mensajeVacio}</p>
    }

    const nombreCategoria = (categoriaId) =>
        categorias.find((c) => c.id === categoriaId)?.nombre ?? ''

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {productos.map((producto) => {
                const enOferta = precioVigente(producto) !== producto.precio
                return (
                    <div className="col" key={producto.id}>
                        <ProductCard
                            id={producto.id}
                            nombre={producto.nombre}
                            categoria={nombreCategoria(producto.categoriaId)}
                            precio={producto.precio}
                            precioOferta={enOferta ? producto.precioOferta : null}
                            stock={producto.stock}
                            imagen={producto.imagen}
                            onAnadir={onAnadir}
                        />
                    </div>
                )
            })}
        </div>
    )
}

ListaProductos.propTypes = {
    productos: PropTypes.arrayOf(PropTypes.object).isRequired,
    categorias: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAnadir: PropTypes.func.isRequired,
    mensajeVacio: PropTypes.string,
}

export default ListaProductos
