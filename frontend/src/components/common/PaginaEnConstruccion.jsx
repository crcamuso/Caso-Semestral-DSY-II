import PropTypes from 'prop-types'

function PaginaEnConstruccion({ titulo }) {
    return (
        <div className="container py-5 text-center">
            <h1 className="mb-3">{titulo}</h1>
            <p className="text-muted">Vista en construcción.</p>
        </div>
    )
}

PaginaEnConstruccion.propTypes = {
    titulo: PropTypes.string.isRequired,
}

export default PaginaEnConstruccion