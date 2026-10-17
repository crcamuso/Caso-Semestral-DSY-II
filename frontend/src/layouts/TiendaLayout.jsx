import { Outlet } from 'react-router-dom'
import Navbar from '../components/tienda/Navbar'
import Footer from '../components/tienda/Footer'
import Breadcrumbs from '../components/common/Breadcrumbs'
import BotonVolverArriba from '../components/common/BotonVolverArriba'

function TiendaLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <Footer />
            <BotonVolverArriba />
        </div>
    )
}

export default TiendaLayout
