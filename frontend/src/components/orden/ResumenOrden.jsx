import PropTypes from 'prop-types'
import { formatoCLP } from '../../utils/formatoCLP'

function formatoFecha(iso) {
    const [anio, mes, dia] = String(iso).split('-')
    return `${dia}-${mes}-${anio}`
}

// Detalle de solo lectura de una orden: se reutiliza en pago correcto, pago con error y boleta del admin.
function ResumenOrden({ orden, etiquetaTotal = 'Total pagado' }) {
    const { cliente, direccion } = orden

    return (
        <article className="boleta card shadow-sm">
            <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
                    <div>
                        <h2 className="h5 mb-0">Distribuidora de Gas El Volcán</h2>
                        <small className="text-muted">Av. Collín 450, Chillán · +56 42 221 3456</small>
                    </div>
                    <div className="text-md-end">
                        <div className="fw-bold">Orden {orden.numero}</div>
                        <small className="text-muted">Fecha: {formatoFecha(orden.fecha)}</small>
                        <div><span className="badge bg-secondary">{orden.estado}</span></div>
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <h3 className="h6">Cliente</h3>
                        <p className="mb-0">{cliente.nombre} {cliente.apellidos}</p>
                        <p className="mb-0 text-muted">{cliente.correo}</p>
                    </div>
                    <div className="col-md-6">
                        <h3 className="h6">Dirección de entrega</h3>
                        <p className="mb-0">
                            {direccion.calle}
                            {direccion.departamento && `, Depto. ${direccion.departamento}`}
                        </p>
                        <p className="mb-0 text-muted">{direccion.comuna}, {direccion.region}</p>
                        {direccion.indicaciones && (
                            <p className="mb-0 small">Indicaciones: {direccion.indicaciones}</p>
                        )}
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col" className="text-end">Precio</th>
                                <th scope="col" className="text-end">Cantidad</th>
                                <th scope="col" className="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orden.items.map((item) => (
                                <tr key={item.productoId}>
                                    <td>{item.nombre}</td>
                                    <td className="text-end">{formatoCLP(item.precio)}</td>
                                    <td className="text-end">{item.cantidad}</td>
                                    <td className="text-end">{formatoCLP(item.precio * item.cantidad)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="3" className="text-end">{etiquetaTotal}</th>
                                <th className="text-end fs-5">{formatoCLP(orden.total)}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </article>
    )
}

ResumenOrden.propTypes = {
    etiquetaTotal: PropTypes.string,
    orden: PropTypes.shape({
        numero: PropTypes.string.isRequired,
        fecha: PropTypes.string.isRequired,
        estado: PropTypes.string.isRequired,
        cliente: PropTypes.object.isRequired,
        direccion: PropTypes.object.isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
}

export default ResumenOrden
