import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './AuthContext'
import { autenticar, crearUsuario } from '../services/userService'

// Misma clave que usa el guard de rutas admin.
const CLAVE_SESION = 'gasvolcan_sesion'

function leerSesion() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_SESION))
    } catch {
        return null
    }
}

function guardarSesion(sesion) {
    try {
        if (sesion) localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
        else localStorage.removeItem(CLAVE_SESION)
    } catch {
        // sin almacenamiento disponible
    }
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(leerSesion)

    const abrirSesion = useCallback((datosUsuario) => {
        // En la sesión nunca se guarda la contraseña.
        const sesion = {
            id: datosUsuario.id,
            nombre: datosUsuario.nombre,
            apellidos: datosUsuario.apellidos,
            correo: datosUsuario.correo,
            rol: datosUsuario.rol,
        }
        guardarSesion(sesion)
        setUsuario(sesion)
        return sesion
    }, [])

    const iniciarSesion = useCallback(
        (correo, clave) => {
            const encontrado = autenticar(correo, clave)
            if (!encontrado) return { ok: false, mensaje: 'Correo o contraseña incorrectos.' }
            return { ok: true, usuario: abrirSesion(encontrado) }
        },
        [abrirSesion],
    )

    // Registro público: siempre crea un cliente y deja la sesión abierta.
    const registrar = useCallback(
        (datos) => {
            const resultado = crearUsuario({ ...datos, rol: 'cliente' })
            if (!resultado.ok) return resultado
            return { ok: true, usuario: abrirSesion(resultado.dato) }
        },
        [abrirSesion],
    )

    const cerrarSesion = useCallback(() => {
        guardarSesion(null)
        setUsuario(null)
    }, [])

    const value = useMemo(
        () => ({
            usuario,
            esAdmin: usuario?.rol === 'admin',
            iniciarSesion,
            registrar,
            cerrarSesion,
        }),
        [usuario, iniciarSesion, registrar, cerrarSesion],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}