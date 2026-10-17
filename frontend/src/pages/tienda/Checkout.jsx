import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ResumenCarrito from '../../components/checkout/ResumenCarrito'
import FormularioEntrega from '../../components/checkout/FormularioEntrega'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../hooks/useProducts'
import { useForm } from '../../hooks/useForm'
import { crearOrden, actualizarEstadoOrden } from '../../services/orderService'
import { obtenerUsuarioPorId } from '../../services/userService'
import { simularPago, RESULTADOS_PAGO } from '../../services/pagoService'
import { esRequerido, tieneFormatoCorreo } from '../../utils/validaciones'

const CAMPOS_VACIOS = {
    nombre: '', apellidos: '', correo: '',
    calle: '', departamento: '', region: '', comuna: '', indicaciones: '',
}

function validar(valores) {
    const errores = {}
    if (!esRequerido(valores.nombre)) errores.nombre = 'El nombre es obligatorio.'
    if (!esRequerido(valores.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.'
    if (!esRequerido(valores.correo)) errores.correo = 'El correo es obligatorio.'
    else if (!tieneFormatoCorreo(valores.correo.trim())) errores.correo = 'El correo no es válido.'
    if (!esRequerido(valores.calle)) errores.calle = 'La calle es obligatoria.'
    if (!esRequerido(valores.region)) errores.region = 'Selecciona una región.'
    if (!esRequerido(valores.comuna)) errores.comuna = 'Selecciona una comuna.'
    return errores
}

// Valores iniciales: datos de un intento anterior (pago con error) o, si no, los del usuario con sesión.
function valoresIniciales(datosPrevios, sesion) {
    if (datosPrevios) return { ...CAMPOS_VACIOS, ...datosPrevios }
    if (!sesion) return CAMPOS_VACIOS

    const perfil = obtenerUsuarioPorId(sesion.id)
    return {
        ...CAMPOS_VACIOS,
        nombre: sesion.nombre,
        apellidos: sesion.apellidos,
        correo: sesion.correo,
        calle: perfil?.direccion ?? '',
        region: perfil?.region ?? '',
        comuna: perfil?.comuna ?? '',
    }
}

function Checkout() {
    const navigate = useNavigate()
    const location = useLocation()
    const { usuario } = useAuth()
    const { lineas, total } = useCart()
    const { descontarStock } = useProducts()
    const [modoPago, setModoPago] = useState('aleatorio')
    const [errorGeneral, setErrorGeneral] = useState('')

    const { valores, valido, cambiar, tocar, tocarTodos, establecer, errorDe } = useForm(
        valoresIniciales(location.state?.datos, usuario),
        validar,
    )

    if (lineas.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h1 className="h3">Tu carrito está vacío</h1>
                <p className="text-muted">Agrega productos antes de ir a pagar.</p>
                <Link to="/productos" className="btn btn-danger">Ver productos</Link>
            </div>
        )
    }

    const cambiarRegion = (evento) => establecer({ region: evento.target.value, comuna: '' })

    const pagar = (evento) => {
        evento.preventDefault()
        setErrorGeneral('')
        tocarTodos()
        if (!valido) return

        const creada = crearOrden({
            usuarioId: usuario?.id ?? null,
            cliente: { nombre: valores.nombre, apellidos: valores.apellidos, correo: valores.correo },
            direccion: {
                calle: valores.calle,
                departamento: valores.departamento,
                region: valores.region,
                comuna: valores.comuna,
                indicaciones: valores.indicaciones,
            },
            items: lineas.map((l) => ({
                productoId: l.productoId,
                nombre: l.nombre,
                precio: l.precio,
                cantidad: l.cantidad,
            })),
        })
        if (!creada.ok) return setErrorGeneral(Object.values(creada.errores).join(' '))

        const orden = creada.dato
        const resultado = simularPago(modoPago)
        let motivo = resultado.motivo

        // Solo se descuenta el stock cuando el pago fue aprobado.
        if (resultado.aprobado) {
            const stock = descontarStock(lineas.map((l) => ({ productoId: l.productoId, cantidad: l.cantidad })))
            if (!stock.ok) motivo = stock.mensaje
            else return navigate('/pago-correcto', { state: { ordenId: orden.id } })
        }

        actualizarEstadoOrden(orden.id, 'Pago fallido')
        navigate('/pago-error', { state: { ordenId: orden.id, motivo, datos: valores } })
    }

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Checkout</h1>

            <h2 className="h5">Resumen del carrito</h2>
            <ResumenCarrito lineas={lineas} total={total} />

            {errorGeneral && <div className="alert alert-danger" role="alert">{errorGeneral}</div>}

            <form onSubmit={pagar} noValidate className="mt-4">
                <FormularioEntrega
                    valores={valores}
                    errorDe={errorDe}
                    onCambiar={cambiar}
                    onTocar={tocar}
                    onCambiarRegion={cambiarRegion}
                />

                <div className="card bg-light mb-3">
                    <div className="card-body py-2 d-flex flex-wrap align-items-center gap-2">
                        <label htmlFor="modoPago" className="form-label mb-0 small">
                            Simulación de pago (solo demo):
                        </label>
                        <select
                            id="modoPago"
                            className="form-select form-select-sm w-auto"
                            value={modoPago}
                            onChange={(e) => setModoPago(e.target.value)}
                        >
                            {RESULTADOS_PAGO.map((modo) => (
                                <option key={modo} value={modo}>{modo}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="d-flex justify-content-between gap-2">
                    <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
                    <button type="submit" className="btn btn-danger btn-lg">Pagar ahora</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout
