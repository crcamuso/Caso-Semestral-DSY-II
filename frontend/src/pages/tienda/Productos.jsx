import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ListaProductos from '../../components/common/ListaProductos'
import FiltrosProductos from '../../components/productos/FiltrosProductos'
import Aviso from '../../components/common/Aviso'
import { useProducts } from '../../hooks/useProducts'
import { useAvisoCarrito } from '../../hooks/useAvisoCarrito'
import { FILTROS_INICIALES, filtrarProductos } from '../../utils/filtrosProductos'

function Productos() {
    const { productos, categorias } = useProducts()
    const { aviso, anadir, cerrarAviso } = useAvisoCarrito()
    const [parametros] = useSearchParams()
    const [filtros, setFiltros] = useState(FILTROS_INICIALES)

    // El texto viene del buscador del navbar (/productos?q=...).
    const texto = parametros.get('q') ?? ''
    const visibles = filtrarProductos(productos, texto, filtros)

    return (
        <div className="container py-4">
            <h1 className="h2 mb-3">Productos</h1>

            {texto && (
                <p className="text-muted">
                    Resultados para «{texto}» · <Link to="/productos">Quitar búsqueda</Link>
                </p>
            )}

            <FiltrosProductos
                filtros={filtros}
                categorias={categorias}
                onCambiar={setFiltros}
                onLimpiar={() => setFiltros(FILTROS_INICIALES)}
            />

            <Aviso aviso={aviso} onCerrar={cerrarAviso} />
            <p className="small text-muted">{visibles.length} producto(s)</p>
            <ListaProductos
                productos={visibles}
                categorias={categorias}
                onAnadir={anadir}
                mensajeVacio="No encontramos productos con esos filtros."
            />
        </div>
    )
}

export default Productos
