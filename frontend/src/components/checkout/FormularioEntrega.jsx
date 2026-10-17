import PropTypes from 'prop-types'
import CampoFormulario from '../formularios/CampoFormulario'
import { REGIONES, comunasDeRegion } from '../../data/regiones'

// Datos del cliente y dirección de entrega. El estado vive en el padre (useForm).
function FormularioEntrega({ valores, errorDe, onCambiar, onTocar, onCambiarRegion }) {
    const campo = (name) => ({
        name,
        valor: valores[name],
        onChange: onCambiar,
        onBlur: onTocar,
        error: errorDe(name),
    })

    return (
        <>
            <h2 className="h5">Datos del cliente</h2>
            <div className="row">
                <div className="col-md-6"><CampoFormulario etiqueta="Nombre" {...campo('nombre')} /></div>
                <div className="col-md-6"><CampoFormulario etiqueta="Apellidos" {...campo('apellidos')} /></div>
            </div>
            <CampoFormulario etiqueta="Correo" tipo="email" {...campo('correo')} />

            <h2 className="h5 mt-3">Dirección de entrega</h2>
            <div className="row">
                <div className="col-md-8"><CampoFormulario etiqueta="Calle y número" {...campo('calle')} /></div>
                <div className="col-md-4"><CampoFormulario etiqueta="Departamento" opcional {...campo('departamento')} /></div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Región"
                        como="select"
                        {...campo('region')}
                        onChange={onCambiarRegion}
                    >
                        <option value="">Selecciona una región</option>
                        {REGIONES.map((region) => (
                            <option key={region.nombre} value={region.nombre}>{region.nombre}</option>
                        ))}
                    </CampoFormulario>
                </div>
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Comuna"
                        como="select"
                        disabled={!valores.region}
                        {...campo('comuna')}
                    >
                        <option value="">{valores.region ? 'Selecciona una comuna' : 'Primero elige una región'}</option>
                        {comunasDeRegion(valores.region).map((comuna) => (
                            <option key={comuna} value={comuna}>{comuna}</option>
                        ))}
                    </CampoFormulario>
                </div>
            </div>
            <CampoFormulario etiqueta="Indicaciones para la entrega" como="textarea" rows="2" opcional {...campo('indicaciones')} />
        </>
    )
}

FormularioEntrega.propTypes = {
    valores: PropTypes.object.isRequired,
    errorDe: PropTypes.func.isRequired,
    onCambiar: PropTypes.func.isRequired,
    onTocar: PropTypes.func.isRequired,
    onCambiarRegion: PropTypes.func.isRequired,
}

export default FormularioEntrega
