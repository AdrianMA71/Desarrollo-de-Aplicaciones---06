// Copiar como src/App.jsx para la Figura 6
function App() {
  const curso = 'Desarrollo de Aplicaciones'
  const practica = 6
  const equipo = 'Castillo - Chuma - Maldonado'

  return (
    <div className="app">
      <h1>Catálogo de Tecnologías</h1>
      <p>Equipo: {equipo}</p>
      <p>
        {curso} · Práctica N.° {practica}
      </p>

      <img
        src="https://vitejs.dev/logo.svg"
        alt="Logo de Vite"
        className="logo"
      />
    </div>
  )
}

export default App
