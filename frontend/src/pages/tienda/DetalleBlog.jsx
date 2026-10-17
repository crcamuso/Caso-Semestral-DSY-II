import { Link, useParams } from 'react-router-dom'
import { obtenerBlogPorId } from '../../services/blogService'
import { formatoFechaLarga } from '../../utils/formatoFecha'

function DetalleBlog() {
    const { id } = useParams()
    const blog = obtenerBlogPorId(id)

    if (!blog) {
        return (
            <div className="container py-5 text-center">
                <h1 className="h3">Artículo no encontrado</h1>
                <Link to="/blog" className="btn btn-danger">Volver a blogs</Link>
            </div>
        )
    }

    return (
        <article className="container py-4" style={{ maxWidth: '780px' }}>
            <h1 className="h2">{blog.titulo}</h1>
            <p className="text-muted">{formatoFechaLarga(blog.fecha)}</p>

            {blog.imagen ? (
                <img src={blog.imagen} alt={blog.titulo} className="img-fluid rounded mb-4" />
            ) : (
                <div className="bg-light rounded d-flex align-items-center justify-content-center display-1 mb-4" style={{ height: '200px' }} aria-hidden="true">
                    {blog.icono ?? '📰'}
                </div>
            )}

            {blog.contenido.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
            ))}

            <Link to="/blog">← Volver a blogs</Link>
        </article>
    )
}

export default DetalleBlog
