import ListaProductos from '../../components/common/ListaProductos'
import Aviso from '../../components/common/Aviso'
import { useProducts } from '../../hooks/useProducts'
import { useAvisoCarrito } from '../../hooks/useAvisoCarrito'

function Productos() {
    const { productos, categorias } = useProducts()
    const { aviso, anadir, cerrarAviso } = useAvisoCarrito()

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Productos</h1>
            <Aviso aviso={aviso} onCerrar={cerrarAviso} />
            <ListaProductos productos={productos} categorias={categorias} onAnadir={anadir} />
        </div>
    )
}

export default Productos
