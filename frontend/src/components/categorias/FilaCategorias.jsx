import PropTypes from 'prop-types'
import CategoryCard from '../common/CategoryCard'

function FilaCategorias({ categorias, seleccionadaId = null }) {
    return (
        <div className="row row-cols-2 row-cols-md-4 g-3 mb-4">
            {categorias.map((categoria) => (
                <div className="col" key={categoria.id}>
                    <CategoryCard
                        id={categoria.id}
                        nombre={categoria.nombre}
                        descripcion={categoria.descripcion}
                        icono={categoria.icono}
                        seleccionada={categoria.id === seleccionadaId}
                    />
                </div>
            ))}
        </div>
    )
}

FilaCategorias.propTypes = {
    categorias: PropTypes.arrayOf(PropTypes.object).isRequired,
    seleccionadaId: PropTypes.number,
}

export default FilaCategorias
