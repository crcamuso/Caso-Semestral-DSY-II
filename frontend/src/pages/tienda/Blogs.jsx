import TarjetaBlog from '../../components/blog/TarjetaBlog'
import { listarBlogs } from '../../services/blogService'

function Blogs() {
    const blogs = listarBlogs()

    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Blogs</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {blogs.map((blog) => (
                    <div className="col" key={blog.id}>
                        <TarjetaBlog
                            id={blog.id}
                            titulo={blog.titulo}
                            fecha={blog.fecha}
                            imagen={blog.imagen}
                            icono={blog.icono}
                            resumen={blog.resumen}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs
