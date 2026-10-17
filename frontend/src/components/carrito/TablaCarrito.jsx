import PropTypes from 'prop-types'
import FilaCarrito from './FilaCarrito'
import { formatoCLP } from '../../utils/formatoCLP'

function TablaCarrito({ lineas, total, onCambiarCantidad, onQuitar, onLimpiar, onComprar }) {
    if (lineas.length === 0) {
        return <p className="text-muted">Tu carrito está vacío. Añade productos desde la lista.</p>
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col"><span className="visually-hidden">Imagen</span></th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col"><span className="visually-hidden">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lineas.map((linea) => (
                            <FilaCarrito
                                key={`${linea.productoId}-${linea.cantidad}`}
                                linea={linea}
                                onCambiarCantidad={onCambiarCantidad}
                                onQuitar={onQuitar}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <p className="fs-4 fw-bold mb-0">Total: {formatoCLP(total)}</p>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={onLimpiar}>
                        Limpiar
                    </button>
                    <button type="button" className="btn btn-danger" onClick={onComprar}>
                        Comprar ahora
                    </button>
                </div>
            </div>
        </>
    )
}

TablaCarrito.propTypes = {
    lineas: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
    onCambiarCantidad: PropTypes.func.isRequired,
    onQuitar: PropTypes.func.isRequired,
    onLimpiar: PropTypes.func.isRequired,
    onComprar: PropTypes.func.isRequired,
}

export default TablaCarrito
