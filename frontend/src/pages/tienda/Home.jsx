import CarruselHome from '../../components/home/CarruselHome'
import CategoriasDestacadas from '../../components/home/CategoriasDestacadas'
import OfertasHome from '../../components/home/OfertasHome'
import ComoFunciona from '../../components/home/ComoFunciona'
import Aviso from '../../components/common/Aviso'
import { useProducts } from '../../hooks/useProducts'
import { useAvisoCarrito } from '../../hooks/useAvisoCarrito'
import { precioVigente } from '../../utils/precios'

function Home() {
    const { productos, categorias } = useProducts()
    const { aviso, anadir, cerrarAviso } = useAvisoCarrito()

    const ofertas = productos.filter((p) => precioVigente(p) !== p.precio).slice(0, 4)

    return (
        <>
            <CarruselHome />
            <CategoriasDestacadas categorias={categorias} />
            <div className="container">
                <Aviso aviso={aviso} onCerrar={cerrarAviso} />
            </div>
            <OfertasHome productos={ofertas} categorias={categorias} onAnadir={anadir} />
            <ComoFunciona />
        </>
    )
}

export default Home
