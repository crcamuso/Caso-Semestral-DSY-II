import PropTypes from 'prop-types'

// Mensaje corto (éxito o error) que el usuario puede cerrar.
function Aviso({ aviso, onCerrar }) {
    if (!aviso) return null

    return (
        <div
            className={`alert alert-${aviso.ok ? 'success' : 'danger'} alert-dismissible fade show`}
            role="alert"
        >
            {aviso.mensaje}
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
        </div>
    )
}

Aviso.propTypes = {
    aviso: PropTypes.shape({
        ok: PropTypes.bool.isRequired,
        mensaje: PropTypes.string.isRequired,
    }),
    onCerrar: PropTypes.func.isRequired,
}

export default Aviso
