import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormularioLogin from '../../components/formularios/FormularioLogin'
import { useAuth } from '../../hooks/useAuth'

function Login() {
    const navigate = useNavigate()
    const { iniciarSesion } = useAuth()
    const [mensajeError, setMensajeError] = useState('')

    const manejarInicio = (correo, clave) => {
        const resultado = iniciarSesion(correo, clave)
        if (!resultado.ok) return setMensajeError(resultado.mensaje)
        // El administrador entra directo al panel.
        navigate(resultado.usuario.rol === 'admin' ? '/admin' : '/')
    }

    return (
        <div className="container py-5" style={{ maxWidth: '480px' }}>
            <h1 className="h3 mb-4">Iniciar sesión</h1>
            <FormularioLogin onIniciar={manejarInicio} mensajeError={mensajeError} />
            <p className="mt-3 text-center">
                ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
            </p>
        </div>
    )
}

export default Login
