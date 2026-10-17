import PropTypes from 'prop-types'
import CategoryCard from '../common/CategoryCard'

function CategoriasDestacadas({ categorias }) {
    return (
        <section className="container py-5" aria-labelledby="titulo-categorias">
            <h2 id="titulo-categorias" className="h3 mb-4">Categorías destacadas</h2>
            <div className="row row-cols-2 row-cols-md-4 g-3">
                {categorias.map((categoria) => (
                    <div className="col" key={categoria.id}>
                        <CategoryCard
                            id={categoria.id}
                            nombre={categoria.nombre}
                            descripcion={categoria.descripcion}
                            icono={categoria.icono}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

CategoriasDestacadas.propTypes = {
    categorias: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CategoriasDestacadas
