const PASOS = [
    {
        titulo: '1. Elige tu cilindro',
        texto: 'Revisa el catálogo y agrega el producto que necesitas al carrito.',
    },
    {
        titulo: '2. Confirma tu dirección',
        texto: 'Inicia sesión o regístrate para confirmar la dirección de despacho.',
    },
    {
        titulo: '3. Recibe en tu casa',
        texto: 'Un repartidor lleva tu pedido y pagas al momento de la entrega.',
    },
]

function ComoFunciona() {
    return (
        <section className="py-5">
            <div className="container text-center">
                <h2 className="mb-4">¿Cómo funciona?</h2>
                <div className="row g-4">
                    {PASOS.map((paso) => (
                        <div className="col-md-4" key={paso.titulo}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h5 card-title">{paso.titulo}</h3>
                                    <p className="card-text">{paso.texto}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ComoFunciona