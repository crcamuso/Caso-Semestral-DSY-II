import PropTypes from 'prop-types'
import CampoFormulario from './CampoFormulario'
import { useForm } from '../../hooks/useForm'
import { esRequerido, maximo, minimo, tieneFormatoCorreo } from '../../utils/validaciones'

const VALORES_INICIALES = { nombre: '', correo: '', mensaje: '' }

function validar(valores) {
    const errores = {}
    if (!esRequerido(valores.nombre)) errores.nombre = 'El nombre es obligatorio.'
    else if (!maximo(valores.nombre.trim(), 100)) errores.nombre = 'El nombre admite hasta 100 caracteres.'

    if (!esRequerido(valores.correo)) errores.correo = 'El correo es obligatorio.'
    else if (!tieneFormatoCorreo(valores.correo.trim())) errores.correo = 'El correo no es válido.'

    if (!esRequerido(valores.mensaje)) errores.mensaje = 'El mensaje es obligatorio.'
    else if (!minimo(valores.mensaje.trim(), 10)) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    else if (!maximo(valores.mensaje, 500)) errores.mensaje = 'El mensaje admite hasta 500 caracteres.'
    return errores
}

function FormularioContacto({ onEnviar }) {
    const { valores, valido, cambiar, tocar, tocarTodos, reiniciar, errorDe } = useForm(VALORES_INICIALES, validar)

    const enviar = (evento) => {
        evento.preventDefault()
        tocarTodos()
        if (!valido) return
        onEnviar(valores)
        reiniciar()
    }

    return (
        <form onSubmit={enviar} noValidate>
            <CampoFormulario
                name="nombre" etiqueta="Nombre completo" autoComplete="name"
                valor={valores.nombre} onChange={cambiar} onBlur={tocar} error={errorDe('nombre')}
            />
            <CampoFormulario
                name="correo" etiqueta="Correo" tipo="email" autoComplete="email"
                valor={valores.correo} onChange={cambiar} onBlur={tocar} error={errorDe('correo')}
            />
            <CampoFormulario
                name="mensaje" etiqueta="Mensaje" como="textarea" rows="5"
                valor={valores.mensaje} onChange={cambiar} onBlur={tocar} error={errorDe('mensaje')}
                ayuda={`${valores.mensaje.length}/500 caracteres`}
            />
            <button type="submit" className="btn btn-danger">Enviar mensaje</button>
        </form>
    )
}

FormularioContacto.propTypes = {
    onEnviar: PropTypes.func.isRequired,
}

export default FormularioContacto
