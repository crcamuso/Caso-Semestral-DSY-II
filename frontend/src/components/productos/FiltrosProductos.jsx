import PropTypes from 'prop-types'
import { OPCIONES_ORDEN } from '../../utils/filtrosProductos'

// Controles de filtro y orden. No filtra nada: avisa los cambios al padre.
function FiltrosProductos({ filtros, categorias, onCambiar, onLimpiar }) {
    const cambiar = (evento) => {
        const { name, value, type, checked } = evento.target
        onCambiar({ ...filtros, [name]: type === 'checkbox' ? checked : value })
    }

    return (
        <form className="card card-body mb-4" onSubmit={(e) => e.preventDefault()} aria-label="Filtros de productos">
            <div className="row g-3 align-items-end">
                <div className="col-sm-6 col-lg-3">
                    <label htmlFor="categoriaId" className="form-label">Categoría</label>
                    <select id="categoriaId" name="categoriaId" className="form-select" value={filtros.categoriaId} onChange={cambiar}>
                        <option value="">Todas</option>
                        {categorias.map((c) => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col-6 col-lg-2">
                    <label htmlFor="precioMin" className="form-label">Precio mínimo</label>
                    <input id="precioMin" name="precioMin" type="number" min="0" className="form-control" value={filtros.precioMin} onChange={cambiar} />
                </div>
                <div className="col-6 col-lg-2">
                    <label htmlFor="precioMax" className="form-label">Precio máximo</label>
                    <input id="precioMax" name="precioMax" type="number" min="0" className="form-control" value={filtros.precioMax} onChange={cambiar} />
                </div>
                <div className="col-sm-6 col-lg-3">
                    <label htmlFor="orden" className="form-label">Ordenar por</label>
                    <select id="orden" name="orden" className="form-select" value={filtros.orden} onChange={cambiar}>
                        {OPCIONES_ORDEN.map((o) => (
                            <option key={o.valor} value={o.valor}>{o.texto}</option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-6 col-lg-2">
                    <div className="form-check mb-2">
                        <input id="soloOfertas" name="soloOfertas" type="checkbox" className="form-check-input" checked={filtros.soloOfertas} onChange={cambiar} />
                        <label htmlFor="soloOfertas" className="form-check-label">Solo ofertas</label>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onLimpiar}>
                        Limpiar filtros
                    </button>
                </div>
            </div>
        </form>
    )
}

FiltrosProductos.propTypes = {
    filtros: PropTypes.shape({
        categoriaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        precioMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        precioMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        soloOfertas: PropTypes.bool.isRequired,
        orden: PropTypes.string.isRequired,
    }).isRequired,
    categorias: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCambiar: PropTypes.func.isRequired,
    onLimpiar: PropTypes.func.isRequired,
}

export default FiltrosProductos
