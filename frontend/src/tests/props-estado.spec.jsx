/* global describe, it, expect, afterEach, jasmine */
import ModalConfirmacion from '../components/admin/ModalConfirmacion'
import SearchBar from '../components/common/SearchBar'
import ProductForm from '../components/admin/ProductForm'
import { VALORES_NUEVO_PRODUCTO } from '../utils/valoresProducto'
import {
    renderizar,
    buscarBoton,
    hacerClic,
    escribir,
    seleccionar,
    salirDelCampo,
    enviarFormulario,
} from './renderizar'

let vista
const montar = (elemento) => {
    vista = renderizar(elemento)
    return vista.contenedor
}

afterEach(() => {
    if (vista) {
        vista.desmontar()
        vista = null
    }
})

describe('Props: botón de confirmar de ModalConfirmacion (label y onClick)', () => {
    const montarModal = (props) =>
        montar(
            <ModalConfirmacion
                visible
                titulo="Eliminar producto"
                mensaje="¿Seguro que quieres eliminarlo?"
                onConfirmar={() => {}}
                onCancelar={() => {}}
                {...props}
            />,
        )

    it('muestra como texto del botón el label recibido por props', () => {
        const contenedor = montarModal({ textoConfirmar: 'Sí, borrar' })

        // Verifica: el botón usa el texto que llegó en textoConfirmar.
        expect(buscarBoton(contenedor, 'Sí, borrar')).not.toBeNull()
    })

    it('usa "Eliminar" como texto por defecto', () => {
        const contenedor = montarModal({})

        // Verifica: sin la prop, se usa el valor por defecto.
        expect(buscarBoton(contenedor, 'Eliminar')).not.toBeNull()
    })

    it('muestra el título y el mensaje recibidos por props', () => {
        const contenedor = montarModal({})

        expect(contenedor.querySelector('.modal-title').textContent).toBe('Eliminar producto')
        expect(contenedor.querySelector('.modal-body').textContent).toBe('¿Seguro que quieres eliminarlo?')
    })

    it('ejecuta la función recibida en onConfirmar al hacer clic', () => {
        const onConfirmar = jasmine.createSpy('onConfirmar')
        const onCancelar = jasmine.createSpy('onCancelar')
        const contenedor = montarModal({ onConfirmar, onCancelar })

        hacerClic(buscarBoton(contenedor, 'Eliminar'))

        // Verifica: el clic llama a onConfirmar una sola vez y no a onCancelar.
        expect(onConfirmar).toHaveBeenCalledTimes(1)
        expect(onCancelar).not.toHaveBeenCalled()
    })

    it('no renderiza nada cuando visible es false', () => {
        const contenedor = montarModal({ visible: false })

        expect(contenedor.querySelector('.modal')).toBeNull()
    })
})

describe('Estado: SearchBar', () => {
    it('el campo refleja lo que se escribe', () => {
        const contenedor = montar(<SearchBar onBuscar={() => {}} />)
        const campo = contenedor.querySelector('input[type="search"]')

        escribir(campo, 'gas')

        // Verifica: el estado interno cambió y se refleja en el input controlado.
        expect(campo.value).toBe('gas')
    })

    it('al enviar entrega el texto guardado en el estado, sin espacios sobrantes', () => {
        const onBuscar = jasmine.createSpy('onBuscar')
        const contenedor = montar(<SearchBar onBuscar={onBuscar} />)

        escribir(contenedor.querySelector('input[type="search"]'), '  gas  ')
        enviarFormulario(contenedor.querySelector('form'))

        // Verifica: onBuscar recibe lo que quedó en el estado, ya sin espacios.
        expect(onBuscar).toHaveBeenCalledTimes(1)
        expect(onBuscar).toHaveBeenCalledWith('gas')
    })

    it('usa el placeholder recibido por props', () => {
        const contenedor = montar(<SearchBar onBuscar={() => {}} placeholder="Buscar cilindros" />)

        expect(contenedor.querySelector('input').placeholder).toBe('Buscar cilindros')
    })
})

describe('Estado: ProductForm (useForm)', () => {
    const CATEGORIAS = [{ id: 1, nombre: 'Accesorios' }]

    const montarFormulario = (onGuardar = () => {}) =>
        montar(
            <ProductForm
                valoresIniciales={VALORES_NUEVO_PRODUCTO}
                categorias={CATEGORIAS}
                onGuardar={onGuardar}
                onCancelar={() => {}}
            />,
        )

    const llenarFormularioValido = (contenedor) => {
        escribir(contenedor.querySelector('#codigo'), 'TS001')
        escribir(contenedor.querySelector('#nombre'), 'Producto de prueba')
        seleccionar(contenedor.querySelector('#categoriaId'), '1')
        escribir(contenedor.querySelector('#precio'), '1000')
        escribir(contenedor.querySelector('#stock'), '10')
        escribir(contenedor.querySelector('#stockCritico'), '2')
    }

    it('guarda en su estado lo que se escribe en un campo', () => {
        const contenedor = montarFormulario()
        const campo = contenedor.querySelector('#nombre')

        escribir(campo, 'Producto de prueba')

        expect(campo.value).toBe('Producto de prueba')
    })

    it('muestra el error de un campo vacío solo después de salir de él y lo quita al corregirlo', () => {
        const contenedor = montarFormulario()
        const campo = contenedor.querySelector('#codigo')

        // Verifica: al inicio el campo está vacío pero todavía no muestra error.
        expect(contenedor.querySelector('#codigo-error')).toBeNull()

        salirDelCampo(campo)
        // Verifica: al salir del campo aparece el error de campo obligatorio.
        expect(contenedor.querySelector('#codigo-error').textContent).toBe('El código es obligatorio.')

        escribir(campo, 'TS001')
        // Verifica: al escribir un valor válido el error desaparece.
        expect(contenedor.querySelector('#codigo-error')).toBeNull()
    })

    it('no llama a onGuardar si el formulario tiene errores', () => {
        const onGuardar = jasmine.createSpy('onGuardar')
        const contenedor = montarFormulario(onGuardar)

        enviarFormulario(contenedor.querySelector('form'))

        // Verifica: no se guarda y se muestran los errores de los campos obligatorios.
        expect(onGuardar).not.toHaveBeenCalled()
        expect(contenedor.querySelectorAll('.invalid-feedback').length).toBeGreaterThan(0)
    })

    it('llama a onGuardar con los valores cuando el formulario es válido', () => {
        const onGuardar = jasmine.createSpy('onGuardar')
        const contenedor = montarFormulario(onGuardar)

        llenarFormularioValido(contenedor)
        enviarFormulario(contenedor.querySelector('form'))

        // Verifica: se guarda una vez con lo que quedó en el estado del formulario.
        expect(onGuardar).toHaveBeenCalledTimes(1)
        expect(onGuardar).toHaveBeenCalledWith(
            jasmine.objectContaining({ codigo: 'TS001', nombre: 'Producto de prueba', categoriaId: '1', precio: '1000' }),
        )
    })

    it('muestra el campo precio de oferta solo cuando se marca la oferta', () => {
        const contenedor = montarFormulario()

        // Verifica: sin marcar la oferta, el campo no existe...
        expect(contenedor.querySelector('#precioOferta')).toBeNull()

        hacerClic(contenedor.querySelector('#oferta'))
        // ...y al marcarla (cambio de estado) aparece.
        expect(contenedor.querySelector('#precioOferta')).not.toBeNull()
    })
})