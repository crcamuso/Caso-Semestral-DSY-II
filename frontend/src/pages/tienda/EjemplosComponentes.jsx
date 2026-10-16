import ProductCard from '../../components/common/ProductCard'
import CategoryCard from '../../components/common/CategoryCard'
import SearchBar from '../../components/common/SearchBar'
import CartButton from '../../components/common/CartButton'
import { PRODUCTOS_INICIALES, CATEGORIAS_INICIALES } from '../../data/db'

function EjemplosComponentes() {
    const anadir = (id) => alert(`Añadir producto id=${id}`)
    const buscar = (texto) => alert(`Buscar: "${texto}"`)

    const nombreCategoria = (categoriaId) =>
        CATEGORIAS_INICIALES.find((c) => c.id === categoriaId)?.nombre ?? ''

    return (
        <div className="container py-4">
            <h1 className="mb-4">Ejemplos de componentes</h1>

            <h2 className="h5">ProductCard con datos de db.js ({PRODUCTOS_INICIALES.length} productos)</h2>
            <div className="row g-3 mb-4">
                {PRODUCTOS_INICIALES.map((p) => (
                    <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                        <ProductCard
                            id={p.id}
                            nombre={p.nombre}
                            categoria={nombreCategoria(p.categoriaId)}
                            precio={p.precio}
                            precioOferta={p.precioOferta}
                            stock={p.stock}
                            imagen={p.imagen}
                            onAnadir={anadir}
                        />
                    </div>
                ))}
            </div>

            <h2 className="h5">CategoryCard con datos de db.js</h2>
            <div className="row g-3 mb-4">
                {CATEGORIAS_INICIALES.map((c) => (
                    <div className="col-6 col-md-3" key={c.id}>
                        <CategoryCard id={c.id} nombre={c.nombre} descripcion={c.descripcion} icono={c.icono} />
                    </div>
                ))}
            </div>

            <h2 className="h5">SearchBar</h2>
            <div className="bg-danger p-3 rounded mb-4">
                <SearchBar onBuscar={buscar} />
            </div>

            <h2 className="h5">CartButton</h2>
            <div className="d-flex gap-3">
                <CartButton />
                <CartButton total={32980} cantidad={2} />
            </div>
        </div>
    )
}

export default EjemplosComponentes