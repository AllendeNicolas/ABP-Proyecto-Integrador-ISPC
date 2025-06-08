import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductList from "./ProductList";
import StatsPanel from "./StatsPanel";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showProductList, setShowProductList] = useState(true);
  const [showStatsPanel, setShowStatsPanel] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(
    ...filteredProducts.map((product) => product.price)
  );
  const minProduct = Math.min(
    ...filteredProducts.map((product) => product.price)
  );
  const cantProductoVeinteCaracteres = filteredProducts.filter(
    (product) => product.title && product.title.length > 20
  ).length;
  const precioTotalProductosFiltrados = filteredProducts.reduce(
    (total, product) => total + (product.price || 0),
    0
  );

  const toggleDarkmode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div ref={containerRef} className={darkMode ? "dark_mode" : ""}>
      <div className="p-6 text-center">
        <h1 className="text-3xl text-blue-600 font-bold">
          "CATALOGO DE PRODUCTOS"
        </h1>
        <br />

        <button className="darkmode-btn" onClick={toggleDarkmode}>
          <strong>MODO OSCURO</strong>
        </button>

        <input
          type="text"
          placeholder="¿Que estás buscando?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <br />
        <hr />
        <br />
        <h1>
          <strong className="text-green-800">LISTA DE PRODUCTOS</strong>
        </h1>
        <br />
        <br />
        <br />
        <ProductList
          show={showProductList}
          onToggle={() => setShowProductList(!showProductList)}
          filteredProducts={filteredProducts}
        />
        <br />
        <hr />
        <br />
        <StatsPanel
          show={showStatsPanel}
          onToggle={() => setShowStatsPanel(!showStatsPanel)}
          precioTotal={precioTotalProductosFiltrados}
          total={totalProducts}
          max={maxProduct}
          min={minProduct}
          cantLargo={cantProductoVeinteCaracteres}
        />
      </div>
    </div>
  );
};

export default App;
