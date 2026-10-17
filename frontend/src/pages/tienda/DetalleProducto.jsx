import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Aviso from '../../components/common/Aviso'
import { useProducts } from '../../hooks/useProducts'
import { useAvisoCarrito } from '../../hooks/useAvisoCarrito'
import { formatoCLP } from '../../utils/formatoCLP'
import { precioVigente } from '../../utils/precios'

function DetalleProducto() {
    const { id } = useParams()
    const { obtenerProducto, obtenerCategoria } = useProducts()
    const { aviso, anadir, cerrarAviso } = useAvisoCarrito()
    const [cantidad, setCantidad] = useState(1)

    const producto = obtenerProducto(id)

    if (!producto) {
        return (
            <div className="container py-5 text-center">
                <h1 className="h3">Producto no encontrado</h1>
                <p className="text-muted">El producto que buscas no existe o fue eliminado.</p>
                <Link to="/productos" className="btn btn-danger">Volver a productos</Link>
            </div>
        )
    }

    const categoria = obtenerCategoria(producto.categoriaId)
    const precio = precioVigente(producto)
    const enOferta = precio !== producto.precio
    const sinStock = producto.stock <= 0

    const cambiarCantidad = (evento) => {
        const nueva = Math.floor(Number(evento.target.value))
        if (Number.isFinite(nueva)) setCantidad(Math.min(Math.max(nueva, 1), Math.max(producto.stock, 1)))
    }

    return (
        <div className="container py-4">
            <Aviso aviso={aviso} onCerrar={cerrarAviso} />

            <div className="row g-4">
                <div className="col-md-5">
                    {producto.imagen ? (
                        <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded shadow-sm" />
                    ) : (
                        <div
                            className="bg-light rounded d-flex align-items-center justify-content-center display-1"
                            style={{ height: '320px' }}
                            aria-hidden="true"
                        >
                            {categoria?.icono ?? '📦'}
                        </div>
                    )}
                </div>

                <div className="col-md-7">
                    {categoria && (
                        <Link to={`/categorias/${categoria.id}`} className="badge bg-secondary text-decoration-none mb-2">
                            {categoria.nombre}
                        </Link>
                    )}
                    <h1 className="h2">{producto.nombre}</h1>
                    <p className="text-muted small mb-3">Código: {producto.codigo}</p>

                    <p className="mb-3">{producto.descripcion}</p>

                    <p className="fs-3 mb-1">
                        {enOferta && (
                            <span className="text-muted text-decoration-line-through fs-5 me-2">
                                {formatoCLP(producto.precio)}
                            </span>
                        )}
                        <span className={`fw-bold ${enOferta ? 'text-danger' : ''}`}>{formatoCLP(precio)}</span>
                    </p>
                    <p className={sinStock ? 'text-danger' : 'text-muted'}>
                        {sinStock ? 'Sin stock disponible' : `Stock disponible: ${producto.stock} unidades`}
                    </p>

                    <div className="d-flex align-items-end gap-3 flex-wrap">
                        <div>
                            <label htmlFor="cantidad" className="form-label small mb-1">Cantidad</label>
                            <input
                                id="cantidad"
                                type="number"
                                className="form-control"
                                style={{ width: '100px' }}
                                min="1"
                                max={producto.stock}
                                value={cantidad}
                                disabled={sinStock}
                                onChange={cambiarCantidad}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            disabled={sinStock}
                            onClick={() => anadir(producto.id, cantidad)}
                        >
                            Agregar al carrito
                        </button>
                    </div>

                    <Link to="/productos" className="d-inline-block mt-4">← Volver a productos</Link>
                </div>
            </div>
        </div>
    )
}

export default DetalleProducto
