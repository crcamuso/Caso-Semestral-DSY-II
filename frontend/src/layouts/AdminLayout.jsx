import { Link, Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand fw-bold">GasVolcan · Admin</span>
                    <Link className="btn btn-outline-light btn-sm" to="/">Ir a la tienda</Link>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default AdminLayout