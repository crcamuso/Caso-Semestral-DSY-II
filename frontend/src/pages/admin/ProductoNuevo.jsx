import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import ProductForm from '../../components/admin/ProductForm'
import { VALORES_NUEVO_PRODUCTO } from '../../utils/valoresProducto'

function ProductoNuevo() {
  const navigate = useNavigate()
  const { categorias, crearProducto } = useProducts()
  const [erroresServidor, setErroresServidor] = useState({})

  const guardar = (valores) => {
    const resultado = crearProducto(valores)
    if (!resultado.ok) {
      setErroresServidor(resultado.errores ?? { general: resultado.mensaje })
      return
    }
    navigate('/admin/productos', {
      state: { mensaje: `Producto "${resultado.dato.nombre}" creado.` },
    })
  }

  return (
      <>
        <h1 className="h3 mb-4">Nuevo producto</h1>
        <div className="card shadow-sm">
          <div className="card-body">
            <ProductForm
                valoresIniciales={VALORES_NUEVO_PRODUCTO}
                categorias={categorias}
                onGuardar={guardar}
                onCancelar={() => navigate('/admin/productos')}
                textoGuardar="Crear producto"
                erroresServidor={erroresServidor}
            />
          </div>
        </div>
      </>
  )
}

export default ProductoNuevo