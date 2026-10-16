import { Navigate, Outlet } from 'react-router-dom'

const CLAVE_SESION = 'gasvolcan_sesion'

function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_SESION))
    } catch {
        return null
    }
}

function RutaAdmin() {
    const sesion = obtenerSesion()
    const esAdmin = sesion?.rol === 'admin'

    if (!esAdmin) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default RutaAdmin