import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ProductsContext } from './ProductsContext'
import * as productService from '../services/productService'
import * as categoryService from '../services/categoryService'

export function ProductsProvider({ children }) {
    const [productos, setProductos] = useState(() => productService.listarProductos())
    const [categorias, setCategorias] = useState(() => categoryService.listarCategorias())

    const refrescar = useCallback(() => {
        setProductos(productService.listarProductos())
        setCategorias(categoryService.listarCategorias())
    }, [])

    // Ejecuta la acción del service y, si salió bien, vuelve a leer los datos.
    const conRefresco = useCallback(
        (accion) =>
            (...args) => {
                const resultado = accion(...args)
                if (resultado.ok) refrescar()
                return resultado
            },
        [refrescar],
    )

    const value = useMemo(
        () => ({
            productos,
            categorias,
            crearProducto: conRefresco(productService.crearProducto),
            actualizarProducto: conRefresco(productService.actualizarProducto),
            eliminarProducto: conRefresco(productService.eliminarProducto),
            descontarStock: conRefresco(productService.descontarStock),
            crearCategoria: conRefresco(categoryService.crearCategoria),
            actualizarCategoria: conRefresco(categoryService.actualizarCategoria),
            eliminarCategoria: conRefresco(categoryService.eliminarCategoria),
            obtenerProducto: (id) => productos.find((p) => p.id === Number(id)) ?? null,
            obtenerCategoria: (id) => categorias.find((c) => c.id === Number(id)) ?? null,
        }),
        [productos, categorias, conRefresco],
    )

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
}