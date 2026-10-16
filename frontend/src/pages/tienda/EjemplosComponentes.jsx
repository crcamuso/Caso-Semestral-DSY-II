import ProductCard from '../../components/common/ProductCard'
import CategoryCard from '../../components/common/CategoryCard'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'

function EjemplosComponentes() {
    const { productos, categorias, crearProducto, eliminarProducto } = useProducts()
    const { agregar, cantidadTotal, total } = useCart()
    const { usuario, iniciarSesion, cerrarSesion } = useAuth()

    const nombreCategoria = (categoriaId) =>
        categorias.find((c) => c.id === categoriaId)?.nombre ?? ''

    const anadir = (id) => {
        const resultado = agregar(id, 1)
        alert(resultado.mensaje)
    }

    const crearDePrueba = () => {
        const resultado = crearProducto({
            codigo: `T${Date.now() % 100000}`,
            categoriaId: 4,
            nombre: 'Producto de prueba',
            precio: 1000,
            stock: 10,
            stockCritico: 2,
            oferta: false,
        })
        if (!resultado.ok) alert(JSON.stringify(resultado.errores))
    }

    const borrarDePrueba = () => {
        const ultimo = [...productos].reverse().find((p) => p.codigo.startsWith('T'))
        if (ultimo) eliminarProducto(ultimo.id)
    }

    return (
        <div className="container py-4">
            <h1 className="mb-4">Prueba de contextos</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <p className="mb-2">
                        <strong>Sesión:</strong>{' '}
                        {usuario ? `${usuario.nombre} (${usuario.rol})` : 'sin sesión'}
                    </p>
                    <p className="mb-3">
                        <strong>Carrito:</strong> {cantidadTotal} unidades, total {total.toLocaleString('es-CL')}
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                        <button className="btn btn-outline-dark btn-sm"
                                onClick={() => alert(iniciarSesion('admin@duoc.cl', 'admin123').ok ? 'Sesión admin abierta' : 'Error')}>
                            Entrar como admin
                        </button>
                        <button className="btn btn-outline-dark btn-sm"
                                onClick={() => alert(iniciarSesion('camila@gmail.com', 'cliente123').ok ? 'Sesión cliente abierta' : 'Error')}>
                            Entrar como cliente
                        </button>
                        <button className="btn btn-outline-dark btn-sm" onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>
                        <button className="btn btn-outline-success btn-sm" onClick={crearDePrueba}>
                            Crear producto de prueba
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={borrarDePrueba}>
                            Eliminar producto de prueba
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="h5">Productos ({productos.length})</h2>
            <div className="row g-3 mb-4">
                {productos.map((p) => (
                    <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                        <ProductCard
                            id={p.id}
                            nombre={p.nombre}
                            categoria={nombreCategoria(p.categoriaId)}
                            precio={p.precio}
                            precioOferta={p.precioOferta}
                            stock={p.stock}
                            imagen={p.imagen}
                            onAnadir={anadir}
                        />
                    </div>
                ))}
            </div>

            <h2 className="h5">Categorías ({categorias.length})</h2>
            <div className="row g-3">
                {categorias.map((c) => (
                    <div className="col-6 col-md-3" key={c.id}>
                        <CategoryCard id={c.id} nombre={c.nombre} descripcion={c.descripcion} icono={c.icono} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EjemplosComponentes