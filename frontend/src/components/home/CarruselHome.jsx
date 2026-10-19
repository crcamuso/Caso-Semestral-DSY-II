import { Link } from 'react-router-dom'

const SLIDES = [
    {
        titulo: 'Gas a domicilio en Chillán',
        subtitulo: 'Pide tu cilindro en línea y recíbelo en la puerta de tu casa.',
        fondo: 'bg-danger',
        imagen: '/img/CamionGas.jpg',
        enlace: '/productos',
        textoEnlace: 'Ver productos',
    },
    {
        titulo: 'Ofertas de la semana',
        subtitulo: 'Reguladores, kits de conexión y accesorios con precio rebajado.',
        fondo: 'bg-warning text-dark',
        enlace: '/ofertas',
        textoEnlace: 'Ver ofertas',
    },
    {
        titulo: 'Seguridad ante todo',
        subtitulo: 'Aprende a detectar fugas y elegir el cilindro correcto en nuestro blog.',
        fondo: 'bg-dark',
        enlace: '/blog',
        textoEnlace: 'Leer blog',
    },
]

// Carrusel de Bootstrap con 3 slides de 1200x300.
function CarruselHome() {
    return (
        <div id="carruselHome" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {SLIDES.map((slide, indice) => (
                    <button
                        key={slide.titulo}
                        type="button"
                        data-bs-target="#carruselHome"
                        data-bs-slide-to={indice}
                        className={indice === 0 ? 'active' : ''}
                        aria-current={indice === 0 ? 'true' : undefined}
                        aria-label={`Slide ${indice + 1}`}
                    />
                ))}
            </div>

            <div className="carousel-inner">
                {SLIDES.map((slide, indice) => (
                    <div
                        key={slide.titulo}
                        className={`carousel-item ${indice === 0 ? 'active' : ''}`}
                    >
                        <div
                            className={`${slide.fondo} text-white d-flex align-items-center justify-content-center text-center mx-auto`}
                            style={{
                                height: '300px',
                                maxWidth: '1200px',
                                width: '100%',
                                ...(slide.imagen && {
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${slide.imagen})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }),
                            }}
                        >
                            <div className="px-5">
                                <h2 className="display-6 fw-bold">{slide.titulo}</h2>
                                <p className="lead mb-3">{slide.subtitulo}</p>
                                <Link to={slide.enlace} className="btn btn-light">{slide.textoEnlace}</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carruselHome" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carruselHome" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    )
}

export default CarruselHome
