import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../common/Logo'

const ENLACES_ADMIN = [
    { ruta: '/admin', texto: 'Dashboard', icono: '🏠', exacto: true },
    { ruta: '/admin/ordenes', texto: 'Órdenes', icono: '🧾' },
    { ruta: '/admin/productos', texto: 'Productos', icono: '📦' },
    { ruta: '/admin/categorias', texto: 'Categorías', icono: '🏷️' },
    { ruta: '/admin/usuarios', texto: 'Usuarios', icono: '👤' },
    { ruta: '/admin/reportes', texto: 'Reportes', icono: '📊' },
    { ruta: '/admin/perfil', texto: 'Perfil', icono: '⚙️' },
]

function AdminSidebar({ usuario = null, onCerrarSesion }) {
    const claseEnlace = ({ isActive }) =>
        `nav-link text-white rounded mb-1${isActive ? ' bg-danger fw-bold' : ''}`

    const nombreRol = usuario?.rol === 'admin' ? 'Administrador' : usuario?.rol

    return (
        <aside className="col-md-3 col-lg-2 bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center p-3">
        <span className="fw-bold">
          <Logo />
          <small className="d-block text-secondary">Panel admin</small>
        </span>
                <button
                    type="button"
                    className="btn btn-outline-light btn-sm d-md-none"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuAdmin"
                    aria-controls="menuAdmin"
                    aria-expanded="false"
                    aria-label="Mostrar menú del panel"
                >
                    ☰ Menú
                </button>
            </div>

            <div className="collapse d-md-block" id="menuAdmin">
                <nav className="nav flex-column px-2">
                    {ENLACES_ADMIN.map((enlace) => (
                        <NavLink key={enlace.ruta} to={enlace.ruta} end={enlace.exacto} className={claseEnlace}>
                            <span aria-hidden="true">{enlace.icono}</span> {enlace.texto}
                        </NavLink>
                    ))}
                    <Link to="/" className="nav-link text-white rounded mb-1">
                        <span aria-hidden="true">🛒</span> Tienda
                    </Link>
                </nav>

                <div className="border-top border-secondary mt-3 p-3">
                    <strong className="d-block">{usuario?.nombre ?? 'Usuario'}</strong>
                    <span className="small text-secondary d-block mb-2">{nombreRol ?? 'Rol'}</span>
                    <button type="button" className="btn btn-outline-light btn-sm" onClick={onCerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </aside>
    )
}

AdminSidebar.propTypes = {
    usuario: PropTypes.shape({
        nombre: PropTypes.string,
        rol: PropTypes.string,
    }),
    onCerrarSesion: PropTypes.func.isRequired,
}

export default AdminSidebar