import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ListaProductos from '../common/ListaProductos'

function OfertasHome({ productos, categorias, onAnadir }) {
    return (
        <section className="container pb-5" aria-labelledby="titulo-ofertas">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 id="titulo-ofertas" className="h3 mb-0">Productos en oferta</h2>
                <Link to="/ofertas">Ver todas</Link>
            </div>
            <ListaProductos
                productos={productos}
                categorias={categorias}
                onAnadir={onAnadir}
                mensajeVacio="Por ahora no hay productos en oferta."
            />
        </section>
    )
}

OfertasHome.propTypes = {
    productos: PropTypes.arrayOf(PropTypes.object).isRequired,
    categorias: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAnadir: PropTypes.func.isRequired,
}

export default OfertasHome
