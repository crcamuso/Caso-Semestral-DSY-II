import { useState } from 'react'
import FormularioContacto from '../../components/formularios/FormularioContacto'

function Contacto() {
    const [enviadoA, setEnviadoA] = useState('')

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Contacto</h1>

            <div className="row g-4">
                <div className="col-lg-5">
                    <h2 className="h4">Escríbenos</h2>
                    <p>
                        ¿Tienes dudas sobre un pedido o quieres cotizar un despacho comercial? Completa el
                        formulario y te responderemos a la brevedad.
                    </p>
                    <ul className="list-unstyled">
                        <li><strong>Teléfono:</strong> +56 42 221 3456</li>
                        <li><strong>Correo:</strong> contacto@gasvolcan.cl</li>
                        <li><strong>Dirección:</strong> Av. Collín 450, Chillán</li>
                    </ul>
                </div>

                <div className="col-lg-7">
                    <h2 className="h4">Formulario de contacto</h2>
                    {enviadoA && (
                        <div className="alert alert-success alert-dismissible fade show" role="status">
                            ¡Gracias! Recibimos tu mensaje y te responderemos a {enviadoA}.
                            <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setEnviadoA('')} />
                        </div>
                    )}
                    <FormularioContacto onEnviar={(valores) => setEnviadoA(valores.correo.trim())} />
                </div>
            </div>
        </div>
    )
}

export default Contacto
