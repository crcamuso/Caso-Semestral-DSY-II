import PropTypes from 'prop-types'
import CampoFormulario from '../formularios/CampoFormulario'
import { useForm } from '../../hooks/useForm'
import { validarProducto } from '../../utils/validarProducto'

// `erroresServidor` trae los errores que devuelve el service (ej: código ya existente).
function ProductForm({
                         valoresIniciales,
                         categorias,
                         onGuardar,
                         onCancelar,
                         textoGuardar = 'Guardar',
                         erroresServidor = {},
                     }) {
    const { valores, valido, cambiar, tocar, tocarTodos, errorDe } = useForm(
        valoresIniciales,
        validarProducto,
    )

    const enviar = (evento) => {
        evento.preventDefault()
        tocarTodos()
        if (valido) onGuardar(valores)
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
                <div className="alert alert-danger" role="alert">
                    {erroresServidor.general}
                </div>
            )}

            <div className="row">
                <div className="col-md-4">
                    <CampoFormulario etiqueta="Código" {...campo('codigo')} />
                </div>
                <div className="col-md-8">
                    <CampoFormulario etiqueta="Nombre" {...campo('nombre')} />
                </div>
            </div>

            <CampoFormulario etiqueta="Descripción" como="textarea" rows="3" opcional {...campo('descripcion')} />

            <div className="row">
                <div className="col-md-6">
                    <CampoFormulario etiqueta="Categoría" como="select" {...campo('categoriaId')}>
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </CampoFormulario>
                </div>
                <div className="col-md-6">
                    <CampoFormulario
                        etiqueta="Imagen (URL)"
                        opcional
                        ayuda="Si lo dejas vacío se muestra un ícono."
                        {...campo('imagen')}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <CampoFormulario etiqueta="Precio ($)" tipo="number" min="1" {...campo('precio')} />
                </div>
                <div className="col-md-4">
                    <CampoFormulario etiqueta="Stock" tipo="number" min="0" {...campo('stock')} />
                </div>
                <div className="col-md-4">
                    <CampoFormulario
                        etiqueta="Stock crítico"
                        tipo="number"
                        min="0"
                        ayuda="Se marca como crítico al llegar a este valor."
                        {...campo('stockCritico')}
                    />
                </div>
            </div>

            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="oferta"
                    name="oferta"
                    checked={valores.oferta}
                    onChange={cambiar}
                />
                <label className="form-check-label" htmlFor="oferta">
                    Producto en oferta
                </label>
            </div>

            {valores.oferta && (
                <div className="row">
                    <div className="col-md-4">
                        <CampoFormulario etiqueta="Precio de oferta ($)" tipo="number" min="1" {...campo('precioOferta')} />
                    </div>
                </div>
            )}

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-danger">
                    {textoGuardar}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
                    Cancelar
                </button>
            </div>
        </form>
    )
}

ProductForm.propTypes = {
    valoresIniciales: PropTypes.shape({
        codigo: PropTypes.string,
        nombre: PropTypes.string,
        descripcion: PropTypes.string,
        categoriaId: PropTypes.string,
        precio: PropTypes.string,
        stock: PropTypes.string,
        stockCritico: PropTypes.string,
        oferta: PropTypes.bool,
        precioOferta: PropTypes.string,
        imagen: PropTypes.string,
    }).isRequired,
    categorias: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            nombre: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onGuardar: PropTypes.func.isRequired,
    onCancelar: PropTypes.func.isRequired,
    textoGuardar: PropTypes.string,
    erroresServidor: PropTypes.object,
}

export default ProductForm