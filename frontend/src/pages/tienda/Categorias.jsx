import FilaCategorias from '../../components/categorias/FilaCategorias'
import { useProducts } from '../../hooks/useProducts'

function Categorias() {
    const { categorias } = useProducts()

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Categorías</h1>
            <FilaCategorias categorias={categorias} />
            <p className="text-muted">Selecciona una categoría para ver sus productos.</p>
        </div>
    )
}

export default Categorias
