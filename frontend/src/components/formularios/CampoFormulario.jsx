import PropTypes from 'prop-types'

// Campo de formulario Bootstrap con etiqueta y mensaje de error.
// `como` permite usar 'input' (por defecto), 'select' o 'textarea'.
function CampoFormulario({
                             name,
                             etiqueta,
                             valor,
                             onChange,
                             onBlur,
                             error,
                             ayuda,
                             opcional = false,
                             tipo = 'text',
                             como = 'input',
                             children,
                             ...resto
                         }) {
    const Control = como
    const clase = `${como === 'select' ? 'form-select' : 'form-control'} ${error ? 'is-invalid' : ''}`

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {etiqueta}
                {opcional && <span className="text-muted"> (opcional)</span>}
            </label>
            <Control
                id={name}
                name={name}
                type={como === 'input' ? tipo : undefined}
                className={clase}
                value={valor}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${name}-error` : undefined}
                {...resto}
            >
                {children}
            </Control>
            {error && (
                <div id={`${name}-error`} className="invalid-feedback">
                    {error}
                </div>
            )}
            {ayuda && !error && <div className="form-text">{ayuda}</div>}
        </div>
    )
}

CampoFormulario.propTypes = {
    name: PropTypes.string.isRequired,
    etiqueta: PropTypes.string.isRequired,
    valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    ayuda: PropTypes.string,
    opcional: PropTypes.bool,
    tipo: PropTypes.string,
    como: PropTypes.oneOf(['input', 'select', 'textarea']),
    children: PropTypes.node,
}

export default CampoFormulario
