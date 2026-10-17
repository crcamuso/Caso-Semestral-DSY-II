import PropTypes from 'prop-types'
import { formatoCLP } from '../../utils/formatoCLP'
import { precioVigente } from '../../utils/precios'

// Lista compacta de productos para sumar al carrito sin salir de la vista.
function ProductosParaAgregar({ productos, onAnadir }) {
    return (
        <ul className="list-group">
            {productos.map((producto) => (
                <li
                    key={producto.id}
                    className="list-group-item d-flex justify-content-between align-items-center gap-2"
                >
                    <div>
                        <div className="fw-semibold">{producto.nombre}</div>
                        <small className="text-muted">
                            {formatoCLP(precioVigente(producto))} ·{' '}
                            {producto.stock > 0 ? `Stock ${producto.stock}` : 'Sin stock'}
                        </small>
                    </div>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        disabled={producto.stock <= 0}
                        onClick={() => onAnadir(producto.id)}
                    >
                        Añadir
                    </button>
                </li>
            ))}
        </ul>
    )
}

ProductosParaAgregar.propTypes = {
    productos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAnadir: PropTypes.func.isRequired,
}

export default ProductosParaAgregar
