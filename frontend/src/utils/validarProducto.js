import { esRequerido, maximo, esEnteroEnRango } from './validaciones'

// Devuelve { campo: 'mensaje' }, vacío si todo está bien. Es el formato que espera useForm.
export function validarProducto(valores) {
    const errores = {}

    if (!esRequerido(valores.codigo)) errores.codigo = 'El código es obligatorio.'
    else if (!maximo(valores.codigo.trim(), 10)) errores.codigo = 'El código admite hasta 10 caracteres.'

    if (!esRequerido(valores.nombre)) errores.nombre = 'El nombre es obligatorio.'
    else if (!maximo(valores.nombre.trim(), 100)) errores.nombre = 'El nombre admite hasta 100 caracteres.'

    if (!maximo(valores.descripcion, 500)) errores.descripcion = 'La descripción admite hasta 500 caracteres.'

    if (!esRequerido(valores.categoriaId)) errores.categoriaId = 'Selecciona una categoría.'

    if (!esEnteroEnRango(valores.precio, 1, null)) {
        errores.precio = 'El precio debe ser un número entero mayor a 0.'
    }
    if (!esEnteroEnRango(valores.stock, 0, null)) {
        errores.stock = 'El stock debe ser un número entero igual o mayor a 0.'
    }
    if (!esEnteroEnRango(valores.stockCritico, 0, null)) {
        errores.stockCritico = 'El stock crítico debe ser un número entero igual o mayor a 0.'
    }

    if (valores.oferta) {
        if (!esEnteroEnRango(valores.precioOferta, 1, null)) {
            errores.precioOferta = 'El precio de oferta debe ser un número entero mayor a 0.'
        } else if (!errores.precio && Number(valores.precioOferta) >= Number(valores.precio)) {
            errores.precioOferta = 'El precio de oferta debe ser menor al precio normal.'
        }
    }

    return errores
}