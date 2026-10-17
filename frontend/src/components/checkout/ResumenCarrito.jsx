import PropTypes from 'prop-types'
import { formatoCLP } from '../../utils/formatoCLP'

// Tabla de solo lectura con lo que se va a pagar.
function ResumenCarrito({ lineas, total }) {
    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col" className="text-end">Precio</th>
                        <th scope="col" className="text-end">Cantidad</th>
                        <th scope="col" className="text-end">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {lineas.map((linea) => (
                        <tr key={linea.productoId}>
                            <td>{linea.nombre}</td>
                            <td className="text-end">{formatoCLP(linea.precio)}</td>
                            <td className="text-end">{linea.cantidad}</td>
                            <td className="text-end">{formatoCLP(linea.subtotal)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3" className="text-end">Total a pagar</th>
                        <th className="text-end fs-5">{formatoCLP(total)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

ResumenCarrito.propTypes = {
    lineas: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
}

export default ResumenCarrito
