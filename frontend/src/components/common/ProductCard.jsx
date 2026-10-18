import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatoCLP } from '../../utils/formatoCLP'

function ProductCard({
                         id,
                         nombre,
                         categoria = '',
                         precio,
                         precioOferta = null,
                         stock,
                         imagen = '',
                         onAnadir,
                     }) {
    const enOferta = precioOferta !== null && precioOferta < precio
    const sinStock = stock <= 0

    return (
        <div className="card h-100 shadow-sm position-relative">
            {enOferta && (
                <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
          Oferta
        </span>
            )}

            {imagen ? (
                <img
                    src={imagen}
                    alt={nombre}
                    className="card-img-top bg-white p-2"
                    style={{ height: '180px', objectFit: 'contain' }}
                />
            ) : (
                <div
                    className="bg-light d-flex align-items-center justify-content-center fs-1"
                    style={{ height: '180px' }}
                    aria-hidden="true"
                >
                    📦
                </div>
            )}

            <div className="card-body d-flex flex-column">
                {categoria && <span className="text-muted small">{categoria}</span>}

                <h3 className="h6 card-title">
                    <Link to={`/productos/${id}`} className="text-decoration-none text-dark">
                        {nombre}
                    </Link>
                </h3>

                <div className="mb-2">
                    {enOferta ? (
                        <>
              <span className="text-muted text-decoration-line-through me-2">
                {formatoCLP(precio)}
              </span>
                            <span className="fw-bold text-danger">{formatoCLP(precioOferta)}</span>
                        </>
                    ) : (
                        <span className="fw-bold">{formatoCLP(precio)}</span>
                    )}
                </div>

                <p className={`small mb-3 ${sinStock ? 'text-danger' : 'text-muted'}`}>
                    {sinStock ? 'Sin stock' : `Stock: ${stock}`}
                </p>

                <button
                    type="button"
                    className="btn btn-danger mt-auto"
                    disabled={sinStock}
                    onClick={() => onAnadir(id)}
                >
                    Añadir
                </button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    categoria: PropTypes.string,
    precio: PropTypes.number.isRequired,
    precioOferta: PropTypes.number,
    stock: PropTypes.number.isRequired,
    imagen: PropTypes.string,
    onAnadir: PropTypes.func.isRequired,
}

export default ProductCard