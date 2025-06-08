const StatsPanel = ({
  show,
  onToggle,
  precioTotal,
  total,
  max,
  min,
  cantLargo,
}) => (
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
      {show ? "OCULTAR ESTADISTICA" : "MOSTRAR ESTADISTICA"}
    </button>
    {show && (
      <div className="stats-panel bg-gray-100 p-6 rounded-lg shadow-md mt-6 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-gray-800">
          <strong className="text-violet-800">ANÁLISIS Y ESTADÍSTICAS</strong>
        </h2>
        <br />
        <p>PRECIO TOTAL DE PRODUCTOS FILTRADOS: ${precioTotal}</p>
        <br />
        <p>PRODUCTOS TOTALES: {total}</p>
        <br />
        <p>PRODUCTO MÁS CARO: {max}</p>
        <br />
        <p>PRODUCTO MÁS ECONÓMICO: {min}</p>
        <br />
        <p>PRODUCTOS CON MÁS DE 20 CARACTERES: {cantLargo}</p>
        <br />
      </div>
    )}
  </>
);

export default StatsPanel;
