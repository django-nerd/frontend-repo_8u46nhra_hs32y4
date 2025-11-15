export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {product.images?.[0] ? (
        <img src={product.images[0]} alt={product.title} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full bg-gray-100 grid place-items-center text-gray-400 text-sm">Sem imagem</div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-600 font-bold">R$ {product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="rounded-md bg-blue-600 text-white text-sm px-3 py-2 hover:bg-blue-700"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
