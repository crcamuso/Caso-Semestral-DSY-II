import ListaProductos from '../../components/common/ListaProductos'
import Aviso from '../../components/common/Aviso'
import { useProducts } from '../../hooks/useProducts'
import { useAvisoCarrito } from '../../hooks/useAvisoCarrito'
import { precioVigente } from '../../utils/precios'

function Ofertas() {
    const { productos, categorias } = useProducts()
    const { aviso, anadir, cerrarAviso } = useAvisoCarrito()

    const ofertas = productos.filter((p) => precioVigente(p) !== p.precio)

    return (
        <div className="container py-4">
            <h1 className="h2 mb-1">Ofertas</h1>
            <p className="text-muted mb-4">Productos con precio rebajado por tiempo limitado.</p>
            <Aviso aviso={aviso} onCerrar={cerrarAviso} />
            <ListaProductos
                productos={ofertas}
                categorias={categorias}
                onAnadir={anadir}
                mensajeVacio="Por ahora no hay productos en oferta."
            />
        </div>
    )
}

export default Ofertas
