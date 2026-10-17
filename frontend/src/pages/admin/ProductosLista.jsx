import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import TablaProductos from '../../components/admin/TablaProductos'
import ModalConfirmacion from '../../components/admin/ModalConfirmacion'

function ProductosLista() {
  const { productos, categorias, eliminarProducto } = useProducts()
  const location = useLocation()
  const navigate = useNavigate()

  // Mensaje que dejan las pantallas de crear y editar al volver a la lista.
  const [aviso, setAviso] = useState(
      location.state?.mensaje ? { tipo: 'success', texto: location.state.mensaje } : null,
  )
  const [porEliminar, setPorEliminar] = useState(null)

  // Limpia el mensaje del historial para que no reaparezca al recargar.
  useEffect(() => {
    if (location.state?.mensaje) navigate(location.pathname, { replace: true, state: null })
  }, [location, navigate])

  const nombreCategoria = (id) => categorias.find((c) => c.id === id)?.nombre ?? '—'

  const confirmarEliminar = () => {
    const resultado = eliminarProducto(porEliminar.id)
    setAviso(
        resultado.ok
            ? { tipo: 'success', texto: `Producto "${porEliminar.nombre}" eliminado.` }
            : { tipo: 'danger', texto: resultado.mensaje },
    )
    setPorEliminar(null)
  }

  return (
      <>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h1 className="h3 mb-0">Productos ({productos.length})</h1>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/admin/productos/criticos" className="btn btn-outline-secondary">
              Stock crítico
            </Link>
            <Link to="/admin/productos/reportes" className="btn btn-outline-secondary">
              Reportes
            </Link>
            <Link to="/admin/productos/nuevo" className="btn btn-danger">
              Nuevo producto
            </Link>
          </div>
        </div>

        {aviso && (
            <div className={`alert alert-${aviso.tipo} alert-dismissible`} role="alert">
              {aviso.texto}
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setAviso(null)} />
            </div>
        )}

        <TablaProductos
            productos={productos}
            nombreCategoria={nombreCategoria}
            onEliminar={setPorEliminar}
        />

        <ModalConfirmacion
            visible={porEliminar !== null}
            titulo="Eliminar producto"
            mensaje={
              porEliminar
                  ? `¿Seguro que quieres eliminar "${porEliminar.nombre}"? Esta acción no se puede deshacer.`
                  : ''
            }
            onConfirmar={confirmarEliminar}
            onCancelar={() => setPorEliminar(null)}
        />
      </>
  )
}

export default ProductosLista