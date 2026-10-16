// Precio que paga el cliente: el de oferta si corresponde, si no el normal.
export function precioVigente(producto) {
    const enOferta =
        producto.oferta && producto.precioOferta !== null && producto.precioOferta < producto.precio
    return enOferta ? producto.precioOferta : producto.precio
}