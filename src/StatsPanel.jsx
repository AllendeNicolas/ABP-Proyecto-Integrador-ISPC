import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import React from "react";

const COLORS = ["#FF8042", "#FFBB28", "#00C49F"];

function StatsPanel({ show, onToggle, products }) {
  if (!show) {
    return (
      <button
        onClick={onToggle}
        className="px-6 py-2 rounded-lg font-bold text-lg transition-colors duration-300 bg-green-900 text-white hover:bg-green-700"
      >
        MOSTRAR ESTADÍSTICAS
      </button>
    );
  }

  if (!products || products.length === 0) {
    return (
      <>
        <button
          onClick={onToggle}
          className="px-6 py-2 rounded-lg font-bold text-lg transition-colors duration-300 bg-red-900 text-white hover:bg-red-700"
        >
          OCULTAR ESTADÍSTICAS
        </button>
        <div className="stats-panel bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-gray-800">
            <strong className="text-red-500">ANÁLISIS Y ESTADÍSTICAS</strong>
          </h2>
          <p>No hay productos para mostrar estadísticas.</p>
        </div>
      </>
    );
  }

  // Estadísticas generales
  const masCaro = products.reduce(
    (max, p) => (p.price > max.price ? p : max),
    products[0]
  );
  //Total Productos filtradosuscador, como para los filtro por categorías, recordar NO TRADUCIR LA PAGINA A ESPAÑOL, porque de lo contrario no FUNCIONAN LOS FILTROS
  const totalProducts = filteredProducts.length;
  const masBarato = products.reduce(
    (min, p) => (p.price < min.price ? p : min),
    products[0]
  );
  const titulosLargos = products.filter((p) => p.title.length > 20).length;
  const precioTotal = products.reduce((sum, p) => sum + p.price, 0);
  const promedioDescuento =
    products.length > 0
      ? (
          products.reduce((sum, p) => sum + p.discountPercentage, 0) /
          products.length
        ).toFixed(2)
      : "0.00";
  const precioPromedio = (precioTotal / products.length).toFixed(2);

  // Agrupar por categoría
  const categorias = {};
  products.forEach((p) => {
    if (!categorias[p.category]) {
      categorias[p.category] = {
        productos: [],
        totalPrecio: 0,
        totalRating: 0,
        masCaro: p,
        masBarato: p,
      };
    }
    categorias[p.category].productos.push(p);
    categorias[p.category].totalPrecio += p.price;
    categorias[p.category].totalRating += p.rating;
    if (p.price > categorias[p.category].masCaro.price) {
      categorias[p.category].masCaro = p;
    }
    if (p.price < categorias[p.category].masBarato.price) {
      categorias[p.category].masBarato = p;
    }
  });

  // Calcular cantidad de productos por categoría
  const productosPorCategoria = {};
  products.forEach((p) => {
    productosPorCategoria[p.category] =
      (productosPorCategoria[p.category] || 0) + 1;
  });

  // Convertimos a array para Recharts
  const dataBarras = Object.entries(productosPorCategoria).map(
    ([categoria, cantidad]) => ({
      categoria,
      cantidad,
    })
  );

  // Datos para línea de evolución de precios (simulados)
  const priceEvolution = products.slice(0, 10).map((p, i) => ({
    name: `P${i + 1}`,
    price: p.price + Math.floor(Math.random() * 20) - 10, // simulación con variación aleatoria
  }));

  // Datos para pie chart de stock
  const stockRanges = {
    bajo: products.filter((p) => p.stock <= 20).length,
    medio: products.filter((p) => p.stock > 20 && p.stock <= 50).length,
    alto: products.filter((p) => p.stock > 50).length,
  };

  const pieData = [
    { name: "Stock bajo (≤20)", value: stockRanges.bajo },
    { name: "Stock medio (21–50)", value: stockRanges.medio },
    { name: "Stock alto (>50)", value: stockRanges.alto },
  ];

  return (
    <>
      <button
        onClick={onToggle}
        className="px-6 py-2 rounded-lg font-bold text-lg transition-colors duration-300 bg-red-900 text-white hover:bg-red-700"
      >
        OCULTAR ESTADÍSTICAS
      </button>
      <div className="stats-panel bg-gray-100 p-6 rounded-lg shadow-md mt-6 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-gray-800">
          <strong className="text-red-500">ANÁLISIS Y ESTADÍSTICAS</strong>
        </h2>
        <br />
        <p>PRODUCTOS TOTALES: {totalProducts}</p>
        <br />
        <p>PRECIO TOTAL DE PRODUCTOS FILTRADOS: ${precioTotal.toFixed(2)}</p>
        <br />
        <p>PRECIO PROMEDIO DE PRODUCTOS FILTRADOS: ${precioPromedio}</p>
        <br />
        <p>PRODUCTOS TOTALES: {products.length}</p>
        <br />
        <p>
          PRODUCTO MÁS CARO: {masCaro.title} (${masCaro.price})
        </p>
        <br />
        <p>
          PRODUCTO MÁS ECONÓMICO: {masBarato.title} (${masBarato.price})
        </p>
        <br />
        <p>PROMEDIO DE DESCUENTO: {promedioDescuento}%</p>
        <br />
        <p>PRODUCTOS CON MÁS DE 20 CARACTERES: {titulosLargos}</p>
        <br />

        {/* Gráfico de barras de productos por categoría */}
        <h4 className="text-xl font-semibold mt-8 mb-2 text-gray-800">
          Productos por categoría
        </h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={dataBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">Por categoría</h3>
        <ul className="list-disc pl-6">
          {Object.entries(categorias).map(([categoria, data]) => {
            const cantidad = data.productos.length;
            const promedioPrecio = (data.totalPrecio / cantidad).toFixed(2);
            const promedioRating = (data.totalRating / cantidad).toFixed(2);
            return (
              <li key={categoria} className="mb-2">
                <strong>{categoria}</strong>:<br />- Cantidad de productos:{" "}
                {cantidad}
                <br />- Precio promedio: ${promedioPrecio}
                <br />- Rating promedio: {promedioRating}
                <br />- Más caro: {data.masCaro.title} (${data.masCaro.price})
                <br />- Más barato: {data.masBarato.title} ($
                {data.masBarato.price})
              </li>
            );
          })}
        </ul>

        {/* Gráfico de líneas: evolución de precios */}
        <h4 className="text-xl font-semibold mt-8 text-gray-800">
          Evolución de Precios (simulada)
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={priceEvolution}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Pie chart: proporción de productos según stock */}
        <h4 className="text-xl font-semibold mt-8 text-gray-800">
          Distribución de Stock
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default StatsPanel;
