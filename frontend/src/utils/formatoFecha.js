// Convierte '2026-09-15' en '15 de septiembre de 2026' (sin problemas de zona horaria).
export function formatoFechaLarga(iso) {
    const [anio, mes, dia] = String(iso).split('-').map(Number)
    return new Date(anio, mes - 1, dia).toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}
