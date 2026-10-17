import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormularioRegistro from '../../components/formularios/FormularioRegistro'
import { useAuth } from '../../hooks/useAuth'

function Registro() {
    const navigate = useNavigate()
    const { registrar } = useAuth()
    const [errores, setErrores] = useState({})

    const manejarRegistro = (valores) => {
        const resultado = registrar({
            nombre: valores.nombre.trim(),
            apellidos: valores.apellidos.trim(),
            correo: valores.correo.trim(),
            clave: valores.clave,
            direccion: valores.direccion.trim(),
        })
        if (!resultado.ok) return setErrores(resultado.errores ?? { general: 'No se pudo crear la cuenta.' })
        navigate('/')
    }

    return (
        <div className="container py-5" style={{ maxWidth: '640px' }}>
            <h1 className="h3 mb-4">Crear cuenta</h1>
            <FormularioRegistro onRegistrar={manejarRegistro} erroresServidor={errores} />
            <p className="mt-3 text-center">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    )
}

export default Registro
