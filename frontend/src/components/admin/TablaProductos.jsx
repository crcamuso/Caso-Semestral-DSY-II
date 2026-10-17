import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatoCLP } from '../../utils/formatoCLP'

function TablaProductos({ productos, nombreCategoria, onEliminar }) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle bg-white">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th className="text-end">Precio</th>
                    <th className="text-end">Stock</th>
                    <th className="text-end">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {productos.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center text-muted py-4">
                            No hay productos. Crea el primero con el botón &quot;Nuevo producto&quot;.
                        </td>
                    </tr>
                ) : (
                    productos.map((producto) => {
                        const enOferta =
                            producto.oferta &&
                            producto.precioOferta !== null &&
                            producto.precioOferta < producto.precio
                        const critico = producto.stock <= producto.stockCritico

                        return (
                            <tr key={producto.id}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{nombreCategoria(producto.categoriaId)}</td>
                                <td className="text-end text-nowrap">
                                    {enOferta ? (
                                        <>
                        <span className="text-muted text-decoration-line-through me-2">
                          {formatoCLP(producto.precio)}
                        </span>
                                            <span className="fw-bold text-danger">{formatoCLP(producto.precioOferta)}</span>
                                        </>
                                    ) : (
                                        formatoCLP(producto.precio)
                                    )}
                                </td>
                                <td className={`text-end text-nowrap ${critico ? 'text-danger fw-bold' : ''}`}>
                                    {producto.stock}
                                    {critico && <span className="badge bg-danger ms-2">Crítico</span>}
                                </td>
                                <td className="text-end text-nowrap">
                                    <Link
                                        className="btn btn-sm btn-outline-primary me-2"
                                        to={`/admin/productos/${producto.id}/editar`}
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => onEliminar(producto)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                )}
                </tbody>
            </table>
        </div>
    )
}

TablaProductos.propTypes = {
    productos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            codigo: PropTypes.string.isRequired,
            nombre: PropTypes.string.isRequired,
            categoriaId: PropTypes.number.isRequired,
            precio: PropTypes.number.isRequired,
            precioOferta: PropTypes.number,
            oferta: PropTypes.bool,
            stock: PropTypes.number.isRequired,
            stockCritico: PropTypes.number.isRequired,
        }),
    ).isRequired,
    nombreCategoria: PropTypes.func.isRequired,
    onEliminar: PropTypes.func.isRequired,
}

export default TablaProductos