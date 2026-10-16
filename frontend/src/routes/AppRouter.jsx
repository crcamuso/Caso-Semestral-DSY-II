import { Routes, Route } from 'react-router-dom'

import TiendaLayout from '../layouts/TiendaLayout'
import AdminLayout from '../layouts/AdminLayout'
import RutaAdmin from './RutaAdmin'

import Home from '../pages/tienda/Home'
import Productos from '../pages/tienda/Productos'
import DetalleProducto from '../pages/tienda/DetalleProducto'
import Categorias from '../pages/tienda/Categorias'
import Categoria from '../pages/tienda/Categoria'
import Ofertas from '../pages/tienda/Ofertas'
import Registro from '../pages/tienda/Registro'
import Login from '../pages/tienda/Login'
import Nosotros from '../pages/tienda/Nosotros'
import Blogs from '../pages/tienda/Blogs'
import DetalleBlog from '../pages/tienda/DetalleBlog'
import Contacto from '../pages/tienda/Contacto'
import Carrito from '../pages/tienda/Carrito'
import Checkout from '../pages/tienda/Checkout'
import PagoCorrecto from '../pages/tienda/PagoCorrecto'
import PagoError from '../pages/tienda/PagoError'

import Dashboard from '../pages/admin/Dashboard'
import Ordenes from '../pages/admin/Ordenes'
import Boleta from '../pages/admin/Boleta'
import ProductosLista from '../pages/admin/ProductosLista'
import ProductoNuevo from '../pages/admin/ProductoNuevo'
import ProductoEditar from '../pages/admin/ProductoEditar'
import ProductosCriticos from '../pages/admin/ProductosCriticos'
import ProductosReportes from '../pages/admin/ProductosReportes'
import CategoriasLista from '../pages/admin/CategoriasLista'
import CategoriaNueva from '../pages/admin/CategoriaNueva'
import CategoriaEditar from '../pages/admin/CategoriaEditar'
import UsuariosLista from '../pages/admin/UsuariosLista'
import UsuarioNuevo from '../pages/admin/UsuarioNuevo'
import UsuarioEditar from '../pages/admin/UsuarioEditar'
import UsuarioHistorial from '../pages/admin/UsuarioHistorial'
import Reportes from '../pages/admin/Reportes'
import Perfil from '../pages/admin/Perfil'

import PaginaEnConstruccion from '../components/common/PaginaEnConstruccion'

function AppRouter() {
    return (
        <Routes>
            {/* Tienda pública */}
            <Route element={<TiendaLayout />}>
                <Route index element={<Home />} />
                <Route path="productos" element={<Productos />} />
                <Route path="productos/:id" element={<DetalleProducto />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="categorias/:id" element={<Categoria />} />
                <Route path="ofertas" element={<Ofertas />} />
                <Route path="registro" element={<Registro />} />
                <Route path="login" element={<Login />} />
                <Route path="nosotros" element={<Nosotros />} />
                <Route path="blog" element={<Blogs />} />
                <Route path="blog/:id" element={<DetalleBlog />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="carrito" element={<Carrito />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="pago-correcto" element={<PagoCorrecto />} />
                <Route path="pago-error" element={<PagoError />} />
                <Route path="*" element={<PaginaEnConstruccion titulo="404 · Página no encontrada" />} />
            </Route>

            {/* Panel de administrador (protegido) */}
            <Route path="admin" element={<RutaAdmin />}>
                <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="ordenes" element={<Ordenes />} />
                    <Route path="ordenes/:id" element={<Boleta />} />
                    <Route path="productos" element={<ProductosLista />} />
                    <Route path="productos/nuevo" element={<ProductoNuevo />} />
                    <Route path="productos/:id/editar" element={<ProductoEditar />} />
                    <Route path="productos/criticos" element={<ProductosCriticos />} />
                    <Route path="productos/reportes" element={<ProductosReportes />} />
                    <Route path="categorias" element={<CategoriasLista />} />
                    <Route path="categorias/nueva" element={<CategoriaNueva />} />
                    <Route path="categorias/:id/editar" element={<CategoriaEditar />} />
                    <Route path="usuarios" element={<UsuariosLista />} />
                    <Route path="usuarios/nuevo" element={<UsuarioNuevo />} />
                    <Route path="usuarios/:id/editar" element={<UsuarioEditar />} />
                    <Route path="usuarios/:id/historial" element={<UsuarioHistorial />} />
                    <Route path="reportes" element={<Reportes />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter