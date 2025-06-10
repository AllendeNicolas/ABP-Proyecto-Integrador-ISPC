const ExportButtons = ({ onExportJSON, onExportCSV }) => (
  <div className="mb-4">
    <button
      className="px-4 py-2 mr-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={onExportJSON}
    >
      Exportar JSON
    </button>
    <button
      className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
      onClick={onExportCSV}
    >
      Exportar CSV
    </button>
  </div>
);

export default ExportButtons;
