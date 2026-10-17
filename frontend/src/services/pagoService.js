// Simulación de la pasarela de pago. No hay un servicio real detrás.
export const RESULTADOS_PAGO = ['aleatorio', 'aprobado', 'rechazado']

export function simularPago(modo = 'aleatorio') {
    const aprobado = modo === 'aprobado' || (modo === 'aleatorio' && Math.random() < 0.8)
    return aprobado
        ? { aprobado: true }
        : { aprobado: false, motivo: 'El banco rechazó la transacción. Intenta nuevamente o usa otro medio de pago.' }
}
