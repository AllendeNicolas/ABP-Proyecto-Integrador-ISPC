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

  // ESTADISICAS GENERALS + FUNCIONES DE FILTRADO Y ORDENAMIENTO
  const masCaro = products.reduce(
    (max, p) => (p.price > max.price ? p : max),
    products[0]
  );

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

  // CONVERTIDOR ARRAY Recharts
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

  // Datos para pie chart de stock (FUNCIÓN CON FILTRO)
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
      <div className="stats-panel bg-gray-200 p-6 rounded-lg shadow-md mt-6 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-gray-200">
          <strong className="text-red-500">ANÁLISIS Y ESTADÍSTICAS</strong>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <p className="bg-blue-200 text-violet-700 rounded shadow p-4">
            <span className="font-semibold">PRECIO TOTAL:</span>
            <br />${precioTotal.toFixed(2)}
          </p>
          <p className="bg-blue-200 text-violet-700 rounded shadow p-4">
            <span className="font-semibold">PRECIO PROMEDIO:</span>
            <br />${precioPromedio}
          </p>
          <p className="bg-blue-200 text-violet-700 rounded shadow p-4">
            <span className="font-semibold">PRODUCTOS TOTALES:</span>
            <br />
            {products.length}
          </p>
          <p className="bg-blue-200 text-violet-700 rounded shadow p-4">
            <span className="font-semibold">PRODUCTO MÁS CARO:</span>
            <br />
            {masCaro.title} (${masCaro.price})
          </p>
          <p className="bg-blue-200 text-violet-700 rounded shadow p-4">
            <span className="font-semibold">PRODUCTO MÁS ECONÓMICO:</span>
            <br />
            {masBarato.title} (${masBarato.price})
          </p>
          <p className="bg-blue-200 text-violet-700 rounded shadow p-4">
            <span className="font-semibold">PROMEDIO DE DESCUENTO:</span>
            <br />
            {promedioDescuento}%
          </p>
          <p className="bg-blue-200 text-violet-700 rounded shadow p-4">
            <span className="font-semibold">+20 CARACTERES:</span>
            <br />
            {titulosLargos}
          </p>
        </div>
        {/* GRAFICO DE BARRAS PRODUTOS POR CATEGORÍAS */}
        <h4 className="text-xl font-semibold mt-8 mb-2 text-blue-600">
          GRÁFICO DE PRODUCTOS POR CATEGORÍA:
        </h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={dataBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#8884d9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-xl text-blue-700 font-semibold mt-6 mb-2">
          POR CATEGORÍA:
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-0">
          {Object.entries(categorias).map(([categoria, data]) => {
            const cantidad = data.productos.length;
            const promedioPrecio = (data.totalPrecio / cantidad).toFixed(2);
            const promedioRating = (data.totalRating / cantidad).toFixed(2);
            return (
              <li
                key={categoria}
                className="bg-gray-900 rounded-lg shadow p-4 flex flex-col items-start border border-gray-200"
              >
                <strong className="text-lg text-blue-400">{categoria}</strong>
                <span className="text-sm text-blue-500">
                  Cantidad: {cantidad}
                </span>
                <span className="text-sm text-gray-700">
                  Precio promedio: ${promedioPrecio}
                </span>
                <span className="text-sm text-gray-700">
                  Rating promedio: {promedioRating}
                </span>
                <span className="text-sm text-green-700">
                  Más caro: {data.masCaro.title} (${data.masCaro.price})
                </span>
                <span className="text-sm text-red-700">
                  Más barato: {data.masBarato.title} (${data.masBarato.price})
                </span>
              </li>
            );
          })}
        </ul>

        {/*GRAFICO SIMULADO DE PRECIOS */}
        <h4 className="text-xl font-semibold mt-8 text-blue-600">
          EVOLUCIÓN DE PRECIOS SIMULADOS:
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

        {/* Pie chart: pRODUCTOS POR STOCK */}
        <h4 className="text-xl font-semibold mt-8 text-blue-600">
          DISTRIBUCIÓN DE STOK DE PRODUCTOS:
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
