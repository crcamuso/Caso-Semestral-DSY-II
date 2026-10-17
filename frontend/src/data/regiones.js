// Regiones de Chile y sus comunas (principales) para el formulario de despacho.
export const REGIONES = [
    { nombre: 'Región de Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
    { nombre: 'Región de Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'] },
    { nombre: 'Región de Antofagasta', comunas: ['Antofagasta', 'Calama', 'Mejillones', 'Tocopilla'] },
    { nombre: 'Región de Atacama', comunas: ['Copiapó', 'Caldera', 'Vallenar', 'Chañaral'] },
    { nombre: 'Región de Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'] },
    { nombre: 'Región de Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio'] },
    {
        nombre: 'Región Metropolitana de Santiago',
        comunas: ['Santiago', 'Maipú', 'Puente Alto', 'La Florida', 'Las Condes', 'Providencia', 'Ñuñoa', 'San Bernardo'],
    },
    { nombre: "Región del Libertador General Bernardo O'Higgins", comunas: ['Rancagua', 'Machalí', 'San Fernando', 'Rengo'] },
    { nombre: 'Región del Maule', comunas: ['Talca', 'Curicó', 'Linares', 'Constitución', 'Cauquenes'] },
    {
        nombre: 'Región de Ñuble',
        comunas: ['Chillán', 'Chillán Viejo', 'Bulnes', 'Quillón', 'El Carmen', 'Pinto', 'San Ignacio', 'San Carlos', 'Coihueco'],
    },
    { nombre: 'Región del Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Coronel', 'San Pedro de la Paz'] },
    { nombre: 'Región de La Araucanía', comunas: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Angol', 'Pucón'] },
    { nombre: 'Región de Los Ríos', comunas: ['Valdivia', 'La Unión', 'Río Bueno', 'Panguipulli'] },
    { nombre: 'Región de Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro', 'Puerto Varas', 'Ancud'] },
    { nombre: 'Región de Aysén', comunas: ['Coyhaique', 'Puerto Aysén', 'Chile Chico'] },
    { nombre: 'Región de Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] },
]

export function comunasDeRegion(nombreRegion) {
    return REGIONES.find((r) => r.nombre === nombreRegion)?.comunas ?? []
}
