import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function CategoryCard({ id, nombre, descripcion = '', icono = '🔥', seleccionada = false }) {
    return (
        <Link
            to={`/categorias/${id}`}
            className={`card h-100 text-decoration-none text-center shadow-sm ${
                seleccionada ? 'border-danger border-2' : ''
            }`}
        >
            <div className="card-body">
                <div className="fs-1" aria-hidden="true">{icono}</div>
                <h3 className={`h6 card-title mt-2 ${seleccionada ? 'text-danger' : 'text-dark'}`}>
                    {nombre}
                </h3>
                {descripcion && <p className="card-text small text-muted mb-0">{descripcion}</p>}
            </div>
        </Link>
    )
}

CategoryCard.propTypes = {
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    icono: PropTypes.string,
    seleccionada: PropTypes.bool,
}

export default CategoryCard