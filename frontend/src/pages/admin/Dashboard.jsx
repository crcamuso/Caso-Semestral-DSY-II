import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useProducts } from '../../hooks/useProducts'
import { listarUsuarios } from '../../services/userService'
import { listarOrdenes } from '../../services/orderService'
import { formatoCLP } from '../../utils/formatoCLP'
import MetricCard from '../../components/admin/MetricCard'
import QuickAccessCard from '../../components/admin/QuickAccessCard'
import CriticalStockTable from '../../components/admin/CriticalStockTable'

const ESTADOS_SIN_VENTA = ['Pago fallido', 'Cancelada']

const ACCESOS_RAPIDOS = [
  { titulo: 'Órdenes', descripcion: 'Revisa las compras y sus boletas', ruta: '/admin/ordenes', icono: '🧾' },
  { titulo: 'Productos', descripcion: 'Crea, edita y elimina productos', ruta: '/admin/productos', icono: '📦' },
  { titulo: 'Categorías', descripcion: 'Administra las categorías', ruta: '/admin/categorias', icono: '🏷️' },
  { titulo: 'Usuarios', descripcion: 'Gestiona clientes y administradores', ruta: '/admin/usuarios', icono: '👤' },
  { titulo: 'Reportes', descripcion: 'Ventas y estadísticas generales', ruta: '/admin/reportes', icono: '📊' },
  { titulo: 'Perfil', descripcion: 'Ver y editar tus datos', ruta: '/admin/perfil', icono: '⚙️' },
]

function Dashboard() {
  const { usuario } = useAuth()
  const { productos } = useProducts()

  // Usuarios y órdenes se leen al abrir el dashboard (aún no tienen contexto propio).
  const [usuarios] = useState(() => listarUsuarios())
  const [ordenes] = useState(() => listarOrdenes())

  const productosCriticos = productos.filter((p) => p.stock <= p.stockCritico)
  const totalVendido = ordenes
      .filter((o) => !ESTADOS_SIN_VENTA.includes(o.estado))
      .reduce((suma, o) => suma + o.total, 0)

  return (
      <>
        <h1 className="h3 mb-4">¡Hola, {usuario?.nombre ?? 'Administrador'}!</h1>

        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <MetricCard
                titulo="Compras"
                valor={ordenes.length}
                detalle={`Total vendido: ${formatoCLP(totalVendido)}`}
                variante="primary"
            />
          </div>
          <div className="col-6 col-lg-3">
            <MetricCard titulo="Productos totales" valor={productos.length} />
          </div>
          <div className="col-6 col-lg-3">
            <MetricCard titulo="Usuarios registrados" valor={usuarios.length} variante="success" />
          </div>
          <div className="col-6 col-lg-3">
            <MetricCard
                titulo="Stock crítico"
                valor={productosCriticos.length}
                variante={productosCriticos.length > 0 ? 'danger' : 'dark'}
            />
          </div>
        </div>

        <h2 className="h5 mb-3">Accesos rápidos</h2>
        <div className="row g-3 mb-4">
          {ACCESOS_RAPIDOS.map((acceso) => (
              <div className="col-6 col-md-4" key={acceso.ruta}>
                <QuickAccessCard {...acceso} />
              </div>
          ))}
        </div>

        <CriticalStockTable productos={productosCriticos} />
      </>
  )
}

export default Dashboard