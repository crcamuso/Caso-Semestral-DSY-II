import PropTypes from 'prop-types'

function ModalConfirmacion({
                               visible,
                               titulo,
                               mensaje,
                               textoConfirmar = 'Eliminar',
                               onConfirmar,
                               onCancelar,
                           }) {
    if (!visible) return null

    return (
        <>
            <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="tituloModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title h5" id="tituloModal">{titulo}</h2>
                            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancelar} />
                        </div>
                        <div className="modal-body">
                            <p className="mb-0">{mensaje}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-danger" onClick={onConfirmar}>
                                {textoConfirmar}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" />
        </>
    )
}

ModalConfirmacion.propTypes = {
    visible: PropTypes.bool.isRequired,
    titulo: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired,
    textoConfirmar: PropTypes.string,
    onConfirmar: PropTypes.func.isRequired,
    onCancelar: PropTypes.func.isRequired,
}

export default ModalConfirmacion