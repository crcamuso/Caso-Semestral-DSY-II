import ProductCard from '../../components/common/ProductCard.jsx'
import CategoryCard from '../../components/common/CategoryCard.jsx'
import SearchBar from '../../components/common/SearchBar.jsx'
import CartButton from '../../components/common/CartButton.jsx'

function EjemplosComponentes() {
    const anadir = (id) => alert(`Añadir producto id=${id}`)
    const buscar = (texto) => alert(`Buscar: "${texto}"`)

    return (
        <div className="container py-4">
            <h1 className="mb-4">Ejemplos de componentes</h1>

            <h2 className="h5">ProductCard</h2>
            <div className="row g-3 mb-4">
                <div className="col-6 col-md-4 col-lg-3">
                    <ProductCard
                        id={1}
                        nombre="Cilindro de gas 15 kg"
                        categoria="Cilindros de gas"
                        precio={24990}
                        stock={12}
                        onAnadir={anadir}
                    />
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <ProductCard
                        id={2}
                        nombre="Regulador de gas"
                        categoria="Reguladores"
                        precio={9990}
                        precioOferta={7990}
                        stock={5}
                        onAnadir={anadir}
                    />
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <ProductCard
                        id={3}
                        nombre="Manguera de gas 2 m"
                        categoria="Mangueras"
                        precio={4990}
                        stock={0}
                        onAnadir={anadir}
                    />
                </div>
            </div>

            <h2 className="h5">CategoryCard</h2>
            <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                    <CategoryCard id={1} nombre="Cilindros de gas" descripcion="5, 11, 15 y 45 kg" />
                </div>
                <div className="col-6 col-md-3">
                    <CategoryCard id={2} nombre="Reguladores" icono="🔧" seleccionada />
                </div>
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