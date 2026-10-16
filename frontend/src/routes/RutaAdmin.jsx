import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function RutaAdmin() {
    const { esAdmin } = useAuth()

    if (!esAdmin) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default RutaAdmin