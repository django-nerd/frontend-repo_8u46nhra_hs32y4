import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${backend}/api/products`)
        if (!res.ok) throw new Error('Falha ao carregar produtos')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [backend])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])

  const checkout = async () => {
    try {
      if (cart.length === 0) return
      const order = {
        customer_name: 'Cliente Frezee',
        customer_email: 'cliente@example.com',
        shipping_address: 'Endereço de exemplo',
        items: cart.map(({ id, title, price, quantity, images }) => ({
          product_id: id,
          title,
          price,
          quantity,
          image: images?.[0] || null,
        })),
      }
      const res = await fetch(`${backend}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      const id = await res.json()
      alert(`Pedido realizado! Código: ${id}`)
      setCart([])
      setShowCart(false)
    } catch (e) {
      alert('Falha no checkout: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Navbar onCartClick={() => setShowCart(true)} />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold">Frezee Outlet</h2>
          <p className="text-blue-100 mt-2">Ofertas geladas que derretem os preços! Produtos selecionados para seu dropshipping.</p>
        </div>

        {loading && (
          <p className="mt-8 text-gray-600">Carregando produtos...</p>
        )}
        {error && (
          <p className="mt-8 text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Seu Carrinho</h3>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">Fechar</button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y">
              {cart.length === 0 ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <img src={item.images?.[0]} alt={item.title} className="h-16 w-16 rounded object-cover bg-gray-100" />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-600 hover:underline">Remover</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">Total</span>
                <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
              </div>
              <button
                onClick={checkout}
                disabled={cart.length === 0}
                className="w-full rounded-md bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Frezee Outlet. Todos os direitos reservados.</p>
        <a href="/test" className="text-blue-600 hover:underline text-sm block mt-2">Verificar conexão com o backend</a>
      </footer>
    </div>
  )
}

export default App
