import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import ProductForm from '../../components/admin/ProductForm'
import { valoresDesdeProducto } from '../../utils/valoresProducto'

function ProductoEditar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { obtenerProducto, categorias, actualizarProducto } = useProducts()
  const [erroresServidor, setErroresServidor] = useState({})

  const producto = obtenerProducto(id)

  if (!producto) {
    return (
        <>
          <h1 className="h3 mb-3">Producto no encontrado</h1>
          <p>El producto que buscas no existe o fue eliminado.</p>
          <Link to="/admin/productos" className="btn btn-outline-secondary">
            Volver a productos
          </Link>
        </>
    )
  }

  const guardar = (valores) => {
    const resultado = actualizarProducto(producto.id, valores)
    if (!resultado.ok) {
      setErroresServidor(resultado.errores ?? { general: resultado.mensaje })
      return
    }
    navigate('/admin/productos', {
      state: { mensaje: `Producto "${resultado.dato.nombre}" actualizado.` },
    })
  }

  return (
      <>
        <h1 className="h3 mb-4">Editar producto</h1>
        <div className="card shadow-sm">
          <div className="card-body">
            {/* La key reinicia el formulario si se cambia de producto. */}
            <ProductForm
                key={producto.id}
                valoresIniciales={valoresDesdeProducto(producto)}
                categorias={categorias}
                onGuardar={guardar}
                onCancelar={() => navigate('/admin/productos')}
                textoGuardar="Guardar cambios"
                erroresServidor={erroresServidor}
            />
          </div>
        </div>
      </>
  )
}

export default ProductoEditar