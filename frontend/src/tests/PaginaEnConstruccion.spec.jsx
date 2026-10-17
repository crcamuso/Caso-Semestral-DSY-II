import PaginaEnConstruccion from '../components/common/PaginaEnConstruccion'
import { renderizar } from './renderizar'

describe('PaginaEnConstruccion', () => {
    let vista

    beforeEach(() => {
        vista = renderizar(<PaginaEnConstruccion titulo="Productos" />)
    })

    afterEach(() => {
        vista.desmontar()
    })

    it('se renderiza en el documento', () => {
        expect(vista.contenedor.querySelector('h1')).not.toBeNull()
    })

    it('muestra el título recibido por props', () => {
        expect(vista.contenedor.querySelector('h1').textContent).toBe('Productos')
    })

    it('muestra el mensaje de vista en construcción', () => {
        expect(vista.contenedor.textContent).toContain('Vista en construcción')
    })
})