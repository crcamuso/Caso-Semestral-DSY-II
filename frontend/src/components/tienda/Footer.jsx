import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-md-6 col-lg-3">
                        <h5 className="fw-bold">Distribuidora de Gas El Volcán</h5>
                        <p className="small mb-0">
                            Distribución de gas licuado a domicilio en Chillán y comunas aledañas desde 1998.
                        </p>
                    </div>

                    <div className="col-6 col-lg-3">
                        <h6>Tienda</h6>
                        <ul className="list-unstyled small mb-0">
                            <li><Link className="link-light" to="/productos">Productos</Link></li>
                            <li><Link className="link-light" to="/nosotros">Nosotros</Link></li>
                            <li><Link className="link-light" to="/blog">Blogs</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3">
                        <h6>Cuenta</h6>
                        <ul className="list-unstyled small mb-0">
                            <li><Link className="link-light" to="/login">Iniciar sesión</Link></li>
                            <li><Link className="link-light" to="/registro">Registrarse</Link></li>
                            <li><Link className="link-light" to="/carrito">Mi carrito</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <h6>Contacto</h6>
                        <p className="small mb-0">
                            Av. Collín 450, Chillán<br />
                            +56 42 221 3456<br />
                            contacto@gasvolcan.cl
                        </p>
                    </div>
                </div>

                <hr className="border-secondary" />
                <p className="text-center small mb-0">
                    © 2026 Distribuidora de Gas El Volcán. Proyecto académico DSY1104.
                </p>
            </div>
        </footer>
    )
}

export default Footer