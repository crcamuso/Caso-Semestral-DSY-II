import PropTypes from 'prop-types'

function CriticalStockTable({ productos }) {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="h5">Productos con stock igual o inferior al crítico</h2>
                <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th className="text-end">Stock</th>
                            <th className="text-end">Stock crítico</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productos.length === 0 ? (
                            <tr>
                                <td colSpan="4">No hay productos con stock crítico.</td>
                            </tr>
                        ) : (
                            productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td className="text-end text-danger fw-bold">{producto.stock}</td>
                                    <td className="text-end">{producto.stockCritico}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

CriticalStockTable.propTypes = {
    productos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            codigo: PropTypes.string.isRequired,
            nombre: PropTypes.string.isRequired,
            stock: PropTypes.number.isRequired,
            stockCritico: PropTypes.number.isRequired,
        }),
    ).isRequired,
}

export default CriticalStockTable