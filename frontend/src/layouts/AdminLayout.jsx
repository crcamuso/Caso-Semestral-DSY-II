import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import { useAuth } from '../hooks/useAuth'

function AdminLayout() {
    const navigate = useNavigate()
    const { usuario, cerrarSesion } = useAuth()

    const salir = () => {
        cerrarSesion()
        navigate('/')
    }

    return (
        <div className="container-fluid">
            <div className="row g-0 min-vh-100">
                <AdminSidebar usuario={usuario} onCerrarSesion={salir} />
                <main className="col-md-9 col-lg-10 bg-light p-3 p-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout