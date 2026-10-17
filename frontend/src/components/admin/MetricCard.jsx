import PropTypes from 'prop-types'

function MetricCard({ titulo, valor, detalle = '', variante = 'dark' }) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h3 className="h6 text-muted">{titulo}</h3>
                <p className={`display-6 fw-bold mb-0 text-${variante}`}>{valor}</p>
                {detalle && <p className="small text-muted mb-0 mt-1">{detalle}</p>}
            </div>
        </div>
    )
}

MetricCard.propTypes = {
    titulo: PropTypes.string.isRequired,
    valor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    detalle: PropTypes.string,
    variante: PropTypes.oneOf(['dark', 'danger', 'success', 'primary']),
}

export default MetricCard