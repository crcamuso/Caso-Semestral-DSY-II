import { Outlet } from 'react-router-dom'
import Navbar from '../components/tienda/Navbar'
import Footer from '../components/tienda/Footer'

function TiendaLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default TiendaLayout