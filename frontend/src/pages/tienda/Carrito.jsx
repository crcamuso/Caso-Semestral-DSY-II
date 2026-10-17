import { useNavigate } from 'react-router-dom'
import Aviso from '../../components/common/Aviso'
import ProductosParaAgregar from '../../components/carrito/ProductosParaAgregar'
import TablaCarrito from '../../components/carrito/TablaCarrito'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { useAvisoCarrito } from '../../hooks/useAvisoCarrito'

function Carrito() {
    const navigate = useNavigate()
    const { productos } = useProducts()
    const { lineas, total, cambiarCantidad, quitar, vaciar } = useCart()
    const { aviso, anadir, mostrarAviso, cerrarAviso } = useAvisoCarrito()

    const cambiar = (productoId, cantidad) => {
        const resultado = cambiarCantidad(productoId, cantidad)
        if (!resultado.ok) mostrarAviso(false, resultado.mensaje)
        return resultado
    }

    const comprar = () => {
        if (lineas.length === 0) return mostrarAviso(false, 'Agrega productos antes de comprar.')
        navigate('/checkout')
    }

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Carrito de compra</h1>
            <Aviso aviso={aviso} onCerrar={cerrarAviso} />

            <div className="row g-4">
                <section className="col-lg-5" aria-label="Productos disponibles">
                    <h2 className="h5">Productos</h2>
                    <ProductosParaAgregar productos={productos} onAnadir={anadir} />
                </section>

                <section className="col-lg-7" aria-label="Tu carrito">
                    <h2 className="h5">Tu carrito</h2>
                    <TablaCarrito
                        lineas={lineas}
                        total={total}
                        onCambiarCantidad={cambiar}
                        onQuitar={quitar}
                        onLimpiar={vaciar}
                        onComprar={comprar}
                    />
                </section>
            </div>
        </div>
    )
}

export default Carrito
