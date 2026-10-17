import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import ResumenOrden from '../../components/orden/ResumenOrden'
import { useCart } from '../../hooks/useCart'
import { obtenerOrdenPorId } from '../../services/orderService'

function PagoCorrecto() {
    const { state } = useLocation()
    const { vaciar } = useCart()
    const orden = state?.ordenId ? obtenerOrdenPorId(state.ordenId) : null

    // La compra ya se pagó: el carrito se limpia al llegar.
    useEffect(() => {
        if (orden) vaciar()
    }, [orden, vaciar])

    if (!orden) return <Navigate to="/" replace />

    const imprimirBoleta = () => window.print()
    const enviarPorEmail = () => {
        window.alert(`Boleta ${orden.numero} enviada a ${orden.cliente.correo} (simulado).`)
    }

    return (
        <div className="container py-4">
            <div className="alert alert-success no-imprimir" role="status">
                <h1 className="h4 mb-1">¡Pago realizado con éxito!</h1>
                <p className="mb-0">
                    Tu pedido <strong>{orden.numero}</strong> quedó registrado. Pronto lo despacharemos.
                </p>
            </div>

            <ResumenOrden orden={orden} />

            <div className="d-flex flex-wrap gap-2 mt-3 no-imprimir">
                <button type="button" className="btn btn-danger" onClick={imprimirBoleta}>
                    Imprimir boleta en PDF
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={enviarPorEmail}>
                    Enviar boleta por email
                </button>
                <Link to="/productos" className="btn btn-outline-secondary ms-md-auto">Seguir comprando</Link>
            </div>
        </div>
    )
}

export default PagoCorrecto
