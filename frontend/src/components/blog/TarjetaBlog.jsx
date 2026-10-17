import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatoFechaLarga } from '../../utils/formatoFecha'

function TarjetaBlog({ id, titulo, fecha, imagen = '', icono = '📰', resumen }) {
    return (
        <div className="card h-100 shadow-sm">
            {imagen ? (
                <img src={imagen} alt={titulo} className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} />
            ) : (
                <div
                    className="bg-light d-flex align-items-center justify-content-center display-3"
                    style={{ height: '160px' }}
                    aria-hidden="true"
                >
                    {icono}
                </div>
            )}
            <div className="card-body d-flex flex-column">
                <small className="text-muted">{formatoFechaLarga(fecha)}</small>
                <h2 className="h5 card-title">{titulo}</h2>
                <p className="card-text">{resumen}</p>
                <Link to={`/blog/${id}`} className="btn btn-outline-danger mt-auto">Leer más</Link>
            </div>
        </div>
    )
}

TarjetaBlog.propTypes = {
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    imagen: PropTypes.string,
    icono: PropTypes.string,
    resumen: PropTypes.string.isRequired,
}

export default TarjetaBlog
