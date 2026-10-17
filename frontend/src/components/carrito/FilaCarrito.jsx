import { useState } from 'react'
import PropTypes from 'prop-types'
import { formatoCLP } from '../../utils/formatoCLP'

// Una fila del carrito. La cantidad se escribe libremente y se confirma al salir del campo.
function FilaCarrito({ linea, onCambiarCantidad, onQuitar }) {
    const [texto, setTexto] = useState(String(linea.cantidad))

    const confirmar = (valor) => {
        const resultado = onCambiarCantidad(linea.productoId, valor)
        if (!resultado.ok) setTexto(String(linea.cantidad))
        else setTexto(String(Math.floor(Number(valor))))
    }

    return (
        <tr>
            <td style={{ width: '64px' }}>
                {linea.imagen ? (
                    <img src={linea.imagen} alt={linea.nombre} className="img-fluid rounded" />
                ) : (
                    <span className="fs-3" aria-hidden="true">📦</span>
                )}
            </td>
            <td>{linea.nombre}</td>
            <td className="text-nowrap">{formatoCLP(linea.precio)}</td>
            <td style={{ width: '130px' }}>
                <div className="input-group input-group-sm">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={`Restar una unidad de ${linea.nombre}`}
                        onClick={() => confirmar(linea.cantidad - 1)}
                    >
                        −
                    </button>
                    <input
                        type="number"
                        className="form-control text-center"
                        aria-label={`Cantidad de ${linea.nombre}`}
                        min="1"
                        max={linea.stock}
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        onBlur={() => confirmar(texto)}
                        onKeyDown={(e) => e.key === 'Enter' && confirmar(texto)}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={`Sumar una unidad de ${linea.nombre}`}
                        onClick={() => confirmar(linea.cantidad + 1)}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="text-nowrap fw-semibold">{formatoCLP(linea.subtotal)}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onQuitar(linea.productoId)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

FilaCarrito.propTypes = {
    linea: PropTypes.shape({
        productoId: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        imagen: PropTypes.string,
        precio: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        cantidad: PropTypes.number.isRequired,
        subtotal: PropTypes.number.isRequired,
    }).isRequired,
    onCambiarCantidad: PropTypes.func.isRequired,
    onQuitar: PropTypes.func.isRequired,
}

export default FilaCarrito
