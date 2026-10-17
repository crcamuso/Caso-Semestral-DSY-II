import PropTypes from 'prop-types'
import CampoFormulario from './CampoFormulario'
import { useForm } from '../../hooks/useForm'
import { esRequerido, maximo, minimo, validarCorreo } from '../../utils/validaciones'

const VALORES_INICIALES = {
    nombre: '',
    apellidos: '',
    correo: '',
    clave: '',
    repetirClave: '',
    direccion: '',
}

function validar(valores) {
    const errores = {}
    if (!esRequerido(valores.nombre)) errores.nombre = 'El nombre es obligatorio.'
    else if (!maximo(valores.nombre.trim(), 50)) errores.nombre = 'El nombre admite hasta 50 caracteres.'

    if (!esRequerido(valores.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.'
    else if (!maximo(valores.apellidos.trim(), 100)) errores.apellidos = 'Los apellidos admiten hasta 100 caracteres.'

    if (!esRequerido(valores.correo)) errores.correo = 'El correo es obligatorio.'
    else if (!validarCorreo(valores.correo.trim())) {
        errores.correo = 'Usa un correo válido de @duoc.cl, @profesor.duoc.cl o @gmail.com.'
    }

    if (!minimo(valores.clave, 6) || !maximo(valores.clave, 20)) {
        errores.clave = 'La contraseña debe tener entre 6 y 20 caracteres.'
    }
    if (!esRequerido(valores.repetirClave)) errores.repetirClave = 'Repite la contraseña.'
    else if (valores.repetirClave !== valores.clave) errores.repetirClave = 'Las contraseñas no coinciden.'

    if (!maximo(valores.direccion, 300)) errores.direccion = 'La dirección admite hasta 300 caracteres.'
    return errores
}

// `erroresServidor` trae los errores que devuelve el service (ej: correo ya registrado).
function FormularioRegistro({ onRegistrar, erroresServidor = {} }) {
    const { valores, valido, cambiar, tocar, tocarTodos, errorDe } = useForm(VALORES_INICIALES, validar)

    const enviar = (evento) => {
        evento.preventDefault()
        tocarTodos()
        if (valido) onRegistrar(valores)
    }

    const campo = (name) => ({
        name,
        valor: valores[name],
        onChange: cambiar,
        onBlur: tocar,
        error: errorDe(name) ?? erroresServidor[name],
    })

    return (
        <form onSubmit={enviar} noValidate>
            {erroresServidor.general && (
                <div className="alert alert-danger" role="alert">{erroresServidor.general}</div>
            )}
            <div className="row">
                <div className="col-md-6"><CampoFormulario etiqueta="Nombre" autoComplete="given-name" {...campo('nombre')} /></div>
                <div className="col-md-6"><CampoFormulario etiqueta="Apellidos" autoComplete="family-name" {...campo('apellidos')} /></div>
            </div>
            <CampoFormulario etiqueta="Correo" tipo="email" autoComplete="email" {...campo('correo')} />
            <div className="row">
                <div className="col-md-6">
                    <CampoFormulario etiqueta="Contraseña" tipo="password" autoComplete="new-password" {...campo('clave')} />
                </div>
                <div className="col-md-6">
                    <CampoFormulario etiqueta="Repetir contraseña" tipo="password" autoComplete="new-password" {...campo('repetirClave')} />
                </div>
            </div>
            <CampoFormulario etiqueta="Dirección" opcional autoComplete="street-address" {...campo('direccion')} />
            <button type="submit" className="btn btn-danger w-100">Crear cuenta</button>
        </form>
    )
}

FormularioRegistro.propTypes = {
    onRegistrar: PropTypes.func.isRequired,
    erroresServidor: PropTypes.object,
}

export default FormularioRegistro
