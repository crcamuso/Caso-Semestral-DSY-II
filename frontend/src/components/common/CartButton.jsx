import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function CartButton({ total = 0, cantidad = 0 }) {
    const totalFormateado = total.toLocaleString('es-CL')

    return (
        <Link to="/carrito" className="btn btn-warning position-relative">
            Carrito · ${totalFormateado}
            {cantidad > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
          {cantidad}
        </span>
            )}
        </Link>
    )
}

CartButton.propTypes = {
    total: PropTypes.number,
    cantidad: PropTypes.number,
}

export default CartButton