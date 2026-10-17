import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ResumenOrden from '../../components/orden/ResumenOrden'
import { obtenerOrdenPorId } from '../../services/orderService'

const MOTIVO_POR_DEFECTO = 'No pudimos procesar el pago. Intenta nuevamente.'

function PagoError() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const orden = state?.ordenId ? obtenerOrdenPorId(state.ordenId) : null

    if (!orden) return <Navigate to="/carrito" replace />

    // El carrito no se tocó, así que solo hay que devolver los datos que el cliente ya escribió.
    const reintentar = () => {
        const datos = state.datos ?? {
            ...orden.cliente,
            ...orden.direccion,
        }
        navigate('/checkout', { state: { datos } })
    }

    return (
        <div className="container py-4">
            <div className="alert alert-danger" role="alert">
                <h1 className="h4 mb-1">No se pudo completar el pago</h1>
                <p className="mb-1">{state.motivo ?? MOTIVO_POR_DEFECTO}</p>
                <p className="mb-0 small">
                    Número de orden: <strong>{orden.numero}</strong>. No se realizó ningún cobro ni se descontó stock.
                </p>
            </div>

            <ResumenOrden orden={orden} />

            <div className="d-flex flex-wrap gap-2 mt-3">
                <button type="button" className="btn btn-danger" onClick={reintentar}>
                    Volver a realizar el pago
                </button>
                <Link to="/carrito" className="btn btn-outline-secondary">Revisar carrito</Link>
            </div>
        </div>
    )
}

export default PagoError
