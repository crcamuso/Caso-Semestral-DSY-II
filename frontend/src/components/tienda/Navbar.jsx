import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../common/Logo'
import SearchBar from '../common/SearchBar'
import CartButton from '../common/CartButton'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'

function Navbar() {
    const navigate = useNavigate()
    const { categorias } = useProducts()
    const { total, cantidadTotal } = useCart()
    const { usuario, esAdmin, cerrarSesion } = useAuth()

    const buscar = (texto) => {
        navigate(texto ? `/productos?q=${encodeURIComponent(texto)}` : '/productos')
    }

    const salir = () => {
        cerrarSesion()
        navigate('/')
    }

    const claseEnlace = ({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <Logo />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuTienda"
                    aria-controls="menuTienda"
                    aria-expanded="false"
                    aria-label="Mostrar menú"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="menuTienda">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={claseEnlace} to="/" end>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={claseEnlace} to="/productos">Productos</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={(e) => e.preventDefault()}
                            >
                                Categorías
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/categorias">Todas las categorías</Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                {categorias.map((categoria) => (
                                    <li key={categoria.id}>
                                        <Link className="dropdown-item" to={`/categorias/${categoria.id}`}>
                                            {categoria.nombre}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink className={claseEnlace} to="/ofertas">Ofertas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={claseEnlace} to="/nosotros">Nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={claseEnlace} to="/blog">Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={claseEnlace} to="/contacto">Contacto</NavLink>
                        </li>
                    </ul>

                    <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
                        <SearchBar onBuscar={buscar} />

                        {usuario ? (
                            <>
                                <span className="text-white small text-nowrap">Hola, {usuario.nombre}</span>
                                {esAdmin && (
                                    <Link className="btn btn-outline-light text-nowrap" to="/admin">Panel</Link>
                                )}
                                <button type="button" className="btn btn-outline-light text-nowrap" onClick={salir}>
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-light text-nowrap" to="/login">Iniciar Sesión</Link>
                                <Link className="btn btn-light text-nowrap" to="/registro">Crear Cuenta</Link>
                            </>
                        )}

                        <CartButton total={total} cantidad={cantidadTotal} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar