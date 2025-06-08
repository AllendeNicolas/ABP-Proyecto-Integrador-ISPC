const ProductList = ({ show, onToggle, filteredProducts }) => (
  <>
    <button
      onClick={onToggle}
      className={`px-6 py-2 rounded-lg font-bold text-lg transition-colors duration-300
        ${
          show
            ? "bg-red-900 text-white hover:bg-red-700"
            : "bg-green-900 text-white hover:bg-green-700"
        }`}
    >
      {show ? "OCULTAR LISTA" : "MOSTRAR"}
    </button>
    <br />
    {show && (
      <ul className="animate_fadeIn">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="border p-4 rounded-lg shadow-md bg_white hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-violet-700">Precio: ${product.price}</p>
            </li>
          ))}
        </div>
      </ul>
    )}
    {filteredProducts.length === 0 && (
      <div>
        <strong className="text-red-500">
          "¡NO SE ENCONTRARON PRODUCTOS!"
        </strong>
      </div>
    )}
  </>
);

export default ProductList;
