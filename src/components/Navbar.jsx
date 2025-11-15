import { ShoppingCart, Store } from "lucide-react"

export default function Navbar({ onCartClick }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">FZ</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Frezee Outlet</h1>
            <p className="text-xs text-gray-500 -mt-1">Dropshipping Store</p>
          </div>
        </div>
        <button
          onClick={onCartClick}
          className="relative inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
        >
          <ShoppingCart className="h-4 w-4" />
          Carrinho
        </button>
      </div>
    </header>
  )
}
