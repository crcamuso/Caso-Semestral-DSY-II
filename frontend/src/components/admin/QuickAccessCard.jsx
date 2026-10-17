import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function QuickAccessCard({ titulo, descripcion, ruta, icono }) {
    return (
        <Link to={ruta} className="card h-100 shadow-sm text-decoration-none text-dark">
            <div className="card-body text-center">
                <div className="fs-1" aria-hidden="true">{icono}</div>
                <h3 className="h6 mt-2">{titulo}</h3>
                <p className="small text-muted mb-0">{descripcion}</p>
            </div>
        </Link>
    )
}

QuickAccessCard.propTypes = {
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    ruta: PropTypes.string.isRequired,
    icono: PropTypes.string.isRequired,
}

export default QuickAccessCard