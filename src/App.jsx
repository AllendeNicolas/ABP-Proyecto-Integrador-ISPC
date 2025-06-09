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
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");

  //REFERENCIAS PARA CONTENEDORES

  const containerRef = useRef(null);

  // Conexion con API - DUMMYJSON -
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  // Funcion para obtener las categorías unicas
  const uniqueCategories = [...new Set(products.map((p) => p.category))].sort();

  // Filtro de búsqueda
  let filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  //  Funcionalidad de Filtrado por categoría
  if (categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  // Orden de busquedas Precios y Ratings (utilización de If and Else, esta fue la manera más sencillas de las que probé)
  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating-asc") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  } else if (sortOption === "rating-desc") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  //Para realizar el modo oscuro, tuve que utilizar esta función, porque la sugerida en clase, no me funcionaba.

  const toggleDarkmode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div ref={containerRef} className={darkMode ? "dark_mode" : ""}>
      <div className="p-6 text-center">
        <h1 className="text-3xl text-green-600 font-bold">
          "CATALOGO DE PRODUCTOS"
        </h1>
        <br />

        {/*Boton modo oscuro*/}

        <button className="darkmode-btn" onClick={toggleDarkmode}>
          <strong>MODO OSCURO</strong>
        </button>
        <input
          className="border rounded px-3 py-2 mr-4 mb-4 dark:bg-gray-600 dark:text-white"
          type="text"
          placeholder="¿Que estás buscando?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <select
          className="border rounded px-3 py-2 mr-4 mb-4 dark:bg-blue-400 dark:text-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* SELECTOR DE ORDENAMIENTO, funciona tambien con los precios ya filtrados */}

        <select
          className="border rounded px-3 py-2 mb-4 dark:bg-blue-400 dark:text-white"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio ascendente</option>
          <option value="price-desc">Precio descendente</option>
          <option value="rating-asc">Rating ascendente</option>
          <option value="rating-desc">Rating descendente</option>
        </select>
        <br />
        <hr />
        <br />
        <h1>
          {/*LISTA DE PRODUCTOS*/}

          <strong className="text-green-600">LISTA DE PRODUCTOS</strong>
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
        {/* MOSTRAR ESTADISTICAS, muestra las estadísticas, además, aquellas cuando se filtran productos en el buscador */}
        <StatsPanel
          show={showStatsPanel}
          onToggle={() => setShowStatsPanel(!showStatsPanel)}
          products={filteredProducts} // <-- pásale el array filtrado
        />
      </div>
    </div>
  );
};

export default App;
