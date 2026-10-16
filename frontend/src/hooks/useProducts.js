import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'

export function useProducts() {
    const contexto = useContext(ProductsContext)
    if (!contexto) throw new Error('useProducts debe usarse dentro de <ProductsProvider>.')
    return contexto
}