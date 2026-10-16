import { Link } from 'react-router-dom'

function HeroSection() {
    return (
        <section className="bg-danger text-white py-5">
            <div className="container">
                <div className="row align-items-center gy-4">
                    <div className="col-lg-6">
                        <span className="badge bg-warning text-dark mb-3">DESDE 1998 EN CHILLÁN</span>
                        <h1 className="display-5 fw-bold">
                            Gas licuado a domicilio, sin esperar todo el día
                        </h1>
                        <p className="lead">
                            Pide tu cilindro en línea, elige el tipo que necesitas y sigue el estado de tu
                            pedido en tiempo real. Sin llamadas, sin cuadernos, sin sorpresas.
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                            <Link to="/productos" className="btn btn-warning btn-lg">Ver productos</Link>
                            <Link to="/nosotros" className="btn btn-outline-light btn-lg">Conócenos</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src="/img/CamionGas.jpg"
                            alt="Camión de reparto de gas de Gas El Volcán"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection