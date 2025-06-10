import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductList from "./ProductList";
import StatsPanel from "./StatsPanel";
import ExportButtons from "./ExportButtons";
import "./App.css";

import * as XLSX from "xlsx";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showProductList, setShowProductList] = useState(true);
  const [showStatsPanel, setShowStatsPanel] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

  //Función para marcar el limite de productos mostrados en la paginación//
  const itemsPerPage = 20;

  //REFERENCIAS PARA CONTENEDORES

  const containerRef = useRef(null);

  //Función para Exportar a JSON y CSV
  const exportJSON = () => {
    try {
      if (!filteredProducts.length) {
        setMessage("No hay productos para exportar.");
        return;
      }
      const dataStr = JSON.stringify(filteredProducts, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "productos_filtrados.json";
      a.click();
      URL.revokeObjectURL(url);
      setMessage("Archivo JSON descargado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("Error al exportar JSON.");
    }
  };

  //Funcion para exportar Csv//

  const exportCSV = () => {
    try {
      if (!filteredProducts.length) {
        alert("No hay productos para exportar.");
        return;
      }
      const keys = Object.keys(filteredProducts[0]);
      const csvRows = [
        keys.join(","), // encabezados
        ...filteredProducts.map((product) =>
          keys
            .map((k) => `"${String(product[k]).replace(/"/g, '""')}"`)
            .join(",")
        ),
      ];
      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "productos_filtrados.csv";
      a.click();
      URL.revokeObjectURL(url);
      alert("Archivo CSV descargado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("Error al exportar CSV.");
    }
  };

  //Funcion para descargar Excel//

  const exportExcel = () => {
    try {
      if (!filteredProducts.length) {
        alert("No hay productos para exportar.");
        return;
      }
      const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
      XLSX.writeFile(workbook, "productos_filtrados.xlsx");
      alert("Archivo Excel descargado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("Error al exportar Excel.");
    }
  };

  //Mensaje de EXITO O ERROR

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
  //Funcion para paginación de productos//

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );
  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, sortOption]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  //Para realizar el modo oscuro, tuve que utilizar esta función, porque la sugerida en clase, no me funcionaba.

  const toggleDarkmode = () => {
    setDarkMode((prev) => !prev);
  };

  if (products.length === 0) {
    return <div className="p-6 text-center">Cargando productos...</div>;
  }

  return (
    <div ref={containerRef} className={darkMode ? "dark_mode" : ""}>
      <div className="p-6 text-center">
        <div className="flex items-start justify-start mb-6">
          <ExportButtons
            onExportJSON={exportJSON}
            onExportCSV={exportCSV}
            onExportExcel={exportExcel}
          />
        </div>
        <h1 className="text-3xl text-green-600 font-bold">
          "CATALOGO DE PRODUCTOS"
        </h1>

        <br />

        {/*Boton modo oscuro*/}

        <button className="darkmode-btn" onClick={toggleDarkmode}>
          <strong>MODO OSCURO</strong>
        </button>
        <input
          className="border rounded px-3 py-2 mr-4 mb-4 dark:bg-gray-200 dark:text-black"
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
        {message && (
          <div className="mb-4 p-2 rounded bg-green-100 text-green-800">
            {message}
          </div>
        )}

        <br />
        <br />
        <br />
        <ProductList
          show={showProductList}
          onToggle={() => setShowProductList(!showProductList)}
          products={paginatedProducts}
        />

        {/*PAGINACIÓN - PRPUESTA EN CLASES ESTA SI ME FUNCIONO*/}
        <div className="flex items-center justify-center gap-4 my-4">
          <button
            className="text-amber-100 px-4 py-2 bg-blue-500 rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Página anterior
          </button>
          <small>
            Estamos en la página {page} de {totalPages}
          </small>
          <button
            className="text-amber-50 px-4 py-2 bg-blue-500 rounded disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Página siguiente
          </button>
        </div>
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
