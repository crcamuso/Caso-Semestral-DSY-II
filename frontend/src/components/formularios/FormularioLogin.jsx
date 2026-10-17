import PropTypes from 'prop-types'
import CampoFormulario from './CampoFormulario'
import { useForm } from '../../hooks/useForm'
import { esRequerido, tieneFormatoCorreo } from '../../utils/validaciones'

function validar(valores) {
    const errores = {}
    if (!esRequerido(valores.correo)) errores.correo = 'El correo es obligatorio.'
    else if (!tieneFormatoCorreo(valores.correo.trim())) errores.correo = 'El correo no es válido.'
    if (!esRequerido(valores.clave)) errores.clave = 'La contraseña es obligatoria.'
    return errores
}

function FormularioLogin({ onIniciar, mensajeError = '' }) {
    const { valores, valido, cambiar, tocar, tocarTodos, errorDe } = useForm({ correo: '', clave: '' }, validar)

    const enviar = (evento) => {
        evento.preventDefault()
        tocarTodos()
        if (valido) onIniciar(valores.correo.trim(), valores.clave)
    }

    return (
        <form onSubmit={enviar} noValidate>
            {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
            <CampoFormulario
                name="correo" etiqueta="Correo" tipo="email" autoComplete="email"
                valor={valores.correo} onChange={cambiar} onBlur={tocar} error={errorDe('correo')}
            />
            <CampoFormulario
                name="clave" etiqueta="Contraseña" tipo="password" autoComplete="current-password"
                valor={valores.clave} onChange={cambiar} onBlur={tocar} error={errorDe('clave')}
            />
            <button type="submit" className="btn btn-danger w-100">Iniciar sesión</button>
        </form>
    )
}

FormularioLogin.propTypes = {
    onIniciar: PropTypes.func.isRequired,
    mensajeError: PropTypes.string,
}

export default FormularioLogin
