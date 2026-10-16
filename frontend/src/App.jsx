import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ProductsProvider } from './context/ProductsProvider'
import { CartProvider } from './context/CartProvider'
import AppRouter from './routes/AppRouter'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ProductsProvider>
                    <CartProvider>
                        <AppRouter />
                    </CartProvider>
                </ProductsProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App