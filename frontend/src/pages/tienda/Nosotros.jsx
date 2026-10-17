const EQUIPO = [
    { nombre: 'Cristopher', rol: 'Desarrollo frontend y administración del repositorio' },
    { nombre: 'Leo', rol: 'Desarrollo frontend: tienda y flujo de compra' },
]

const ZONAS = [
    { zona: 'Zona Centro', comunas: 'Chillán (centro, norte y sur)', dias: 'Lunes a sábado', horario: '08:00 – 20:00' },
    { zona: 'Zona Oriente', comunas: 'Chillán (oriente), Chillán Viejo', dias: 'Lunes a viernes', horario: '08:00 – 18:00' },
    { zona: 'Zona Rural', comunas: 'El Carmen, Pinto, San Ignacio', dias: 'Martes y jueves', horario: '08:00 – 16:00' },
    { zona: 'Zona Sur', comunas: 'Bulnes, Quillón', dias: 'Miércoles', horario: '08:00 – 16:00' },
]

function Nosotros() {
    return (
        <div className="container py-4">
            <h1 className="h2 mb-4">Nosotros</h1>

            <section className="mb-5" aria-labelledby="historia">
                <h2 id="historia" className="h4">Nuestra historia</h2>
                <p>
                    Distribuidora de Gas El Volcán es una empresa familiar ubicada en Chillán, Región de Ñuble,
                    fundada en 1998. Distribuimos cilindros de gas licuado a domicilio a clientes residenciales y
                    comerciales en Chillán y las comunas aledañas.
                </p>
                <p>
                    Contamos con 2 camiones de reparto, 3 repartidores, una operadora de llamadas y una
                    administradora, y recibimos entre 80 y 120 pedidos por día.
                </p>
            </section>

            <section className="mb-5" aria-labelledby="mision">
                <h2 id="mision" className="h4">Nuestra misión</h2>
                <ul>
                    <li>Entregar el pedido correcto, en la dirección correcta, sin llamadas repetidas.</li>
                    <li>Mantener visibilidad del stock para no dejar a nuestros clientes esperando.</li>
                    <li>Registrar cada pago y cada pedido, sin depender de cuadernos ni papeles sueltos.</li>
                </ul>
            </section>

            <section className="mb-5" aria-labelledby="equipo">
                <h2 id="equipo" className="h4">El equipo del proyecto</h2>
                <p>
                    Este sitio fue desarrollado por el equipo del curso DSY1104 – Desarrollo FullStack II para
                    modernizar el proceso de pedidos y despacho de la distribuidora.
                </p>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                    {EQUIPO.map((integrante) => (
                        <div className="col" key={integrante.nombre}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h5 card-title">{integrante.nombre}</h3>
                                    <p className="card-text text-muted mb-0">{integrante.rol}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="zonas">
                <h2 id="zonas" className="h4">Zonas y horarios de despacho</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Zona</th>
                                <th scope="col">Comunas</th>
                                <th scope="col">Días</th>
                                <th scope="col">Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ZONAS.map((z) => (
                                <tr key={z.zona}>
                                    <td>{z.zona}</td>
                                    <td>{z.comunas}</td>
                                    <td>{z.dias}</td>
                                    <td>{z.horario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Nosotros
